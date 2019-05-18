import { expect } from 'chai'
import { add, equal, subtract, negate, multiply, divide, magnitude, normalize, dot, cross } from '@/math'
import { Tuple, Point, Vector } from '@/tuples'


describe('math.ts', () => {

  describe('add()', () => {

    it('should add a point and a vector', () => {

      const a = new Point(1.5, 2.5, -1.0)
      const b = new Vector(0.0, -1.0, 3.9)

      expect(add(a, b)).to.deep.equal(new Point(1.5, 1.5, 2.9))
    })

    it('should add two vectors', () => {

      const a = new Vector(1.5, 2.5, -1.0)
      const b = new Vector(0.0, -1.0, 3.9)

      expect(add(a, b)).to.deep.equal(new Vector(1.5, 1.5, 2.9))
    })

    it('should freak out about adding two points', () => {

      const a = new Point(1.0, 1.0, 1.0)
      const b = new Point(1.0, 1.0, 1.0)

      expect(() => add(a, b)).to.throw()
    })
  })

  describe('cross()', () => {

    it('should calculate the cross product of two vectors', () => {

      const a = new Vector(1, 2, 3)
      const b = new Vector(2, 3, 4)

      expect(cross(a, b)).to.deep.equal(new Vector(-1, 2, -1))
      expect(cross(b, a)).to.deep.equal(new Vector(1, -2, 1))
    })
  })

  describe('divide()', () => {

    it('should divide a vector by a scalar', () => {

      const v = new Vector(1, -2 ,3)
      const s = 2

      expect(divide(v, s)).to.deep.equal(new Vector(0.5, -1, 1.5))
    })

    it('should handle zeroes in the denominator', () => {

      const v = new Vector(1, -2 ,3)
      const s = 0

      expect(divide(v, s)).to.deep.equal(new Vector(Infinity, -Infinity, Infinity))
    })

    it('should handle zeroes in the numerator', () => {

      const v = new Vector(0, 0, 4)
      const s = 2

      expect(divide(v, s)).to.deep.equal(new Vector(0, 0, 2))
    })

    it('should freak out about dividing 0/0', () => {

      const v = new Vector(0, 1, 2)
      const s = 0

      expect(() => divide(v, s)).to.throw()
    })
  })

  describe('dot()', () => {

    it('should compute the dot product of two vectors', () => {

      const v1 = new Vector(1, 2, 3)
      const v2 = new Vector(2, 3, 4)

      expect(equal(dot(v1, v2), 20)).to.be.true
    })
  })

  describe('equal()', () => {

    it('should compare two floating point numbers', () => {

      expect(equal(1.0, 1.0)).to.be.true
      expect(equal(1.0, 1.1)).to.be.false
    })

    it('should compare two tuples', () => {

      const a = new Tuple(1.0, 2.5, -3.0, 1.0)
      const b = new Tuple(6.7, 2.5, 3.0, 0.0)

      expect(equal(a, a)).to.be.true
      expect(equal(a, b)).to.be.false
    })
  })

  describe('magnitude()', () => {

    it('should compute the magnitude of unit vectors', () => {

      expect(magnitude(new Vector(1, 0, 0))).to.equal(1)
      expect(magnitude(new Vector(0, 1, 0))).to.equal(1)
      expect(magnitude(new Vector(0, 0, 1))).to.equal(1)
    })

    it('should compute the magnitude of other vectors', () => {

      expect(magnitude(new Vector(1, 2, 3))).to.equal(Math.sqrt(14))
      expect(magnitude(new Vector(-1, -2, -3))).to.equal(Math.sqrt(14))
    })
  })

  describe('multiply()', () => {

    it('should multiply by an integer', () => {

      const v = new Vector(1, -2, 3)
      const s = 3

      expect(multiply(v, s)).to.deep.equal(new Vector(3, -6, 9))
    })

    it('should multiply by a fraction', () => {

      const v = new Vector(1, -2 ,3)
      const s = 0.5

      expect(multiply(v, s)).to.deep.equal(new Vector(0.5, -1, 1.5))
    })
  })

  describe('negate()', () => {

    it('should return the opposite of a vector', () => {

      const v = new Vector(1, -2, 3)

      expect(negate(v)).to.deep.equal(new Vector(-1, 2, -3))
    })
  })

  describe('normalize()', () => {

    it('should normalize a vector with integer magnitude', () => {

      const v = normalize(new Vector(4, 0, 0))

      expect(v).to.deep.equal(new Vector(1, 0, 0))
    })

    it('should normalize a vector with non-integer magnitude', () => {

      const v2 = normalize(new Vector(1, 2, 3))

      expect(v2).to.deep.equal(new Vector(
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

  describe('subtract()', () => {

    it('should subtract two points', () => {

      const a = new Point(3, 2, 1)
      const b = new Point(5, 6, 7)

      expect(subtract(a, b)).to.deep.equal(new Vector(-2, -4, -6))
    })

    it('should subtract a vector from a point', () => {

      const a = new Point(3, 2, 1)
      const b = new Vector(5, 6, 7)

      expect(subtract(a, b)).to.deep.equal(new Point(-2, -4, -6))
    })

    it('should subtract two vectors', () => {

      const a = new Vector(3, 2, 1)
      const b = new Vector(5, 6, 7)

      expect(subtract(a, b)).to.deep.equal(new Vector(-2, -4, -6))
    })
  })
})
