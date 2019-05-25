import { Canvas } from '@/canvas'


const canvas = new Canvas(600, 400)

// Set up the HTML page
const el = document.getElementById('canvasElement') as HTMLCanvasElement
const ctx = el.getContext('2d')

if (!ctx) throw new Error(`Error getting context from canvas.`)


// Draw something...
ctx.putImageData(canvas.getImageData(), 0, 0)
