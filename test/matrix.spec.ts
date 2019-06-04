import { Matrix } from '@/engine/matrix'


describe('new Matrix()', () => {

  it('should create a 2×2 matrix', () => {

    const m = new Matrix([
      -3,  5,
       1, -2
    ])

    expect(m.getValueAt(0, 0)).toFloatingEqual(-3)
    expect(m.getValueAt(0, 1)).toFloatingEqual(5)
    expect(m.getValueAt(1, 0)).toFloatingEqual(1)
    expect(m.getValueAt(1, 1)).toFloatingEqual(-2)
  })

  it('should create a 3×3 matrix', () => {

    const m = new Matrix([
      -3,  5,  0,
       1, -2, -7,
       0,  1,  1
    ])

    expect(m.getValueAt(0, 0)).toFloatingEqual(-3)
    expect(m.getValueAt(1, 1)).toFloatingEqual(-2)
    expect(m.getValueAt(2, 2)).toFloatingEqual(1)
  })

  it('should create a 4×4 matrix', () => {

    const m = new Matrix([
      1,    2,    3,    4,
      5.5,  6.5,  7.5,  8.5,
      9,    10,   11,   12,
      13.5, 14.5, 15.5, 16.5
    ])

    expect(m.getValueAt(0, 0)).toFloatingEqual(1)
    expect(m.getValueAt(0, 3)).toFloatingEqual(4)
    expect(m.getValueAt(1, 0)).toFloatingEqual(5.5)
    expect(m.getValueAt(1, 2)).toFloatingEqual(7.5)
    expect(m.getValueAt(3, 0)).toFloatingEqual(13.5)
    expect(m.getValueAt(3, 2)).toFloatingEqual(15.5)
  })

  it('should freak out about uneven matrices', () => {

    function createUnevenMatrix () {
      const m = new Matrix([
        1, 2,
        3, 4,
        5, 6
      ])
    }

    expect(createUnevenMatrix).toThrow()
  })
})

describe('.getValueAt()', () => {

  it('should get the value given a valid row & col', () => {

    const identity = new Matrix()

    expect(identity.getValueAt(0, 0)).toFloatingEqual(1)
    expect(identity.getValueAt(0, 1)).toFloatingEqual(0)
    expect(identity.getValueAt(1, 0)).toFloatingEqual(0)
    expect(identity.getValueAt(1, 1)).toFloatingEqual(1)
    expect(identity.getValueAt(2, 2)).toFloatingEqual(1)
    expect(identity.getValueAt(3, 3)).toFloatingEqual(1)
  })

  it('should freak out about invalid rows or cols', () => {

    const identity = new Matrix()

    expect(() => identity.getValueAt(-1,  0)).toThrow()
    expect(() => identity.getValueAt( 0, -1)).toThrow()
    expect(() => identity.getValueAt( 4,  0)).toThrow()
    expect(() => identity.getValueAt( 0,  4)).toThrow()
  })
})

describe('.setValueAt()', () => {

  it('should set the value given a valid row & col', () => {

    const m = new Matrix()

    m.setValueAt(0, 0, 10)
    expect(m.getValueAt(0, 0)).toFloatingEqual(10)

     m.setValueAt(1, 2, 3.4)
    expect(m.getValueAt(1, 2)).toFloatingEqual(3.4)

    m.setValueAt(3, 3, -5)
    expect(m.getValueAt(3, 3)).toFloatingEqual(-5)
  })

  it('should freak out about invalid rows or cols', () => {

    const m = new Matrix()

    expect(() => m.setValueAt(-1,  0, 0)).toThrow()
    expect(() => m.setValueAt( 0, -1, 0)).toThrow()
    expect(() => m.setValueAt( 4,  0, 0)).toThrow()
    expect(() => m.setValueAt( 0,  4, 0)).toThrow()
  })
})
