import { Point } from './tuples'
import { Matrix } from './matrix'


export class Sphere {

  origin: Point
  radius: number
  transform: Matrix

  /**
   * By default, returns a unit sphere (radius = 1) with origin at (0, 0, 0).
   */
  constructor (
    origin: Point = new Point(0, 0, 0),
    radius: number = 1,
    transform: Matrix = new Matrix()
  ) {
    this.origin = origin
    this.radius = radius
    this.transform = transform
  }
}
