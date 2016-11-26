require('./style.css')
require('./index.html')

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomDec = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(4);
}

const getDirection = () => {
  const arr = [-1,1]
  return arr[getRandom(0, 1)]
}

const rgb = (str) => str.match(/\w\w/g).map(b => parseInt(b,16));

const randomColor = () => Math.floor(Math.random()*16777215).toString(16);

const avgColor = (a, b) => {
  const color = []

  for (var i = 0; i < 3; i++) color[i] = a[i] + Math.random() * (b[i] - a[i]) | 0;

  const res = color
    .map(n => n.toString(16))
    .map(s => "00".slice(s.length) + s)
    .join('')

  return res;
}

class Point {
  constructor(size, img, x, y){

    const spread = size / 1.5

    this.startSize = size
    this.img = img
    this.cx = getRandom(x - spread, x + spread)
    this.cy = getRandom(y - spread, y + spread)
    this.speed = getRandom(500, 1500)
    this.radius = getRandom(5, 30)
    this.direction = getDirection()
    this.dead = false
    this.angle = 0
    this.birthday = performance.now()
  }

  animate(ts){
    const elapsed = ts - this.birthday 
    const inc = this.startSize / 100
    
    this.angle = Math.PI * (ts / this.speed)

    if (this.direction === 1) {
      this.x = this.cx + Math.cos(this.angle) * this.radius
      this.y = this.cy + Math.sin(this.angle) * this.radius
    } else {
      this.x = this.cx + Math.sin(this.angle) * this.radius
      this.y = this.cy + Math.cos(this.angle) * this.radius  
    }

    this.size = this.startSize - ((elapsed / 8) * inc)

    if (this.size < 0){
      this.dead = true 
    }
  }
}

class GhostDraw {
  constructor() {
    this.coords = []

    this.svg = document.querySelector('.ghost')

    this.sizeSlider = document.querySelector('.slider')
    this.sizeSlider.value = this.size = Math.floor(window.innerWidth / 30)

    this.colorSlider = document.querySelector('.jscolor')
    this.colorSlider.value = this.color = 'BDFAFF'    

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    
    this.paint = false

    this.canvasSize = this.canvasSize.bind(this)
    this.pushPoint = this.pushPoint.bind(this)

    this.bindEvents()
    this.canvasSize()
    this.sizingGhosts()
    this.animateCanvas()
  }

  bindEvents() {    
    window.addEventListener('resize', () => this.canvasSize())

    this.sizeSlider.addEventListener('change', () => {
      this.size = Number(this.sizeSlider.value)
    })

    this.colorSlider.addEventListener('change', () => {
      this.color = this.colorSlider.value;
    })

<<<<<<< HEAD
    this.canvas.addEventListener('mousemove', (e) => {
      this.clearCycle()
      this.pushPoint(e)
      this.cycle = setInterval(() => this.pushPoint(e), 100)
=======
    this.canvas.addEventListener('mousedown', (e) => {
      this.paint = true;
      this.pushPoint(e)
      this.cycle = setInterval(() => this.pushPoint(e), 100)
    })

    this.canvas.addEventListener('mousemove', (e) => {
      this.clearCycle()

      if (this.paint) {
        this.pushPoint(e)
        this.cycle = setInterval(() => this.pushPoint(e), 100)
      }
    })

    this.canvas.addEventListener('mouseup', (e) => {
      this.clearCycle()
      this.paint = false;
>>>>>>> ghost cloud
    })

    this.canvas.addEventListener('mouseleave', (e) => {
      this.clearCycle()
<<<<<<< HEAD
=======
      this.paint = false;
>>>>>>> ghost cloud
    })
  }

  clearCycle() {
    clearInterval(this.cycle)
    this.cycle = null
  }

  sizingGhosts() {
    const sm = document.querySelector('.ghost-sm')
    const lg = document.querySelector('.ghost-lg')
    const xml = (new XMLSerializer).serializeToString(this.svg)

    const img = new Image()
    img.src = `data:image/svg+xml;charset=utf-8,${xml}`

    sm.appendChild(img)
    lg.appendChild(img.cloneNode(true))
  }

  pushPoint(e) {
    const cloudSize = Math.floor(100 / this.size)

    for (let i = 0; i < cloudSize; i++) {

      const base = rgb('#ffffff')
      const cur = rgb(`#${this.color}`)
      const color = avgColor(base, cur)

      const p = new Point(
        getRandom(this.size - 20, this.size + 20),
        this.createImg(color),
        this.getMousePos(e).x,
        this.getMousePos(e).y
      )

      this.coords.push(p)
    }
  }

  createImg(color) {
    const svg = this.svg
    svg.querySelector('#inner').style.fill = `${color}`
    const xml = (new XMLSerializer).serializeToString(svg)
    const img = new Image()
    img.src = `data:image/svg+xml;charset=utf-8,${xml}`
    return img;
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }
  
  canvasSize() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerHeight
  }

  animateCanvas(ts) {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height)

    if (this.coords.length > 0) {
      for (const p of this.coords) {
        if (p.dead) {
          const i = this.coords.indexOf(p)
          this.coords.splice(i, 1)
        } else {
          const x = p.x - (p.size / 2)
          const y = p.y - (p.size / 2)        
          this.ctx.drawImage(p.img, x, y, p.size, p.size)    
          p.animate(ts)
        }        
      }      
    }
     
    requestAnimationFrame((ts) => this.animateCanvas(ts))
  }
}

new GhostDraw()