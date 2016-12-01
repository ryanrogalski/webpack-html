class GameOfLife {
  constructor(){
    this.board = document.querySelector('.board')
    this.fps = 6
    this.interval = 1000 / this.fps
    this.randomCount = 4
    this.count = 0
    this.animation = null 
    this.then = 0
    this.makeBoard(100, 100)
  }
  
  makeBoard(rows, cols) {
    const cells = []

    for (var i = 0; i < rows; i++) {
      const row = document.createElement('div');
      row.classList.add('row')
      for (var j = 0; j < cols; j++) {
        const cell = document.createElement('div')
        cell.classList.add('cell')
        row.appendChild(cell)
      }
      cells.push(row)
    }
    for (var i of cells) {
      this.board.appendChild(i)
    }
    this.configBoard()
  }

  configBoard() {
    if (this.count === this.randomCount) {
      this.setupEvents()
      return false
    }

    const arr = this.getCells()
    for (var [i, row] of arr.entries()) {
      for (var [j, cell] of row.entries()) {
        const r = Math.floor(Math.random() * arr[0].length)
        if (i === r || j === r) {
          cell.classList.add('live')
        }
      }
    }
    this.count++
    this.configBoard()
  }

  setupEvents() {
    this.board.addEventListener('click', () => {
      const playing = this.board.classList.contains('playing')
      if (playing) {
        this.stopGame()
      } else {
        this.startGame()
      }
    })
    this.startGame()
  }

  getCells() {
    const c = document.querySelectorAll('.cell')
    const r = document.querySelectorAll('.row')

    const cells = Array.from(c)
    const rows = Array.from(r)
    const result = []
    for (var row of rows) {
      const rowArr = []
      const children = Array.from(row.childNodes)
      for (var cell of children) {
        rowArr.push(cell)
      }
      result.push(rowArr)
    }
    return result
  }

  collectNeighbors(arr, i, j) {
    const len = arr[0].length
    const neighbors = []
    
    // top left
    if (i - 1 >= 0 && j - 1 >= 0) { neighbors.push(arr[i - 1][j - 1]) }
    // top middle
    if (i - 1 >= 0) { neighbors.push(arr[i - 1][j]) }
    // top right
    if (i - 1 >= 0 && j + 1 < len) { neighbors.push(arr[i - 1][j + 1]) }
    // middle left
    if (j - 1 >= 0) { neighbors.push(arr[i][j - 1]) }
    // middle right
    if (j + 1 < len) { neighbors.push(arr[i][j + 1]) }
    // bottom left
    if (i + 1 < len && j - 1 >= 0) { neighbors.push(arr[i + 1][j - 1]) }
    // bottom middle
    if (i + 1 < len) { neighbors.push(arr[i + 1][j]) }
    // bottom right
    if (i + 1 < len && j + 1 < len) { neighbors.push(arr[i + 1][j + 1]) }
      
    return neighbors
  }

  runGame(ts) {
    let elapsed = ts - this.then

    const arr = this.getCells()
    const livecells = document.querySelectorAll('.live').length

    if (livecells === 0) {
      console.log('game over');
      return false
    }

    if (elapsed > this.interval) {
      this.then = ts - (elapsed % this.interval)

      for (var [i, row] of arr.entries()) {
        for (var [j, cell] of row.entries()) {
          const neighbors = this.collectNeighbors(arr, i, j)
          const liveCount = neighbors.filter(function(i) {
              return i.classList.contains('live')
            }).length
            // live cells
          if (cell.classList.contains('live')) {
            // if a live cell has two or three live
            // neighbors, it continues living
            // if live cell has less than two, or more
            // than three live neighbors, it dies
            if (liveCount > 3 || liveCount < 2) {
              cell.classList.remove('live')
            }
            // dead cells
          } else {
            if (liveCount === 3) {
              // if dead cell has exactly three
              // live neighbors, it comes to life
              cell.classList.add('live')
            }
          }
        }
      }    
    }

    this.animation = requestAnimationFrame((ts) => this.runGame(ts))
  }

  startGame() {
    this.runGame()
    this.board.classList.add('playing')
  }

  stopGame() {
    cancelAnimationFrame(this.animation)
    this.animation = null
    this.board.classList.remove('playing')
  }
}

new GameOfLife()
