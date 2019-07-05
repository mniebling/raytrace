import { Point, Vector, Ray, position } from '@/engine'


describe('new Ray()', () => {

  it('should create a ray', () => {

    const origin = new Point(1, 2, 3)
    const direction = new Vector(4, 5, 6)

    const ray = new Ray(origin, direction)

    expect(ray.origin).toBeDeepCloseTo(origin)
    expect(ray.direction).toBeDeepCloseTo(direction)
  })
})

describe('.position()', () => {

  it('should compute a point from the distance', () => {

    const ray = new Ray(new Point(2, 3, 4), new Vector(1, 0, 0))

    expect(position(ray, 0)).toBeDeepCloseTo(new Point(2, 3, 4))
    expect(position(ray, 1)).toBeDeepCloseTo(new Point(3, 3, 4))
    expect(position(ray, -1)).toBeDeepCloseTo(new Point(1, 3, 4))
    expect(position(ray, 2.5)).toBeDeepCloseTo(new Point(4.5, 3, 4))
  })
})
