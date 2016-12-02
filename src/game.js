// const glider = [
//   [0, 0],
//   [10, 0]
// ]
const glider = [
  [1, 5],
  [1, 6],
  [2, 5],
  [2, 6],
  [11, 5],
  [11, 6],
  [11, 7],
  [12, 4],
  [12, 8],
  [13, 3],
  [13, 9],
  [14, 3],
  [14, 9],
  [15, 6],
  [16, 4],
  [16, 8],
  [17, 5],
  [17, 6],
  [17, 7],
  [18, 6],
  [21, 3],
  [21, 4],
  [21, 5],
  [22, 3],
  [22, 4],
  [22, 5],
  [23, 2],
  [23, 6],
  [25, 1],
  [25, 2],
  [25, 6],
  [25, 7],
  [35, 3],
  [35, 4],
  [36, 3],
  [36, 4]
]

class Life {
  constructor() {
    this.canvas = document.querySelector('canvas')
    this.ctx = this.canvas.getContext('2d')
    this.len = 64
    this.sizeCanvas()
    this.createGrid()
    this.addEvents()
  }

  addEvents() {
    window.addEventListener('resize', () => this.sizeCanvas())
  }

  createGrid() {
    const cells = []

    for (let i=0;i<this.len;i++){
      cells[i] = []
      for (let j=0;j<this.len;j++){
        cells[i][j] = 0       
      }
    }

    this.cells = cells
    this.addGlider()
  }

  addGlider() {
    glider.forEach(i => {
      const x = i[0]
      const y = i[1]
      this.cells[x][y] = 1
    })

    this.draw(this.cells)
  }

  sizeCanvas() {
    this.canvas.width = window.innerWidth / 2
    this.canvas.height = this.canvas.width
    this.size = this.canvas.width / this.len
  }

  draw() {
    const ctx = this.ctx 
    const size = this.size

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height)
    ctx.strokeStyle = '#e1e1e1'
    ctx.fillStyle = '#67DDDD'
    
    for (const [x, row] of this.cells.entries()){
      for (const [y, cell] of row.entries()){
        ctx.beginPath()
        ctx.rect(x*size, y*size, size, size)

        if (cell === 0) {
          ctx.stroke()
        } else {
          ctx.fill()
        }
      }
    }

    requestAnimationFrame(() => this.updateCells())
    // setTimeout(() => this.updateCells(), 1500)
  }

  updateCells() {
    console.log('update');
    const arr = []

    for (const [x, row] of this.cells.entries()){
      arr[x] = []
      for (const [y, cell] of row.entries()){
        
        let val = 0
        const neighbors = this.countNeighbors(x, y)

        // live cell
        if (cell > 0) {
          val = (neighbors === 2 || neighbors === 3) ? 1 : 0
        } else {
          val = (neighbors === 3) ? 1 : 0
        }

        arr[x][y] = val
      }
    }    

    this.draw()
  }

  countNeighbors(x, y) {
    let amount = 0

    const isFilled = (x, y) => {
      return this.cells[x] && this.cells[x][y]      
    }

    if (isFilled(x - 1, y - 1)) amount++
    if (isFilled(x - 1, y)) amount++
    if (isFilled(x - 1, y + 1)) amount++

    if (isFilled(x - 1, y)) amount++
    if (isFilled(x + 1, y)) amount++

    if (isFilled(x + 1, y - 1)) amount++
    if (isFilled(x + 1, y)) amount++
    if (isFilled(x + 1, y + 1)) amount++

    return amount
  }

}

new Life()