import { Point } from './tuples'


export class Sphere {

  origin: Point
  radius: number

  /**
   * By default, returns a unit sphere (radius = 1) with origin at (0, 0, 0).
   */
  constructor (
    origin: Point = new Point(0, 0, 0),
    radius: number = 1
  ) {
    this.origin = origin
    this.radius = radius
  }
}
