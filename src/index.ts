import { Canvas } from '@/canvas'
import { add, multiply } from '@/math-tuples'
import { normalize } from '@/math-vectors'
import { Point, Vector, Color } from '@/tuples'


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

function updateEnv (env: Environment, proj: Projectile) {

  console.info(proj.position.x, proj.position.y)

  proj.position = add(proj.position, proj.velocity)

  const envForces = add(env.gravity, env.wind)
  proj.velocity = add(proj.velocity, envForces)
}

// Initialize an environment and projectile.
const env: Environment = {
  gravity: new Vector(0, -0.25, 0),
  wind: new Vector(-0.01, 0, 0)
}

const p: Projectile = {
  position: new Point(0, 1, 0),
  velocity: multiply(normalize(new Vector(1, 3, 0)), 10.0)
}

// Our rendering canvas has inverted coordinates from the world canvas
function projectilePositionToCtxPosition(canvas: Canvas, p: Projectile): Point {

  return new Point(
    Math.floor(p.position.x),
    Math.floor((p.position.y > 0) ? canvas.height - p.position.y : 1),
    p.position.z
  )
}

// Get the updated canvas image data with the new point plotted
function updateCanvas (canvas: Canvas, p: Projectile): ImageData {

  const pink = new Color(1, 0.7, 0.8)
  const pos = projectilePositionToCtxPosition(canvas, p)

  canvas.setPixel(pos.x, pos.y, pink)

  return canvas.getImageData()
}

// Run tick until the projectile is off the canvas.
function tick () {

  if (!ctx) throw new Error(`No canvas context.`)

  console.info(`(${p.position.x}, ${p.position.y})`)

  updateEnv(env, p)
  ctx.putImageData(updateCanvas(canvas, p), 0, 0)

  if (p.position.y > 0) window.webkitRequestAnimationFrame(tick)
}

window.requestAnimationFrame(tick)
