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

// The site stays location-neutral (SCRUM-38)
test('copy is location-neutral', async ({ page }) => {
  for (const path of ['/', '/about']) {
    await page.goto(path)
    await expect(page.locator('body')).not.toContainText('Berlin')
  }
  await expect(page.locator('.title-block')).toContainText('Product Builder Portfolio')
  await expect(page.locator('.title-block')).toContainText('Free to relocate')
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
