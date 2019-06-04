import { add, divide, multiply, subtract } from '@/engine/math-tuples'
import { Color, Point, Tuple, Vector } from '@/engine/tuples'


describe('add()', () => {

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

describe('divide()', () => {

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

describe('multiply()', () => {

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
})

describe('subtract()', () => {

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
