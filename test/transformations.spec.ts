import { π, multiply } from '@/engine/math-general'
import { inverse } from '@/engine/math-matrices'
import { rotateX, rotateY, rotateZ, scale, skew, translate } from '@/engine/transformations'
import { Point, Vector } from '@/engine/tuples'


describe('.rotateX()', () => {

  it('should rotate a point around the x axis', () => {

    const p = new Point(0, 1, 0)

    const eighthCircle = rotateX(π / 4)
    const quarterCircle = rotateX(π / 2)

    expect(multiply(eighthCircle, p)).toBeDeepCloseTo(new Point(
      0,
      Math.sqrt(2) / 2,
      Math.sqrt(2) / 2
    ))

    expect(multiply(quarterCircle, p)).toBeDeepCloseTo(new Point(0, 0, 1))
  })

  test('multiplying by an inverse transform rotates in reverse', () => {

    const p = new Point(0, 1, 0)

    const transform = rotateX(π / 4)
    const invT = inverse(transform)

    expect(multiply(invT, p)).toBeDeepCloseTo(new Point(
      0,
      Math.sqrt(2) / 2,
      -Math.sqrt(2) / 2
    ))
  })
})

describe('.rotateY()', () => {

  it('should rotate a point around the y axis', () => {

    const p = new Point(0, 0, 1)

    const eighthCircle = rotateY(π / 4)
    const quarterCircle = rotateY(π / 2)

    expect(multiply(eighthCircle, p)).toBeDeepCloseTo(new Point(
      Math.sqrt(2) / 2,
      0,
      Math.sqrt(2) / 2
    ))

    expect(multiply(quarterCircle, p)).toBeDeepCloseTo(new Point(1, 0, 0))
  })
})

describe('.rotateZ()', () => {

  it('should rotate a point around the z axis', () => {

    const p = new Point(0, 1, 0)

    const eighthCircle = rotateZ(π / 4)
    const quarterCircle = rotateZ(π / 2)

    expect(multiply(eighthCircle, p)).toBeDeepCloseTo(new Point(
      -Math.sqrt(2) / 2,
       Math.sqrt(2) / 2,
       0
    ))

    expect(multiply(quarterCircle, p)).toBeDeepCloseTo(new Point(-1, 0, 0))
  })
})

describe('.scale()', () => {

  it('should scale a point', () => {

    const transform = scale(2, 3, 4)
    const p = new Point(-4, 6, 8)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(-8, 18, 32))
  })

  it('should scale a vector', () => {

    const transform = scale(2, 3, 4)
    const v = new Vector(-4, 6, 8)

    expect(multiply(transform, v)).toBeDeepCloseTo(new Vector(-8, 18, 32))
  })

  test('multiplying by an inverse transform scales in reverse', () => {

    const transform = scale(2, 3, 4)
    const invT = inverse(transform)
    const v = new Vector(-4, 6, 8)

    expect(multiply(invT, v)).toBeDeepCloseTo(new Vector(-2, 2, 2))
  })
})

describe('.skew()', () => {

  it('should move x in proportion to y', () => {

    const p = new Point(2, 3, 4)
    const transform = skew(1, 0, 0, 0, 0, 0)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(5, 3, 4))
  })

  it('should move x in proportion to z', () => {

    const p = new Point(2, 3, 4)
    const transform = skew(0, 1, 0, 0, 0, 0)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(6, 3, 4))
  })

  it('should move y in proportion to x', () => {

    const p = new Point(2, 3, 4)
    const transform = skew(0, 0, 1, 0, 0, 0)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(2, 5, 4))
  })

  it('should move y in proportion to z', () => {

    const p = new Point(2, 3, 4)
    const transform = skew(0, 0, 0, 1, 0, 0)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(2, 7, 4))
  })

  it('should move z in proportion to x', () => {

    const p = new Point(2, 3, 4)
    const transform = skew(0, 0, 0, 0, 1, 0)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(2, 3, 6))
  })

  it('should move z in proportion to y', () => {

    const p = new Point(2, 3, 4)
    const transform = skew(0, 0, 0, 0, 0, 1)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(2, 3, 7))
  })
})

describe('.translate()', () => {

  it('should transform a point', () => {

    const transform = translate(5, -3, 2)
    const p = new Point(-3, 4, 5)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(2, 1, 7))
  })

  it('should not transform a vector', () => {

    const transform = translate(5, -3, 2)
    const v = new Vector(-3, 4, 5)

    expect(multiply(transform, v)).toBeDeepCloseTo(v)
  })

  test('multiplying by an inverse transform moves points in reverse', () => {

    const transform = translate(5, -3, 2)
    const p = new Point(-3, 4, 5)
    const invT = inverse(transform)

    expect(multiply(invT, p)).toBeDeepCloseTo(new Point(-8, 7, 3))
  })
})
