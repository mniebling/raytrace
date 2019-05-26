module.exports = {

  // Handle tsconfig path mapping: "@/*": ["./src/*"]
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1'
  },

  preset: 'ts-jest',

  // `expect` is not available in `setupFiles` but it is in `setupFilesAfterEnv`.
  setupFilesAfterEnv: [
    '<rootDir>/test/setup.ts'
  ]
}
