require('./style.css')
require('./index.html')

const getRandom = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min
}

const getRandomDec = (min, max) => {
  return (Math.random() * (max - min) + min).toFixed(4);
}

const getDirection = () => {
  const arr = [-1, 1]
  return arr[getRandom(0, 1)]
}

const rgbArray = (str) => {
  const res = str
    .substring(4, str.length-1)
    .replace(/ /g, '')
    .split(',')
    .map(i => Number(i))

  return res
}

const avgColor = (rgb) => {
  const out = []
  
  for (const i of rgb){
    const dif = 255 - i
    const r = 255 - Math.floor(Math.random() * dif)
    out.push(r)
  }
  
  return `rgb(${out[0]},${out[1]},${out[2]})`
}

class Ghost {
  constructor(size, img, x, y) {
    const spread = size * getRandomDec(.2, 1.2)
    this.alpha = 0
    this.startSize = size
    this.size = size / 3
    this.baby = true
    this.img = img
    this.cx = getRandom(x - spread, x + spread)
    this.cy = getRandom(y - spread, y + spread)
    this.speed = getRandom(500, 1500)
    this.radius = getRandom(5, 30)
    this.direction = getDirection()
    this.dead = false
    this.angle = 0
    this.saveTime = performance.now()
  }

  animate(ts) {
    const elapsed = ts - this.saveTime
    const inc = this.startSize / 500

    this.angle = Math.PI * (ts / this.speed)

    if (this.direction === 1) {
      this.x = this.cx + Math.cos(this.angle) * this.radius
      this.y = this.cy + Math.sin(this.angle) * this.radius
    } else {
      this.x = this.cx - Math.sin(this.angle) * this.radius
      this.y = this.cy - Math.cos(this.angle) * this.radius
    }          
    
    this.alpha = (this.size / this.startSize)
    
    if (this.baby) {    
      this.size = this.size + (elapsed * inc)
    } else {      
      this.size = this.startSize - ((elapsed / 2.2) * inc)
    }

    if (this.size >= this.startSize) {
      this.baby = false
      this.saveTime = ts
      this.startSize = this.size
    }
    
    if (this.size < 0) {
      this.dead = true
    }
  }
}

class GhostCloud {
  constructor() {
    this.size = 50
    this.paint = false
    this.ghostArray = []

    this.svg = document.querySelector('.ghost')

    this.colorWrap = document.querySelector('.color-wrap')

    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')

    this.canvasSize = this.canvasSize.bind(this)
    this.pushGhost = this.pushGhost.bind(this)

    this.bindEvents()
    this.buildColorBar(.1,0,2,4,200,50)
    this.canvasSize()
    this.animateCanvas()
  }

  buildColorBar(frequency, phase1, phase2, phase3, center=128, width=127, len=50) {

    for (let i = 0; i < len; i++) {
      const red = Math.floor(Math.sin(frequency * i + phase1) * width + center);
      const grn = Math.floor(Math.sin(frequency * i + phase2) * width + center);
      const blu = Math.floor(Math.sin(frequency * i + phase3) * width + center);

      const colorBlock = document.createElement('div')
      colorBlock.classList.add('color-block')
      const bg = `rgb(${red}, ${grn}, ${blu})`
      colorBlock.setAttribute('color', bg)

      colorBlock.style.borderColor = bg
      colorBlock.style.backgroundColor = bg

      this.colorWrap.appendChild(colorBlock);
    }

    this.setFirstColor()
  }

  setFirstColor() {
    this.colorList = [...document.querySelectorAll('.color-block')]
    const mid = this.colorList[25]
    mid.classList.add('selected')
    this.color = mid.getAttribute('color')
  }

  bindEvents() {    
    window.addEventListener('resize', () => this.canvasSize())

    this.colorWrap.addEventListener('click', (e) => {
      
      clearTimeout(this.colorTimeout)
      this.colorTimeout = null

      const color = e.target.getAttribute('color')
      this.color = color

      this.colorWrap.childNodes.forEach(i => i.classList.remove('selected'))
      e.target.classList.add('selected')
    })    

    this.colorWrap.addEventListener('dblclick', () => {
      clearTimeout(this.colorTimeout)
      this.colorTimeout = null

      const cur = document.querySelector('.selected')
      const index = this.colorList.indexOf(cur)

      this.animateColorBar(index)
    })    

    this.canvas.addEventListener('mousedown', (e) => {
      this.paint = true;
      this.pushGhost(e)
      this.cycle = setInterval(() => this.pushGhost(e), 100)
    })

    this.canvas.addEventListener('mousemove', (e) => {
      this.clearCycle()

      if (this.paint) {
        this.pushGhost(e)
        this.cycle = setInterval(() => this.pushGhost(e), 100)
      }
    })

    this.canvas.addEventListener('mouseup', (e) => {
      this.clearCycle()
      this.paint = false;
    })

    this.canvas.addEventListener('mouseleave', (e) => {
      this.clearCycle()
      this.paint = false;
    })
  }

  animateColorBar(index) {    
    const len = this.colorList.length - 1

    index === len ? index = 0 : index++

    this.colorTimeout = setTimeout(() => {
      if (index === 0) {
        this.colorList[len].classList.remove('selected')
      } else {
        this.colorList[index - 1].classList.remove('selected')
      }
      this.colorList[index].classList.add('selected')
      const currentColor = this.colorList[index].getAttribute('color')
      this.color = currentColor

      this.animateColorBar(index)
    }, 400)
  }

  clearCycle() {
    clearInterval(this.cycle)
    this.cycle = null
  }

  pushGhost(e) {
    const cloudSize = Math.floor(getRandom(50, 150) / this.size)

    for (let i = 0; i < cloudSize; i++) {

      const rgb = rgbArray(this.color)
      const color = avgColor(rgb)

      const g = new Ghost(
        getRandom(this.size - 20, this.size + 20),
        this.createImg(color),
        this.getMousePos(e).x,
        this.getMousePos(e).y
      )

      this.ghostArray.push(g)
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

    if (this.ghostArray.length > 0) {
      for (const g of this.ghostArray) {
        if (g.dead) {
          const i = this.ghostArray.indexOf(g)
          this.ghostArray.splice(i, 1)
        } else {
          const x = g.x - (g.size / 2)
          const y = g.y - (g.size / 2)

          this.ctx.globalAlpha = g.alpha
          this.ctx.drawImage(g.img, x, y, g.size, g.size)
          g.animate(ts)
        }
      }
    }

    requestAnimationFrame((ts) => this.animateCanvas(ts))
  }
}

new GhostCloud()




