import { add, clamp, divide, equal, isEven, isOdd, multiply, subtract } from '@/engine/math-general'
import { Matrix } from '@/engine/matrix'
import { Color, Point, Tuple, Vector } from '@/engine/tuples'


describe('.add()', () => {

  it('should add a point and a vector', () => {

    const a = new Point(1.5, 2.5, -1.0)
    const b = new Vector(0.0, -1.0, 3.9)

    const result = add(a, b)

    expect(result).toBeDeepCloseTo(new Point(1.5, 1.5, 2.9))
    expect(result).toBeInstanceOf(Point)
  })

  it('should add two points', () => {

    const a = new Point(1.5, 2.5, -1.0)
    const b = new Point(0.0, -1.0, 3.9)

    const result = add(a, b)

    expect(result).toBeDeepCloseTo(new Point(1.5, 1.5, 2.9))
    expect(result).toBeInstanceOf(Point)
  })

  it('should add two vectors', () => {

    const a = new Vector(1.5, 2.5, -1.0)
    const b = new Vector(0.0, -1.0, 3.9)

    const result = add(a, b)

    expect(result).toBeDeepCloseTo(new Vector(1.5, 1.5, 2.9))
    expect(result).toBeInstanceOf(Vector)
  })

  it('should add two colors', () => {

    const a = new Color(0.9, 0.6, 0.75)
    const b = new Color(0.7, 0.1, 0.25)

    const result = add(a, b)

    expect(result).toBeDeepCloseTo(new Color(1.6, 0.7, 1.0, 2.0))
    expect(result).toBeInstanceOf(Color)
  })
})

describe('.clamp()', () => {

  it('should clamp 0 to 0', () => {

    expect(clamp(0)).toFloatingEqual(0)
  })

  it('should clamp 1 to 255', () => {

    expect(clamp(1)).toFloatingEqual(255)
  })

  it('should clamp 0.5 to 128', () => {

    expect(clamp(0.5)).toFloatingEqual(128) // round up from 127.5
  })

  it('should clamp -1 to 0', () => {

    expect(clamp(-1)).toFloatingEqual(0)
  })

  it('should clamp 300 to 255', () => {

    expect(clamp(300)).toFloatingEqual(255)
  })
})

describe('.divide()', () => {

  it('should divide a vector by a scalar', () => {

    const v = new Vector(1, -2, 3)
    const s = 2

    expect(divide(v, s)).toBeDeepCloseTo(new Vector(0.5, -1, 1.5))
  })

  it('should divide a color by a scalar', () => {

    const c = new Color(0.5, 0.2, 0.8)
    const s = 2

    expect(divide(c, s)).toBeDeepCloseTo(new Color(0.25, 0.1, 0.4, 0.5))
  })

  it('should handle zeroes in the denominator', () => {

    const p = new Point(1, -2, 3)
    const s = 0

    expect(divide(p, s)).toEqual(new Tuple(Infinity, -Infinity, Infinity, Infinity))
  })

  it('should handle zeroes in the numerator', () => {

    const v = new Vector(0, 0, 4)
    const s = 2

    expect(divide(v, s)).toBeDeepCloseTo(new Vector(0, 0, 2))
  })

  it('should freak out about dividing 0/0', () => {

    const v = new Vector(0, 1, 2)
    const s = 0

    expect(() => divide(v, s)).toThrow()
  })
})

describe('.equal()', () => {

  it('should compare two floating point numbers', () => {

    expect(equal(1.0, 1.0)).toBe(true)
    expect(equal(1.0, 1.1)).toBe(false)
  })

  it('should compare two tuples', () => {

    const a = new Tuple(1.0, 2.5, -3.0, 1.0)
    const b = new Tuple(6.7, 2.5, 3.0, 0.0)

    expect(equal(a, a)).toBe(true)
    expect(equal(a, b)).toBe(false)
  })

  it('should compare matrices', () => {

    const m1 = new Matrix([
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 8, 7, 6,
      5, 4, 3, 2
    ])

    const m2 = new Matrix([
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 8, 7, 6,
      5, 4, 3, 2
    ])

    expect(equal(m1, m2)).toBe(true)

    const m3 = new Matrix([
      2, 3, 4, 5,
      6, 7, 8, 9,
      8, 7, 6, 5,
      4, 3, 2, 1
    ])

    expect(equal(m1, m3)).toBe(false)
  })
})

describe('.isEven()', () => {

  it('should return true for even numbers', () => {

    expect(isEven(0)).toBe(true)
    expect(isEven(2)).toBe(true)
  })

  it('should return false for odd numbers', () => {

    expect(isEven(1)).toBe(false)
  })
})

describe('.isOdd()', () => {

  it('should return false for even numbers', () => {

    expect(isOdd(0)).toBe(false)
    expect(isOdd(2)).toBe(false)
  })

  it('should return true for odd numbers', () => {

    expect(isOdd(1)).toBe(true)
  })
})

describe('.multiply()', () => {

  it('should multiply a vector by an integer', () => {

    const v = new Vector(1, -2, 3)
    const s = 3

    const result = multiply(v, s)

    expect(result).toBeDeepCloseTo(new Vector(3, -6, 9))
    expect(result).toBeInstanceOf(Vector)
  })

  it('should multiply a vector by a fraction', () => {

    const v = new Vector(1, -2 ,3)
    const s = 0.5

    const result = multiply(v, s)

    expect(result).toBeDeepCloseTo(new Vector(0.5, -1, 1.5))
    expect(result).toBeInstanceOf(Vector)
  })

  it('should multiply a color by an integer', () => {

    const c = new Color(1, -2, 3)
    const s = 3

    const result = multiply(c, s)

    expect(result).toBeDeepCloseTo(new Color(3, -6, 9, 3))
    expect(result).toBeInstanceOf(Color)
  })

  it('should multiply two colors', () => {

    const c1 = new Color(1, 0.2, 0.4)
    const c2 = new Color(0.9, 1, 0.1)

    const result = multiply(c1, c2)

    expect(result).toBeDeepCloseTo(new Color(0.9, 0.2, 0.04))
    expect(result).toBeInstanceOf(Color)
  })

  it('should multiply a matrix by a scalar', () => {

    const identity = new Matrix()
    const expectation = new Matrix([
      2, 0, 0, 0,
      0, 2, 0, 0,
      0, 0, 2, 0,
      0, 0, 0, 2
    ])

    expect(multiply(identity, 2)).toBeDeepCloseTo(expectation)
  })

  it('should multiply two matrices', () => {

    const m1 = new Matrix([
      1, 2, 3, 4,
      5, 6, 7, 8,
      9, 8, 7, 6,
      5, 4, 3, 2
    ])

    const m2 = new Matrix([
      -2, 1, 2,  3,
       3, 2, 1, -1,
       4, 3, 6,  5,
       1, 2, 7,  8
    ])

    const expectation = new Matrix([
      20, 22,  50,  48,
      44, 54, 114, 108,
      40, 58, 110, 102,
      16, 26,  46,  42
    ])

    expect(multiply(m1, m2)).toBeDeepCloseTo(expectation)
  })

  it('should multiply a matrix by a point', () => {

    const m = new Matrix([
      1, 2, 3, 4,
      2, 4, 4, 2,
      8, 6, 4, 1,
      0, 0, 0, 1
    ])

    const p = new Point(1, 2, 3)
    const result = multiply(m, p)

    expect(result).toBeDeepCloseTo(new Point(18, 24, 33))
    expect(result).toBeInstanceOf(Point)
  })

  it('should multiply a matrix by the identity matrix', () => {

    const identity = new Matrix()
    const m = new Matrix([
      0, 1,  2,  4,
      1, 2,  4,  8,
      2, 4,  8, 16,
      4, 8, 16, 32
    ])

    expect(multiply(identity, m)).toBeDeepCloseTo(m)
  })
})

describe('.subtract()', () => {

  it('should subtract two points', () => {

    const a = new Point(3, 2, 1)
    const b = new Point(5, 6, 7)

    expect(subtract(a, b)).toBeDeepCloseTo(new Vector(-2, -4, -6))
  })

  it('should subtract a vector from a point', () => {

    const a = new Point(3, 2, 1)
    const b = new Vector(5, 6, 7)

    expect(subtract(a, b)).toBeDeepCloseTo(new Point(-2, -4, -6))
  })

  it('should subtract two vectors', () => {

    const a = new Vector(3, 2, 1)
    const b = new Vector(5, 6, 7)

    expect(subtract(a, b)).toBeDeepCloseTo(new Vector(-2, -4, -6))
  })

  it('should subtract two colors', () => {

    const a = new Color(0.9, 0.6, 0.75)
    const b = new Color(0.7, 0.1, 0.25)

    expect(subtract(a, b)).toBeDeepCloseTo(new Color(0.2, 0.5, 0.5, 0))
  })
})
