import { Canvas } from '@/canvas'


const canvas = new Canvas(600, 400)

// Set up the HTML page
const el = document.getElementById('canvasElement') as HTMLCanvasElement
const ctx = el.getContext('2d')

if (!ctx) throw new Error(`Error getting context from canvas.`)


// Draw something...
const imgData = ctx.createImageData(canvas.height, canvas.width)

// Iterate through every pixel
for (let i = 0; i < imgData.data.length; i += 4) {
  // Modify pixel data
  imgData.data[i + 0] = 190  // R value
  imgData.data[i + 1] = 0    // G value
  imgData.data[i + 2] = 210  // B value
  imgData.data[i + 3] = 255  // A value
}

ctx.putImageData(imgData, 0, 0)


// This errors out:
// ctx.putImageData(canvas.getImageData(), 0, 0)
