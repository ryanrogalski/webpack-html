// javascript you add here will be imported to index.js and bundled by webpack
const wrap = document.createElement('div')
wrap.classList.add('wrapper')

const el = document.createElement('div')
el.classList.add('welcome')
el.innerText = 'Welcome!'

wrap.append(el)

document.body.append(wrap)
