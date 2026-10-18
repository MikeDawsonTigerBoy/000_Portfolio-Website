import { execSync } from 'node:child_process'
import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

// Footer date: month and year of the latest commit (the last merge to main).
// Falls back to today if git isn't available.
function lastUpdated() {
  let date = new Date()
  try {
    date = new Date(execSync('git log -1 --format=%cI', { encoding: 'utf8' }).trim())
  } catch {
    // no git history: keep today
  }
  return date.toLocaleDateString('en-GB', { month: 'long', year: 'numeric' })
}

// https://vite.dev/config/
export default defineConfig({
  plugins: [react()],
  define: {
    __LAST_UPDATED__: JSON.stringify(lastUpdated()),
  },
})
