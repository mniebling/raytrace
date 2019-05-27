import { Canvas } from '@/canvas'
import { add } from '@/math-tuples'
import { normalize } from '@/math-vectors'
import { Point, Vector } from '@/tuples'


const canvas = new Canvas(600, 400)

// Set up the HTML page
const el = document.getElementById('canvasElement') as HTMLCanvasElement
const ctx = el.getContext('2d')

if (!ctx) throw new Error(`Error getting context from canvas.`)

ctx.putImageData(canvas.getImageData(), 0, 0)


// This is pretty sloppy, definitely need to refactor this as I add more
// demos beyond this basic one.


// Define a projectile, a set of environmental forces, and an update function.
interface Projectile {

  position: Point
  velocity: Vector
}

interface Environment {

  gravity: Vector
  wind: Vector
}

function tick (env: Environment, proj: Projectile) {

  console.info(proj.position.x, proj.position.y)

  proj.position = add(proj.position, proj.velocity)

  const envForces = add(env.gravity, env.wind)
  proj.velocity = add(proj.velocity, envForces)
}

// Initialize an environment and projectile.
const env: Environment = {
  gravity: new Vector(0, -0.1, 0),
  wind: new Vector(-0.01, 0, 0)
}

const p: Projectile = {
  position: new Point(0, 1, 0),
  velocity: normalize(new Vector(1, 1, 0))
}

// Run tick until the projectile is off the canvas.
let i = 0

while (p.position.y > 0) {

  console.info(p.position.x, p.position.y)

  tick(env, p)

  console.info(`Tick: ${++i}`)
  console.info(`(${p.position.x}, ${p.position.y})`)
}
