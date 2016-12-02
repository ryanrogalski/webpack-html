require('./index.html')
require('./style.css')

let list = [...document.querySelectorAll('li')].reverse()

console.log(list);

const ul = document.querySelector('ul')

ul.innerHTML = ''

list.forEach(i => {
  const li = document.createElement('li')
  li.textContent = i.textContent
  ul.appendChild(li)
})
