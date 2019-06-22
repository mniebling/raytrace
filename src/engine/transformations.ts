import { Matrix } from './matrix'


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
