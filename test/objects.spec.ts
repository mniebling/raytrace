import {
  Sphere,
  Matrix,
  Point,
  translate
} from '@/engine'


describe('new Sphere()', () => {

  it('should initialize transform', () => {

    const s = new Sphere()
    expect(s.transform).toBeDeepCloseTo(new Matrix())

    const s2 = new Sphere(
      new Point(0, 0 ,0),
      1,
      translate(1, 1, 1)
    )
    expect(s2.transform).toBeDeepCloseTo(translate(1, 1, 1))
  })
})
