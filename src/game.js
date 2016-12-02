class Life {
  constructor() {
    this.canvas = document.querySelector('canvas');
    this.addEvents()
  }

  addEvents() {
    window.addEventListener('resize', () => this.sizeCanvas())
  }

  sizeCanvas() {
    this.canvas.width = window.innerWidth
    this.canvas.height = window.innerWidth
  }
}

new Life()