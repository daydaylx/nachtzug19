import { defineConfig } from 'vite'

export default defineConfig({
  test: {
    environment: 'node',
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'lcov'],
      include: ['src/**/*.{ts,tsx}'],
      exclude: [
        '**/*.test.ts',
        '**/*.test.tsx',
        '**/android-native/**',
        '**/docs/**',
        '**/scripts/**'
      ],
      thresholds: {
        lines: 60,
        functions: 60,
        statements: 60,
        branches: 50
      }
    }
  }
})