// import { fileURLToPath } from 'node:url'
import { mergeConfig, defineConfig, configDefaults } from 'vitest/config'
import vue from '@vitest/plugin-vue'

export default mergeConfig(
  defineConfig({
    test: {
      environment: 'jsdom',
      plugins: [vue()],
      // exclude: [...configDefaults.exclude, 'e2e/**'],
      // root: fileURLToPath(new URL('./', import.meta.url))
    }
  })
)

