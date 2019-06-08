import { Matrix } from '@/engine/matrix'


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
export function transpose (m: Matrix) {

  const result = new Matrix()

  for (let row = 0; row < 4; row++) {
    for (let col = 0; col < 4; col++) {
      result.setValueAt(row, col, m.getValueAt(col, row))
    }
  }

  return result
}
