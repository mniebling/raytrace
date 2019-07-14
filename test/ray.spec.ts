import { Point, Vector, Ray, position, Sphere, intersect, Intersection, hit } from '@/engine'


describe('new Intersection()', () => {

  it('should create an intersection', () => {

    const sphere = new Sphere()
    const intersection = new Intersection(3.5, sphere)

    expect(intersection.t).toEqual(3.5)
    expect(intersection.object).toBeDeepCloseTo(sphere)
  })
})

describe('new Ray()', () => {

  it('should create a ray', () => {

    const origin = new Point(1, 2, 3)
    const direction = new Vector(4, 5, 6)

    const ray = new Ray(origin, direction)

    expect(ray.origin).toBeDeepCloseTo(origin)
    expect(ray.direction).toBeDeepCloseTo(direction)
  })
})

describe('.hit()', () => {

  it('should find a hit when all intersections have positive t', () => {

    const s = new Sphere()
    const int1 = new Intersection(1, s)
    const int2 = new Intersection(2, s)

    expect(hit([int1, int2])).toBeDeepCloseTo(int1)
  })

  it('should find a hit when some intersections have negative t', () => {

    const s = new Sphere()
    const int1 = new Intersection(-1, s)
    const int2 = new Intersection(2, s)

    expect(hit([int1, int2])).toBeDeepCloseTo(int2)
  })

  it('should find a hit when all intersections have negative t', () => {

    const s = new Sphere()
    const int1 = new Intersection(-1, s)
    const int2 = new Intersection(-2, s)

    expect(hit([int1, int2])).toBeNull()
  })

  it('should return null if intersections is empty', () => {

    expect(hit([])).toBeNull()
  })

  test('the hit is always the lowest non-negative intersection', () => {

    const s = new Sphere()
    const int1 = new Intersection(5, s)
    const int2 = new Intersection(7, s)
    const int3 = new Intersection(-3, s)
    const int4 = new Intersection(2, s)

    const intersections = [int1, int2, int3, int4]

    expect(hit(intersections)).toBeDeepCloseTo(int4)
  })
})

describe('.intersect()', () => {

  test('a ray intersects a sphere at 2 points', () => {

    const ray = new Ray(new Point(0, 0, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2)
    expect(intersections[0]).toBeDeepCloseTo({ t: 4, object: sphere })
    expect(intersections[1]).toBeDeepCloseTo({ t: 6, object: sphere })
  })

  test('a ray intersects a sphere at a tangent', () => {

    const ray = new Ray(new Point(0, 1, -5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2) // returns 2 intersections at the same point, this is useful "for later"
    expect(intersections[0]).toBeDeepCloseTo({ t: 5, object: sphere })
    expect(intersections[1]).toBeDeepCloseTo({ t: 5, object: sphere })
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
    expect(intersections[0]).toBeDeepCloseTo({ t: -1, object: sphere }) // an intersection happens behind the ray's origin, in negative time O_o
    expect(intersections[1]).toBeDeepCloseTo({ t: 1, object: sphere })
  })

  test('a sphere is behind a ray', () => {

    const ray = new Ray(new Point(0, 0, 5), new Vector(0, 0, 1))
    const sphere = new Sphere()

    const intersections = intersect(ray, sphere)

    expect(intersections).toHaveLength(2) // one negative intersection for each surface behind the ray
    expect(intersections[0]).toBeDeepCloseTo({ t: -6, object: sphere })
    expect(intersections[1]).toBeDeepCloseTo({ t: -4, object: sphere })
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
