import { Point, Vector, Ray, position, Sphere, intersect } from '@/engine'


describe('new Ray()', () => {

  it('should create a ray', () => {

    const origin = new Point(1, 2, 3)
    const direction = new Vector(4, 5, 6)

    const ray = new Ray(origin, direction)

    expect(ray.origin).toBeDeepCloseTo(origin)
    expect(ray.direction).toBeDeepCloseTo(direction)
  })
})

describe('.intersect()', () => {

  test('a ray intersects a sphere at 2 points', () => {

    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2)
    expect(intersections[0]).toEqual(4)
    expect(intersections[1]).toEqual(6)
  })

  test('a ray intersects a sphere at a tangent', () => {

    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2) // returns 2 intersections at the same point, this is useful "for later"
    expect(intersections[0]).toEqual(5)
    expect(intersections[1]).toEqual(5)
  })

  test('a ray misses a sphere', () => {

    const ray = new Ray(new Point(0, 2, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(0)
  })

  test('a ray originates inside a sphere', () => {

    const ray = new Ray(new Point(0, 0, 0), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2)
    expect(intersections[0]).toEqual(-1) // an intersection happens behind the ray's origin, in negative time O_o
    expect(intersections[1]).toEqual(1)
  })

  test('a sphere is behind a ray', () => {

    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2) // one negative intersection for each surface behind the ray
    expect(intersections[0]).toEqual(-6)
    expect(intersections[1]).toEqual(-4)
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
