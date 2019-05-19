import { equal } from '@/math-tuples'


/**
 * The Tuple class contains an internal representation of the raw tuple.
 *
 * It can be extended to provide domain logic over specific types of tuples
 * while still allowing common operations like `add` to work on the raw data.
 */
export class Tuple {

  _tuple: [number, number, number, number]

  constructor(...args: [number, number, number, number]) {

    this._tuple = [args[0], args[1], args[2], args[3]]
  }
}

export class Color extends Tuple {

  constructor (r: number, g: number, b: number, a: number = 1.0) {
    super(r, g, b, a)
  }

  get r (): number {
    return this._tuple[0]
  }

  get g (): number {
    return this._tuple[1]
  }

  get b (): number {
    return this._tuple[2]
  }

  get a (): number {
    return this._tuple[3]
  }

  set r (value: number) {
    this._tuple[0] = value
  }

  set g (value: number) {
    this._tuple[1] = value
  }

  set b (value: number) {
    this._tuple[2] = value
  }

  set a (value: number) {
    this._tuple[3] = value
  }
}

export class Point extends Tuple {

  constructor (x: number, y: number, z: number) {
    super(x, y, z, 1.0)
  }

  get x (): number {
    return this._tuple[0]
  }

  get y (): number {
    return this._tuple[1]
  }

  get z (): number {
    return this._tuple[2]
  }

  get w (): 1.0 {
    return 1.0
  }

  set x (value: number) {
    this._tuple[0] = value
  }

  set y (value: number) {
    this._tuple[1] = value
  }

  set z (value: number) {
    this._tuple[2] = value
  }

  set w (value: 1.0) {
    this._tuple[3] = value
  }
}

export class Vector extends Tuple {

  constructor (x: number, y: number, z: number) {
    super(x, y, z, 0.0)
  }

  get x (): number {
    return this._tuple[0]
  }

  get y (): number {
    return this._tuple[1]
  }

  get z (): number {
    return this._tuple[2]
  }

  get w (): 0.0 {
    return 0.0
  }

  set x (value: number) {
    this._tuple[0] = value
  }

  set y (value: number) {
    this._tuple[1] = value
  }

  set z (value: number) {
    this._tuple[2] = value
  }

  set w (value: 0.0) {
    this._tuple[3] = value
  }
}

export function isPoint (t: Tuple): t is Point {

  return equal(t._tuple[3], 1.0)
}

export function isVector (t: Tuple): t is Vector {

  return equal(t._tuple[3], 0.0)
}
