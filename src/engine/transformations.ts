import { multiply } from './math-general'
import { Matrix } from './matrix'
import { Ray } from './ray'
import { Sphere } from './objects'


/**
 * Returns a matrix representing a combination of multiple transforms.
 *
 * Note that transforms will be applied from first to last.
 */
export function chain (...transforms: Matrix[]): Matrix {

  const identity = new Matrix()

  return transforms.reduceRight(
    (accum: Matrix, current: Matrix) => multiply(accum, current),
    identity
  )
}

/**
 * Returns a transform matrix representing rotation around the x-axis.
 */
export function rotateX (radians: number): Matrix {

  const transform = new Matrix()

  // rotateX(r) = [1   0       0    0]
  //              [0 cos(r) -sin(r) 0]
  //              [0 sin(r)  cos(r) 0]
  //              [0   0       0    1]

  transform.setValueAt(1, 1,  Math.cos(radians))
  transform.setValueAt(1, 2, -Math.sin(radians))
  transform.setValueAt(2, 1,  Math.sin(radians))
  transform.setValueAt(2, 2,  Math.cos(radians))

  return transform
}

/**
 * Returns a transform matrix representing rotation around the y-axis.
 */
export function rotateY (radians: number): Matrix {

  const transform = new Matrix()

  // rotateY(r) = [ cos(r) 0 sin(r) 0]
  //              [   0    1   0    0]
  //              [-sin(r) 0 cos(r) 0]
  //              [   0    0   0    1]

  transform.setValueAt(0, 0,  Math.cos(radians))
  transform.setValueAt(0, 2,  Math.sin(radians))
  transform.setValueAt(2, 0, -Math.sin(radians))
  transform.setValueAt(2, 2,  Math.cos(radians))

  return transform
}

/**
 * Returns a transform matrix representing rotation around the z-axis.
 */
export function rotateZ (radians: number): Matrix {

  const transform = new Matrix()

  // rotateZ(r) = [ cos(r) -sin(r) 0 0]
  //              [ sin(r)  cos(r) 0 0]
  //              [   0       0    1 0]
  //              [   0       0    0 1]

  transform.setValueAt(0, 0,  Math.cos(radians))
  transform.setValueAt(0, 1, -Math.sin(radians))
  transform.setValueAt(1, 0,  Math.sin(radians))
  transform.setValueAt(1, 1,  Math.cos(radians))

  return transform
}

export function scale (x: number, y: number, z: number): Matrix {

  // scale(x, y, z) = [x 0 0 0]
  //                  [0 y 0 0]
  //                  [0 0 z 0]
  //                  [0 0 0 1]

  const transform = new Matrix()

  transform.setValueAt(0, 0, x)
  transform.setValueAt(1, 1, y)
  transform.setValueAt(2, 2, z)

  return transform
}

/**
 * Returns a transform matrix representing change of specific coordinates in
 * proportion to others (for example, `x` in proportion to `y`). The further
 * away the dependent coordinate is from 0, the more the targeted value changes.
 */
export function skew (
  x_y: number,
  x_z: number,
  y_x: number,
  y_z: number,
  z_x: number,
  z_y: number
): Matrix {

  const transform = new Matrix()

  // skew(x_y, x_z, y_x, y_z, z_x, z_y) = [ 1  x_y x_z 0]
  //                                      [y_x  1  y_z 0]
  //                                      [z_x z_y  1  0]
  //                                      [ 0   0   0  1]

  transform.setValueAt(0, 1, x_y)
  transform.setValueAt(0, 2, x_z)
  transform.setValueAt(1, 0, y_x)
  transform.setValueAt(1, 2, y_z)
  transform.setValueAt(2, 0, z_x)
  transform.setValueAt(2, 1, z_y)

  return transform
}

/**
 * Applies a transform matrix to the given ray and returns the transformed ray.
 */
export function transform (r: Ray, m: Matrix): Ray {

  return new Ray(
    multiply(m, r.origin),
    multiply(m, r.direction)
  )
}

export function translate (x: number, y: number, z: number): Matrix {

  // translate(x, y, z) = [1 0 0 x]
  //                      [0 1 0 y]
  //                      [0 0 1 z]
  //                      [0 0 0 1]

  const transform = new Matrix()

  transform.setValueAt(0, 3, x)
  transform.setValueAt(1, 3, y)
  transform.setValueAt(2, 3, z)

  return transform
}
