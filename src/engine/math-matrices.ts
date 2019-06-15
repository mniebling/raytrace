import { isOdd } from '@/engine/math-general'
import { Matrix } from '@/engine/matrix'


/**
 * The cofactor at position (i, j) is the minor at (i, j) which may have the
 * sign negated, depending on the sign of the other matrix elements.
 */
export function cofactor (m: Matrix, row: number, column: number): number {

  const min = minor(m, row, column)

  return isOdd(row + column) ? -min : min
}


/**
 * The determinant is a scalar value that encodes certain properties of the
 * transformation described by the matrix (vague, right?).
 */
export function determinant (m: Matrix): number {

  if (m.rows > 2 || m.columns > 2) throw new Error(`Can't find the determinant of matrices larger than 2×2.`)

  return (m.data[0] * m.data[3]) - (m.data[1] * m.data[2])
}

/**
 * The minor of a matrix element at position (i, j) is the determinant of the
 * submatrix at (i, j).
 */
export function minor (m: Matrix, row: number, column: number): number {

  return determinant(submatrix(m, row, column))
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
