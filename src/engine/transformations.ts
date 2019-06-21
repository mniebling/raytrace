import { Matrix } from './matrix'


export function translation(x: number, y: number, z: number): Matrix {

  // translation(x, y, z) = [1 0 0 x]
  //                        [0 1 0 y]
  //                        [0 0 1 z]
  //                        [0 0 0 1]

  const transform = new Matrix()

  transform.setValueAt(0, 3, x)
  transform.setValueAt(1, 3, y)
  transform.setValueAt(2, 3, z)

  return transform
}
