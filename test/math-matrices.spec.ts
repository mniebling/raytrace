import { determinant, minor, transpose, submatrix } from '@/engine/math-matrices'
import { Matrix } from '@/engine/matrix'


describe('.determinant()', () => {

  it('should find the determinant of a 2×2 matrix', () => {

    const m = new Matrix([
       1, 5,
      -3, 2
    ])

    expect(determinant(m)).toFloatingEqual(17)
  })

  it('should freak out about matrices larger than 2×2', () => {

    const identity = new Matrix()

    expect(() => determinant(identity)).toThrow()
  })
})

describe('.minor()', () => {

  it('should calculate the minor of a 3×3 matrix', () => {

    const m = new Matrix([
      3,  5,  0,
      2, -1, -7,
      6, -1,  5
    ])

    expect(determinant(submatrix(m, 1, 0))).toFloatingEqual(25)
    expect(minor(m, 1, 0)).toFloatingEqual(25)
  })
})

describe('.submatrix()', () => {

  it('should turn a 3×3 matrix into a 2×2 matrix', () => {

    const m1 = new Matrix([
       1, 5,  0,
      -3, 2,  7,
       0, 6, -3
    ])

    const m2 = new Matrix([
      -3, 2,
       0, 6
    ])

    expect(submatrix(m1, 0, 2)).toBeDeepCloseTo(m2)
  })

  it('should turn a 4×4 matrix into a 3×3 matrix', () => {

    const m1 = new Matrix([
      -6, 1,  1, 6,
      -8, 5,  8, 6,
      -1, 0,  8, 2,
      -7, 1, -1, 1
    ])

    const m2 = new Matrix([
      -6,  1, 6,
      -8,  8, 6,
      -7, -1, 1
    ])

    expect(submatrix(m1, 2, 1)).toBeDeepCloseTo(m2)
  })
})

describe('.transpose()', () => {

  it('should transpose matrices', () => {

    const m1 = new Matrix([
      0, 9, 3, 0,
      9, 8, 0, 8,
      1, 8, 5, 3,
      0, 0, 5, 8
    ])

    const m2 = new Matrix([
      0, 9, 1, 0,
      9, 8, 8, 0,
      3, 0, 5, 5,
      0, 8, 3, 8
    ])

    expect(transpose(m1)).toBeDeepCloseTo(m2)
  })

  it('should transpose the identity matrix', () => {

    const identity = new Matrix()

    expect(transpose(identity)).toBeDeepCloseTo(identity)
  })
})
