import { multiply } from '@/engine/math-general'
import { Matrix } from '@/engine/matrix'
import {
  cofactor,
  determinant,
  inverse,
  isInvertible,
  minor,
  transpose,
  submatrix
} from '@/engine/math-matrices'


describe('.cofactor()', () => {

  it('should calculate the cofactor of a 3×3 matrix', () => {

    const m = new Matrix([
      3,  5,  0,
      2, -1, -7,
      6, -1,  5
    ])

    expect(minor(m, 0, 0)).toFloatingEqual(-12)
    expect(cofactor(m, 0, 0)).toFloatingEqual(-12)

    expect(minor(m, 1, 0)).toFloatingEqual(25)
    expect(cofactor(m, 1, 0)).toFloatingEqual(-25)
  })
})

describe('.determinant()', () => {

  it('should find the determinant of a 2×2 matrix', () => {

    const m = new Matrix([
       1, 5,
      -3, 2
    ])

    expect(determinant(m)).toFloatingEqual(17)
  })

  it('should find the determinant of a 3×3 matrix', () => {

    const m = new Matrix([
       1, 2,  6,
      -5, 8, -4,
       2, 6,  4
    ])

    expect(cofactor(m, 0, 0)).toFloatingEqual(56)
    expect(cofactor(m, 0, 1)).toFloatingEqual(12)
    expect(cofactor(m, 0, 2)).toFloatingEqual(-46)

    expect(determinant(m)).toFloatingEqual(-196)
  })

  it('should find the determinant of a 4×4 matrix', () => {

    const m = new Matrix([
      -2, -8,  3,  5,
      -3,  1,  7,  3,
       1,  2, -9,  6,
      -6,  7,  7, -9
    ])

    expect(cofactor(m, 0, 0)).toFloatingEqual(690)
    expect(cofactor(m, 0, 1)).toFloatingEqual(447)
    expect(cofactor(m, 0, 2)).toFloatingEqual(210)
    expect(cofactor(m, 0, 3)).toFloatingEqual(51)

    expect(determinant(m)).toFloatingEqual(-4071)
  })
})

describe('.inverse()', () => {

  it('should calculate the inverse of a matrix', () => {

    const m = new Matrix([
      -5,  2,  6, -8,
       1, -5,  1,  8,
       7,  7, -6, -7,
       1, -3,  7,  4
    ])

    const invM = inverse(m)

    // Values in `invM` equal the cofactor at the transposed position divided by the determinant.
    expect(determinant(m)).toFloatingEqual(532)

    expect(cofactor(m, 2, 3)).toFloatingEqual(-160)
    expect(invM.getValueAt(3, 2)).toFloatingEqual(-160 / 532)

    expect(cofactor(m, 3, 2)).toFloatingEqual(105)
    expect(invM.getValueAt(2, 3)).toFloatingEqual(105 / 532)

    expect(invM).toBeDeepCloseTo(new Matrix([
       0.21805,  0.45113,  0.24060, -0.04511,
      -0.80827, -1.45677, -0.44361,  0.52068,
      -0.07895, -0.22368, -0.05263,  0.19737,
      -0.52256, -0.81391, -0.30075,  0.30639
    ]), 5)
  })

  it('should calculate the inverse when a row has all positive values', () =>  {

    const m = new Matrix([
       8, -5,  9,  2,
       7,  5,  6,  1,
      -6,  0,  9,  6,
      -3,  0, -9, -4
    ])

    expect(inverse(m)).toBeDeepCloseTo(new Matrix([
      -0.15385, -0.15385, -0.28205, -0.53846,
      -0.07692,  0.12308,  0.02564,  0.03077,
       0.35897,  0.35897,  0.43590,  0.92308,
      -0.69231, -0.69231, -0.76923, -1.92308
    ]), 5)
  })

  it('should calculate the inverse when a row has all negative values', () => {

    const m = new Matrix([
       9,  3,  0,  9,
      -5, -2, -6, -3,
      -4,  9,  6,  4,
      -7,  6,  6,  2
    ])

    expect(inverse(m)).toBeDeepCloseTo(new Matrix([
      -0.04074, -0.07778,  0.14444, -0.22222,
      -0.07778,  0.03333,  0.36667, -0.33333,
      -0.02901, -0.14630, -0.10926,  0.12963,
       0.17778,  0.06667, -0.26667,  0.33333
    ]), 5)
  })

  it('should freak out about un-invertible matrices', () => {

     const m = new Matrix([
      -4,  2, -2, -3,
       9,  6,  2,  6,
       0, -5,  1, -5,
       0,  0,  0,  0
    ])

    expect(isInvertible(m)).toBe(false)
    expect(() => inverse(m)).toThrow()
  })

  test('if A * B = C, then C * inverse(B) = A', () => {

    const m1 = new Matrix([
       3, -9,  7,  3,
       3, -8,  2, -9,
      -4,  4,  4,  1,
      -6,  5, -1,  1
    ])

    const m2 = new Matrix([
      8,  2, 2, 2,
      3, -1, 7, 0,
      7,  0, 5, 4,
      6, -2, 0, 5
    ])

    const m3 = multiply(m1, m2)

    expect(multiply(m3, inverse(m2))).toBeDeepCloseTo(m1)
  })

  test('the inverse of the identity matrix is the identity matrix', () => {

    const identity = new Matrix()

    expect(inverse(identity)).toBeDeepCloseTo(identity)
  })

  test('multiplying a matrix by its inverse results in the identity matrix', () => {

    const identity = new Matrix()
    const m = new Matrix([
       -5,  2,  6, -8,
        1, -5,  1,  8,
        7,  7, -6, -7,
        1, -3,  7,  4
    ])

    const invM = inverse(m)

    expect(multiply(m, invM)).toBeDeepCloseTo(identity)
  })
})

describe('.isInvertible()', () => {

  it('should return true for invertible matrices', () => {

    const m = new Matrix([
      6,  4, 4,  4,
      5,  5, 7,  6,
      4, -9, 3, -7,
      9,  1, 7, -6
    ])

    expect(determinant(m)).toFloatingEqual(-2120)
    expect(isInvertible(m)).toBe(true)
  })

  it('should return false for non-invertible matrices', () => {

    const m = new Matrix([
      -4,  2, -2, -3,
       9,  6,  2,  6,
       0, -5,  1, -5,
       0,  0,  0,  0
    ])

    expect(determinant(m)).toFloatingEqual(0)
    expect(isInvertible(m)).toBe(false)
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
