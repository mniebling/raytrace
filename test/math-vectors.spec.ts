import { expect, use } from 'chai'
import almost from 'chai-almost'
import { equal } from '@/math-tuples'
import { negate, magnitude, normalize, dot, cross } from '@/math-vectors'
import { Vector } from '@/tuples'

use(almost(Number.EPSILON))


describe('cross()', () => {

  it('should calculate the cross product of two vectors', () => {

    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)

    expect(cross(v1, v2)).to.deep.almost(new Vector(-1, 2, -1))
    expect(cross(v2, v1)).to.deep.almost(new Vector(1, -2, 1))
  })
})

describe('dot()', () => {

  it('should compute the dot product of two vectors', () => {

    const v1 = new Vector(1, 2, 3)
    const v2 = new Vector(2, 3, 4)

    expect(equal(dot(v1, v2), 20)).to.be.true
  })
})

describe('magnitude()', () => {

  it('should compute the magnitude of unit vectors', () => {

    expect(magnitude(new Vector(1, 0, 0))).to.almost(1)
    expect(magnitude(new Vector(0, 1, 0))).to.almost(1)
    expect(magnitude(new Vector(0, 0, 1))).to.almost(1)
  })

  it('should compute the magnitude of other vectors', () => {

    expect(magnitude(new Vector( 1,  2,  3))).to.almost(Math.sqrt(14))
    expect(magnitude(new Vector(-1, -2, -3))).to.almost(Math.sqrt(14))
  })
})

describe('negate()', () => {

  it('should return the opposite of a vector', () => {

    const v = new Vector(1, -2, 3)

    expect(negate(v)).to.deep.almost(new Vector(-1, 2, -3))
  })
})

describe('normalize()', () => {

  it('should normalize a vector with integer magnitude', () => {

    const v = normalize(new Vector(4, 0, 0))

    expect(v).to.deep.almost(new Vector(1, 0, 0))
  })

  it('should normalize a vector with non-integer magnitude', () => {

    const v2 = normalize(new Vector(1, 2, 3))

    expect(v2).to.deep.almost(new Vector(
      1 / Math.sqrt(14), // ≈ 0.26726
      2 / Math.sqrt(14), // ≈ 0.53452
      3 / Math.sqrt(14)  // ≈ 0.80178
    ))
  })

  it('should freak out about normalizing a vector with magnitude = 0', () => {

    const v = new Vector(0, 0, 0)

    expect(() => normalize(v)).to.throw()
  })
})
