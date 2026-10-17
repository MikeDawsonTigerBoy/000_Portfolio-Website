// Works out whether the visitor is on an iPhone/iPad, an Android device, or a desktop.
export function detectPlatform() {
  if (typeof navigator === 'undefined') return 'desktop'

  const ua = navigator.userAgent || ''
  if (/android/i.test(ua)) return 'android'
  if (/iphone|ipad|ipod/i.test(ua)) return 'ios'
  // iPadOS 13+ reports itself as a Mac; touch support gives it away
  if (/macintosh/i.test(ua) && navigator.maxTouchPoints > 1) return 'ios'
  return 'desktop'
}

// The link a phone should open for a project: its platform build if it has one, else the web build.
export function launchUrlFor(project, platform) {
  if (platform === 'ios') return project.iosUrl ?? project.demoUrl
  if (platform === 'android') return project.androidUrl ?? project.demoUrl
  return project.demoUrl
}
