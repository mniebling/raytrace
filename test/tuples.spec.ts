import { Tuple, isPoint, isVector, Point, Vector, Color } from '@/engine/tuples'


describe('new Tuple()', () => {

  test('should create points when w = 1.0', () => {

    const result = new Tuple(4.3, -4.2, 3.1, 1.0)

    expect(result._tuple[0]).toBe(4.3)
    expect(result._tuple[1]).toBe(-4.2)
    expect(result._tuple[2]).toBe(3.1)
    expect(result._tuple[3]).toBe(1.0)

    expect(isPoint(result)).toBe(true)
    expect(isVector(result)).toBe(false)
  })

  test('should create vectors when w = 0.0', () => {

    const result = new Tuple(4.3, -4.2, 3.1, 0.0)

    expect(result._tuple[0]).toBe(4.3)
    expect(result._tuple[1]).toBe(-4.2)
    expect(result._tuple[2]).toBe(3.1)
    expect(result._tuple[3]).toBe(0.0)

    expect(isPoint(result)).toBe(false)
    expect(isVector(result)).toBe(true)
  })
})

describe('new Color()', () => {

  test('should create colors', () => {

    const result = new Color(4.3, -4.2, 3.1)

    expect(result._tuple[0]).toBe(4.3)
    expect(result._tuple[1]).toBe(-4.2)
    expect(result._tuple[2]).toBe(3.1)
    expect(result._tuple[3]).toBe(1.0)
  })
})

describe('new Point()', () => {

  test('should create points', () => {

    const result = new Point(2.7, 1.0, -9.2)

    expect(result.x).toBe(2.7)
    expect(result.y).toBe(1.0)
    expect(result.z).toBe(-9.2)
    expect(result.w).toBe(1.0)

    expect(isPoint(result)).toBe(true)
    expect(isVector(result)).toBe(false)
  })
})

describe('new Vector()', () => {

  test('should create vectors', () => {

    const result = new Vector(2.7, 1.0, -9.2)

    expect(result.x).toBe(2.7)
    expect(result.y).toBe(1.0)
    expect(result.z).toBe(-9.2)
    expect(result.w).toBe(0.0)

    expect(isPoint(result)).toBe(false)
    expect(isVector(result)).toBe(true)
  })
})

describe('isPoint()', () => {

  test('should correctly detect points', () => {

    const point = new Tuple(-1.0, 2.5, -3.2, 1.0)
    const vector = new Tuple(2.0, 3.7, -1.0, 0.0)

    expect(isPoint(point)).toEqual(true)
    expect(isPoint(vector)).toEqual(false)
  })
})

describe('isVector()', () => {

  test('should correctly detect vectors', () => {

    const point = new Tuple(-1.0, 2.5, -3.2, 1.0)
    const vector = new Tuple(2.0, 3.7, -1.0, 0.0)

    expect(isVector(point)).toEqual(false)
    expect(isVector(vector)).toEqual(true)
  })
})
