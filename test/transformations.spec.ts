import { multiply } from '@/engine/math-general'
import { inverse } from '@/engine/math-matrices'
import { translation } from '@/engine/transformations'
import { Point, Vector } from '@/engine/tuples'


describe('.translate()', () => {

  it('should transform a point', () => {

    const transform = translation(5, -3, 2)
    const p = new Point(-3, 4, 5)

    expect(multiply(transform, p)).toBeDeepCloseTo(new Point(2, 1, 7))
  })

  it('should not transform a vector', () => {

    const transform = translation(5, -3, 2)
    const v = new Vector(-3, 4, 5)

    expect(multiply(transform, v)).toBeDeepCloseTo(v)
  })

  test('multiplying by an inverse transform moves points in reverse', () => {

    const transform = translation(5, -3, 2)
    const p = new Point(-3, 4, 5)
    const invT = inverse(transform)

    expect(multiply(invT, p)).toBeDeepCloseTo(new Point(-8, 7, 3))
  })
})
