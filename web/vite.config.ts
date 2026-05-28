import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import { readFileSync } from 'node:fs'
import { fileURLToPath } from 'node:url'
import { dirname, resolve } from 'node:path'

const __dirname = dirname(fileURLToPath(import.meta.url))
const pkgPath = resolve(__dirname, 'package.json')
const pkg = JSON.parse(readFileSync(pkgPath, 'utf-8')) as { version?: string }
const appVersion = pkg.version ?? '0.0.0'

export default defineConfig({
  plugins: [react()],
  define: {
    __APP_VERSION__: JSON.stringify(appVersion),
  },
  css: {
    lightningcss: {
      errorRecovery: true,
    },
  },
})
