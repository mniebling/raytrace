import { multiply } from '@/engine/math-general'
import { inverse } from '@/engine/math-matrices'
import { scale, translate } from '@/engine/transformations'
import { Point, Vector } from '@/engine/tuples'


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
