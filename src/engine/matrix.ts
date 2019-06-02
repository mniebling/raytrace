export class Matrix {

  data: number[]
  rows: number
  columns: number

  /**
   * Creates a new matrix with the given values, or the 4×4 identity matrix if
   * no values are provided.
   */
  constructor (matrix?: number[]) {

    if (matrix && !Number.isInteger(Math.sqrt(matrix.length))) throw new Error(`Uneven matrices aren't supported.`)

    if (!matrix || !matrix.length) {
      this.data = [
        1, 0, 0, 0,
        0, 1, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
      ]
    }
    else {
      this.data = new Array(matrix.length)

      for (let i = 0; i < matrix.length; i++) {
        this.data[i] = matrix[i]
      }
    }

    this.rows = Math.sqrt(this.data.length)
    this.columns = Math.sqrt(this.data.length)
  }

  /**
   * Rows and columns are 0-indexed.
   */
  getValueAt (row: number, column: number) {

    if (row < 0 || column < 0) throw new Error(`Row and column must be > 0.`)
    if (row >= this.rows) throw new Error(`Row must be < number of rows (${this.rows})`)
    if (column >= this.columns) throw new Error(`Column must be < number of columns (${this.columns})`)

    return this.data[(row * this.columns) + column]
  }
}
