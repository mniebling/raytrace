import { Matrix } from '@/engine/matrix'


export function determinant (m: Matrix): number {

  if (m.rows > 2 || m.columns > 2) throw new Error(`Can't find the determinant of matrices larger than 2×2.`)

  return (m.data[0] * m.data[3]) - (m.data[1] * m.data[2])
}

/**
 * Returns a copy of the matrix with the given row and column removed.
 *
 * The row and column are 0-indexed.
 */
export function submatrix (m: Matrix, rowToRemove: number, colToRemove: number): Matrix {

  const submatrix = new Array((m.rows - 1) * (m.columns - 1))
  let i = 0

  for (let row = 0; row < m.rows; row++) {
    for (let col = 0; col < m.columns; col++) {

      if (row !== rowToRemove && col !== colToRemove) {
        submatrix[i] = m.getValueAt(row, col)
        i++
      }
    }
  }

  return new Matrix(submatrix)
}

/**
 * Transposing a matrix turns its rows into columns and its columns into rows.
 *
 * For example:
 * ```
 * M:              transpose(M):
 * [1, 2, 3, 4]    [1, 5, 9, 3]
 * [5, 6, 7, 8]    [2, 6, 0, 4]
 * [9, 0, 1, 2]    [3, 7, 1, 5]
 * [3, 4, 5, 6]    [4, 8, 2, 6]
 * ```
 */
export function transpose (m: Matrix): Matrix {

  const result = new Matrix()

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      result.setValueAt(row, col, m.getValueAt(col, row))
    }
  }

  return result
}
