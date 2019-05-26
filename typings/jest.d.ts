// https://github.com/maasencioh/jest-matcher-deep-close-to/issues/14
declare module 'jest-matcher-deep-close-to' {

  export function toBeDeepCloseTo(
    received: number | number[] | object,
    expected: number | number[] | object,
    decimals?: number
  ): {
    message(): string
    pass: boolean
  }

  export function toMatchCloseTo(
    received: number | number[] | object,
    expected: number | number[] | object,
    decimals?: number
  ): {
    message(): string
    pass: boolean
  }
}

declare namespace jest {

  interface Matchers<R> {
    toBeDeepCloseTo: (expected: number | number[] | object, decimals?: number) => R
    toFloatingEqual: (expected: number) => R
    toMatchCloseTo: (expected: number | number[] | object, decimals?: number) => R
  }
}
