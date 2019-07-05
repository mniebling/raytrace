import { add, multiply, subtract } from './math-general'
import { Vector, Point } from './tuples'
import { Sphere } from './objects'
import { dot } from './math-vectors'


export class Ray {

  direction: Vector
  origin: Point

  constructor (origin: Point, direction: Vector) {
    this.origin = origin
    this.direction = direction
  }
}

/**
 * Returns an array of `t` values where the ray intersects the sphere.
 */
export function intersect (ray: Ray, sphere: Sphere): number[] {

  const sphereCenterToRayOrigin = subtract(ray.origin, new Point(0, 0, 0))

  const a = dot(ray.direction, ray.direction)
  const b = 2 * dot(ray.direction, sphereCenterToRayOrigin)
  const c = dot(sphereCenterToRayOrigin, sphereCenterToRayOrigin) - 1

  const discriminant = (b ** 2) - (4 * a * c)

  if (discriminant < 0) return []

  const t1 = (-b - Math.sqrt(discriminant)) / (2 * a)
  const t2 = (-b + Math.sqrt(discriminant)) / (2 * a)

  return [t1, t2]
}

/**
 * Finds the point at the given distance `t` along the ray.
 */
export function position (ray: Ray, t: number): Point {

  return add(ray.origin, (multiply(ray.direction, t)))
}
