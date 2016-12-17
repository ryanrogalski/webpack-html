function createButtons(){
  const arr = Array(10).fill(0).map((e, i) => e = i+1)

  arr.forEach(i => {
    const btn = document.createElement('button')
    btn.textContent = `Button ${i}`
    btn.addEventListener('click', () => alert(i))
    document.body.appendChild(btn)
  })
}

createButtons()
