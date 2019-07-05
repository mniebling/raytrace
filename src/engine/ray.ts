import { add, multiply } from './math-general'
import { Vector, Point } from './tuples'


export class Ray {

  direction: Vector
  origin: Point

  constructor (origin: Point, direction: Vector) {
    this.origin = origin
    this.direction = direction
  }
}

/**
 * Finds the point at the given distance `t` along the ray.
 */
export function position (ray: Ray, t: number): Point {

  return add(ray.origin, (multiply(ray.direction, t)))
}
