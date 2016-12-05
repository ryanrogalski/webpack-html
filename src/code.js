class Game {
  constructor(n=10){
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.size = this.canvas.width / n
    this.n = n
    this.playing = false
    this.buildGrid(n)
    this.setupEvents()    
    this.sizeCanvas()
  }

  setupEvents(){
    const start = document.createElement('button')
    start.classList.add('btn-start', 'btn')
    start.textContent = ' ▶'
    document.body.appendChild(start)
    start.addEventListener('click', () => this.handleStart())
    this.start = start

    this.canvas.addEventListener('mouseup', (e) => this.handleUp(e))
    this.canvas.addEventListener('mousedown', (e) => this.handleDown(e))

    this.canvas.addEventListener('mousemove', (e) => this.dragCell(e))
    this.canvas.addEventListener('click', (e) => this.clickCell(e))
    window.addEventListener('resize', () => this.sizeCanvas())
  }

  handleStart(){
    this.playing ? this.stopGame() : this.startGame()       
  }

  handleDown(e) { this.dragging = true }

  handleUp(e) { this.dragging = false }

  clickCell(e) {
    this.stopGame()
    const pos = this.getMousePos(e)  
    this.fillCell(pos)
  }

  dragCell(e) {
    if (this.dragging) this.stopGame()
    if (!this.dragging) return false
    const pos = this.getMousePos(e)  
    this.fillCell(pos)
    // setTimeout(() => this.fillCell(pos), 100)
  }

  fillCell(pos){
    const x = Math.floor(pos.x / this.size)
    const y = Math.floor(pos.y / this.size)

    this.grid[x][y] = this.grid[x][y] == 1 ? 0 : 1 
    this.draw()
  }

  getMousePos(e) {
    const rect = this.canvas.getBoundingClientRect();
    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  sizeCanvas(){
    const width = window.innerWidth
    this.canvas.width = width
    this.canvas.height = width
    this.size = width / this.n
    this.draw()
  }

  buildGrid(n) {
    this.size = this.ctx.canvas.width / n

    const arr = []
    for (let i = 0; i < n; i++) {
      arr[i] = []
      for (let j = 0; j < n; j++) {
        arr[i][j] = 0
      }
    }
    
    this.grid = arr
    // this.seedGrid(seed)
  }

  seedGrid(seed) {
    seed.forEach(i => {
      const x = i[0]
      const y = i[1]
      this.grid[x][y] = 1
    })
  }

  getNeighbors(arr, x, y) {
    let count = 0

    const checkArr = (x, y) => arr[x] && arr[x][y]

    // top left
    if (checkArr(x - 1, y - 1)) count++

    // top mid
    if (checkArr(x - 1, y)) count++

    // top right
    if (checkArr(x - 1, y + 1)) count++

    // mid left
    if (checkArr(x, y - 1)) count++

    // mid right
    if (checkArr(x, y + 1)) count++

    // bottom left
    if (checkArr(x + 1, y - 1)) count++

    // bottom mid
    if (checkArr(x + 1, y)) count++

    // bottom right
    if (checkArr(x + 1, y + 1)) count++

    return count
  }

  updateGrid() {

    const updated = this.grid.map((row, x) => {      
      return row.map((cell, y) => {
        
        const n = this.getNeighbors(this.grid, x, y)        
        
        // live cell
        if (cell === 1) {
          return (n === 2 || n === 3) ? 1 : 0
        // dead cell
        } else {
          return (n === 3) ? 1 : 0
        }
      })
    })

    this.grid = updated 

    this.raf = requestAnimationFrame(() => this.draw())
  }

  draw() {

    const ctx = this.ctx
    const size = this.size
    const grid = this.grid.slice()

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.fillStyle = "#1081B1"
    ctx.strokeStyle = "#D8D8D8"
    ctx.strokeWidth = 0.5

    grid.forEach((row, x) => {
      row.forEach((cell, y) => {
        ctx.beginPath()
        ctx.rect(x * size, y * size, size, size)
        if (cell === 0) {
          ctx.stroke()
        } else {
          ctx.fill()
        }
      })
    })

    if (this.playing) this.updateGrid()
  }

  startGame() {
    this.start.textContent = '◼'

    this.playing = true
    this.draw()
  }

  stopGame() {
    this.start.textContent = '▶'
    this.playing = false

    cancelAnimationFrame(this.raf)
    this.raf = null

  }
}

new Game(100)








