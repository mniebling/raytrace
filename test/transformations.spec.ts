import {
  chain,
  inverse,
  multiply,
  Point,
  Ray,
  rotateX,
  rotateY,
  rotateZ,
  scale,
  skew,
  transform,
  translate,
  Vector,
  π
} from '@/engine'


describe('.chain()', () => {

  it('should apply transforms in the correct order', () => {

    const p = new Point(1, 0, 1)

    const rotation = rotateX(π / 2)
    const scaling = scale(5, 5, 5)
    const translation = translate(10, 5, 7)

    // Apply transforms in sequence
    const p2 = multiply(rotation, p)
    expect(p2).toBeDeepCloseTo(new Point(1, -1, 0))

    const p3 = multiply(scaling, p2)
    expect(p3).toBeDeepCloseTo(new Point(5, -5, 0))

    const p4 = multiply(translation, p3)
    expect(p4).toBeDeepCloseTo(new Point(15, 0, 7))

    // Apply transforms with chain
    const chainedTransform = chain(rotation, scaling, translation)
    expect(multiply(chainedTransform, p)).toBeDeepCloseTo(new Point(15, 0, 7))
  })
})

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

describe('.transform()', () => {

  it('should translate a ray', () => {

    const r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0))
    const translation = translate(3, 4, 5)

    const r2 = transform(r, translation)

    expect(r2.origin).toBeDeepCloseTo(new Point(4, 6, 8))
    expect(r2.direction).toBeDeepCloseTo(new Vector(0, 1, 0))
  })

  it('should scale a ray', () => {

    const r = new Ray(new Point(1, 2, 3), new Vector(0, 1, 0))
    const scaling = scale(2, 3, 4)

    const r2 = transform(r, scaling)

    expect(r2.origin).toBeDeepCloseTo(new Point(2, 6, 12))
    expect(r2.direction).toBeDeepCloseTo(new Vector(0, 3, 0))
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
