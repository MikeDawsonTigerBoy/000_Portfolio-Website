import { expect, test } from '@playwright/test'

const isMobile = (testInfo) => testInfo.project.use.isMobile === true

// Scroll to the bottom so every <Reveal> block fades in, then back to the top.
async function revealAll(page) {
  await page.evaluate(async () => {
    for (let y = 0; y < document.body.scrollHeight; y += window.innerHeight / 2) {
      window.scrollTo(0, y)
      await new Promise((resolve) => setTimeout(resolve, 50))
    }
    window.scrollTo(0, 0)
  })
}

// Nothing may lay out wider than the device width.
// Compares against the <html> box (the layout viewport) rather than window.innerWidth:
// mobile Chromium widens innerWidth to fit overflowing content, and WebKit's iPhone
// emulation on Windows reports innerWidth ~20px narrower than the width it lays out at.
async function expectNoHorizontalScroll(page) {
  const { scrollWidth, viewportWidth } = await page.evaluate(() => ({
    scrollWidth: document.documentElement.scrollWidth,
    viewportWidth: document.documentElement.getBoundingClientRect().width,
  }))
  expect(scrollWidth, 'page scrolls sideways').toBeLessThanOrEqual(Math.ceil(viewportWidth))
}

// Full-page screenshot, saved per profile under screenshots/ and attached to the report.
async function screenshot(page, testInfo, name) {
  await revealAll(page)
  await page.waitForTimeout(800)
  const path = `screenshots/${testInfo.project.name}/${name}.png`
  await page.screenshot({ path, fullPage: true })
  await testInfo.attach(name, { path, contentType: 'image/png' })
}

test('home has three entry cards', async ({ page }, testInfo) => {
  await page.goto('/')
  const cards = page.locator('a.entry-card')
  await expect(cards).toHaveCount(3)
  for (const path of ['/product', '/blog', '/about']) {
    await expect(page.locator(`a.entry-card[href="${path}"]`)).toBeVisible()
  }
  await expectNoHorizontalScroll(page)
  await screenshot(page, testInfo, 'home')
})

test('header nav reads About, Product, Blog', async ({ page }) => {
  await page.goto('/')
  await expect(page.locator('.site-header__nav a')).toHaveText(['About', 'Product', 'Blog'])
})

// Art and Music stay in the code but are hidden on the deployed site (SCRUM-35).
test('art and music are hidden and send visitors home', async ({ page }) => {
  for (const path of ['/art', '/music']) {
    await page.goto(path)
    await expect(page).toHaveURL(/\/$/)
    await expect(page.locator(`a[href="${path}"]`)).toHaveCount(0)
  }
})

test('about page lists email and LinkedIn contacts', async ({ page }, testInfo) => {
  await page.goto('/about')
  await expect(page.locator('a.contact-row[href="mailto:mike.stuart.dawson@outlook.com"]')).toBeVisible()
  const linkedin = page.locator('a.contact-row[href="https://www.linkedin.com/in/mike-dawson-bb4168194"]')
  await expect(linkedin).toBeVisible()
  await expect(linkedin).toHaveAttribute('target', '_blank')
  await expectNoHorizontalScroll(page)
  await screenshot(page, testInfo, 'about')
})

test('blog folders open a post that slides up and closes back to the stack', async ({ page }, testInfo) => {
  await page.goto('/blog')
  await expect(page.locator('h1')).toContainText('Blog')
  const folders = page.locator('a.folder')
  await expect(folders).toHaveCount(3)
  await expectNoHorizontalScroll(page)
  await screenshot(page, testInfo, 'blog')

  await folders.last().click()
  await expect(page).toHaveURL(/\/blog\/a-weekend-of-building$/)
  const sheet = page.getByRole('dialog')
  await expect(sheet).toBeVisible()
  await expect(sheet.locator('h2')).toHaveText('A weekend of building')

  await page.keyboard.press('Escape')
  await expect(page).toHaveURL(/\/blog$/)
  await expect(sheet).toHaveCount(0)
})

test('a post link opens straight into its sheet', async ({ page }) => {
  await page.goto('/blog/claude-community-build-day')
  await expect(page.getByRole('dialog').locator('h2')).toHaveText('Claude Community Build Day')
  await page.goto('/blog/no-such-post')
  await expect(page).toHaveURL(/\/blog$/)
})

// No location anywhere on the site (SCRUM-38): Mike is geographically mobile.
// The Under development table is skipped: 008's game is set over Cape Town.
test('no location is stated anywhere', async ({ page }) => {
  for (const path of ['/', '/about', '/product', '/blog']) {
    await page.goto(path)
    const text = await page.evaluate(() => {
      const copy = document.body.cloneNode(true)
      copy.querySelector('.product-upcoming')?.remove()
      return copy.textContent
    })
    for (const word of ['Berlin', 'Cape Town', 'relocate', 'Location']) {
      expect(text, `${path} mentions ${word}`).not.toContain(word)
    }
  }
  const footer = page.locator('.title-block')
  await expect(footer).toContainText('Product Builder Portfolio')
  await expect(footer).toContainText(/(January|February|March|April|May|June|July|August|September|October|November|December) \d{4}/)
})

test('product shows 001, 002 and 004, with the rest under development', async ({ page }, testInfo) => {
  await page.goto('/product')
  const cards = page.locator('a.project-card')
  await expect(cards).toHaveCount(3)
  for (const number of ['001', '002', '004']) {
    await expect(page.locator(`a.project-card[href="/product/${number}"]`)).toHaveCount(1)
  }

  const rows = page.locator('.product-upcoming__table tbody tr')
  await expect(rows).toHaveCount(7)
  await expect(rows.first().locator('td').first()).toHaveText('003')
  await expect(page.locator('.product-upcoming__table')).toContainText('Air City')

  // Descriptions are blank until a row is hovered (desktop); touch screens always show them
  if (!isMobile(testInfo)) {
    const description = rows.first().locator('.product-upcoming__description')
    await expect(description).toHaveCSS('color', 'rgba(0, 0, 0, 0)')
    await rows.first().hover()
    await expect(description).toHaveCSS('color', 'rgb(27, 26, 23)')
    await expect(rows.first().locator('td').first()).toHaveCSS('background-size', '100% 100%')
  }

  // Unfeatured prototypes have no page of their own yet
  await page.goto('/product/009')
  await expect(page).toHaveURL(/\/product$/)
  await page.goto('/product')
  await expectNoHorizontalScroll(page)
  await screenshot(page, testInfo, 'product')
})

test('project 004 previews for the visitor’s device', async ({ page }, testInfo) => {
  await page.goto('/product/004')
  await expect(page.getByRole('heading', { level: 1, name: 'Shazanguage' })).toBeVisible()

  if (isMobile(testInfo)) {
    // Phones get a launch panel for their own platform, never device frames.
    await expect(page.locator('.device-frame')).toHaveCount(0)
    await expect(page.locator('.device-launch')).toBeVisible()
    const phone = testInfo.project.name.startsWith('iphone') ? 'iPhone' : 'Android phone'
    await expect(page.locator('.device-launch__label')).toHaveText(`On your ${phone}`)
  } else {
    await expect(page.locator('.device-launch')).toHaveCount(0)
    const iphoneTab = page.getByRole('tab', { name: 'iPhone' })
    const androidTab = page.getByRole('tab', { name: 'Android' })
    await expect(iphoneTab).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('.device-frame--ios')).toBeVisible()

    await androidTab.click()
    await expect(androidTab).toHaveAttribute('aria-selected', 'true')
    await expect(page.locator('.device-frame--android')).toBeVisible()
    await expect(page.locator('.device-frame--ios')).toHaveCount(0)

    await iphoneTab.click()
    await expect(page.locator('.device-frame--ios')).toBeVisible()
  }

  await expectNoHorizontalScroll(page)
  await screenshot(page, testInfo, 'product-004')
})

// No word may be cut in half on any screen (SCRUM-42). For every heading and
// display line, each word must sit on one line and fit inside its box; a word
// whose letters land on two lines, or that runs past its box, fails the test.
const WORD_PAGES = ['/', '/product', '/product/001', '/product/002', '/product/004', '/blog', '/about', '/blog/a-weekend-of-building']

test('no word is split across lines or cut off', async ({ page }) => {
  const all = []
  for (const path of WORD_PAGES) {
    await page.goto(path)
    await page.evaluate(() => document.fonts.ready)
    await page.waitForTimeout(900) // let entry animations settle
    const problems = await page.evaluate(() => {
      const found = []
      const selector = 'h1, h2, h3, .display, .folder__title, .project-card__title, .entry-card__title'
      for (const el of document.querySelectorAll(selector)) {
        if (!el.getClientRects().length) continue
        const box = el.getBoundingClientRect()
        const walker = document.createTreeWalker(el, NodeFilter.SHOW_TEXT)
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const re = /[^\s\-–—]+/g
          for (let match = re.exec(node.data); match; match = re.exec(node.data)) {
            const range = document.createRange()
            range.setStart(node, match.index)
            range.setEnd(node, match.index + match[0].length)
            const rects = [...range.getClientRects()].filter((r) => r.width > 0)
            const lines = new Set(rects.map((r) => Math.round(r.top)))
            const right = Math.max(...rects.map((r) => r.right))
            if (lines.size > 1) found.push(`"${match[0]}" is split across ${lines.size} lines`)
            else if (right > box.right + 1) found.push(`"${match[0]}" runs past its box by ${Math.round(right - box.right)}px`)
          }
        }
      }
      return found
    })
    all.push(...problems.map((problem) => `${path}: ${problem}`))
  }
  expect(all, all.join(' | ')).toEqual([])
})
