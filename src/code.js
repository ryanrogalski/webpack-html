const btns = [...document.querySelectorAll('.btn')]

btns.forEach(btn => {
  btn.addEventListener('click', (e) => {
    alert(e.target.textContent)
  })
})

fetch('https://app.close.io/hackwithus/', {
  method: 'POST',
  mode: 'no-cors',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    first_name: 'Ryan',
    last_name: 'Rogalski',
    email: 'ryan@infiniteloopco.com',
    phone: '518.810.5365',
    cover_letter: 'Hi,\nI’m Ryan, a product focused front end engineer who specializes in building modern web applications with React, ES6, and Sass. For the last 4 years I’ve been consulting with clients around the world through my creative studio Infinite Loop\nCheck out my work on my portfolio at www.infiniteloopco.com (which I recently rebuilt in React), browse my experiments on Codepen (www.codepen.io/ryanrogalski), or read my ramblings on Twitter (www.twitter.com/ryanrogalski).\nI have two personal projects I think you’ll enjoy checking out. One is Gifstudio, which lets you use your laptop camera to create and share experimental animated GIFs. Built with React and WebGL video processing.\nwww.gifstudio.me\nThe other is Gifgasm, a psychedelic search engine for Tumblr gifs.\nwww.gifgasm.me/@ryanrogalski\nThanks for considering me for the job, if you’d like to talk more feel free to get in touch.\nHappy Holidays,\nRyan',
    urls: [
      'www.infiniteloopco.com',
      'www.ryanrogalski.com',
      'www.gifgasm.me',
      'www.gifstudio.me'
    ],
  })
})
