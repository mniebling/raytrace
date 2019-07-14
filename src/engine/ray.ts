import { add, multiply, subtract } from './math-general'
import { Vector, Point } from './tuples'
import { Sphere } from './objects'
import { dot } from './math-vectors'


export class Intersection {
  /**
   * The object which was intersected. Right now only spheres are supported.
   */
  object: Sphere

  /**
   * The t-value of the intersection is the time-position along the ray at
   * which it intersected the object.
   */
  t: number

  constructor (t: number, object: Sphere) {
    this.object = object
    this.t = t
  }
}

export class Ray {

  direction: Vector
  origin: Point

  constructor (origin: Point, direction: Vector) {
    this.origin = origin
    this.direction = direction
  }
}

/**
 * Returns the intersection with the lowest non-negative `t` value, or `null`
 * if there are no non-negative `t` values.
 */
export function hit (intersections: Intersection[]): Intersection | null {

  let hit: Intersection | null = null

  for (let n = 0; n < intersections.length; n++) {

    if (intersections[n].t < 0) continue

    if (hit && intersections[n].t < hit.t) {
      hit = intersections[n]
    }

    if (!hit) {
      hit = intersections[n]
    }
  }

  return hit
}

/**
 * Returns an array of `t` values where the ray intersects the sphere.
 */
export function intersect (ray: Ray, sphere: Sphere): Intersection[] {

  const sphereCenterToRayOrigin = subtract(ray.origin, new Point(0, 0, 0))

  const a = dot(ray.direction, ray.direction)
  const b = 2 * dot(ray.direction, sphereCenterToRayOrigin)
  const c = dot(sphereCenterToRayOrigin, sphereCenterToRayOrigin) - 1

  const discriminant = (b ** 2) - (4 * a * c)

  if (discriminant < 0) return []

  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)

  return [
    { t: t1, object: sphere },
    { t: t2, object: sphere }
  ]
}

/**
 * Finds the point at the given distance `t` along the ray.
 */
export function position (ray: Ray, t: number): Point {

  return add(ray.origin, (multiply(ray.direction, t)))
}
