const wordContainer = document.getElementById('word')
const gameContainer = document.querySelector('.main-container')
const startContainer = document.querySelector('.start-container')
const randomButton = document.querySelector('.random')
const resetButton = document.querySelector('.reset')
const triesText = document.querySelector('.tries-text')
const mistakes = document.querySelector('.letters-tried')
const dots = document.querySelectorAll('.dot')
const dotsArray = Array.from(dots)
const startButton = document.querySelector('.start')
const continueButton = document.querySelector('.continue')
let scrambledWord = document.querySelector('.random-word')

async function fetchWord() {
  let word = ''
  do {
    let response = await fetch(
      'https://clientes.api.greenborn.com.ar/public-random-word',
      {
        method: 'GET',
      },
    )
    word = await response.json()
    word = word[0]
  } while (word.length >= 8)
  word = word.normalize('NFD').replace(/[\u0300-\u036f]/g, '')
  return word
}

function shuffle(word) {
  let wordArray = word.split('')
  let wordArraySorted = wordArray.sort(() => Math.random() - 0.5)
  let wordSorted = wordArraySorted.join('')
  if (wordSorted === word) {
    wordArraySorted = wordArray.sort(() => Math.random() - 0.5)
    wordSorted = wordArraySorted.join('')
  }
  return wordSorted
}

async function letterList(word) {
  while (wordContainer.children[1]) {
    wordContainer.children[1].remove()
  }
  for (let i = 0; i <= word.length - 2; i++) {
    let newLetter = document.createElement('input')
    newLetter.classList.add('letter')
    newLetter.setAttribute('position', [i + 2])
    newLetter.setAttribute('type', 'text')
    newLetter.setAttribute('disabled', '')
    newLetter.setAttribute('size', '1')
    newLetter.setAttribute('maxlength', '1')
    wordContainer.appendChild(newLetter)
  }
}

;(async () => {
  let i = 0
  let tries = 0

  let word = await fetchWord()
  const wordSorted = shuffle(word)
  scrambledWord.firstElementChild.innerHTML = wordSorted
  letterList(word)

  let winLoseContainer = document.getElementById('winlose-container')
  let letterListElement = wordContainer.querySelectorAll('.letter')
  let letterArray = Array.from(letterListElement)

  async function getRandomWord() {
    letterListElement = wordContainer.querySelectorAll('.letter')
    letterArray = Array.from(letterListElement)
    word = await fetchWord()
    scrambledWord.firstElementChild.innerHTML = shuffle(word)
    letterList(word)
    document.getElementById('first').focus()
    letterListElement = wordContainer.querySelectorAll('.letter')
    letterArray = Array.from(letterListElement)
    tries = 0
    i = 0
    mistakes.innerHTML = ''
    dots.forEach((dot) => {
      dot.classList.remove('tried')
    })
    letterListElement.forEach((letter) => {
      letter.setAttribute('disabled', '')
      letter.value = ''
    })
    letterArray[0].removeAttribute('disabled')
    letterArray[0].focus()
    triesText.innerText = 'Tries(0/5): '
  }

  randomButton.addEventListener('click', async () => {
    tries = 0
    i = 0
    await getRandomWord()
  })

  continueButton.addEventListener('click', async () => {
    tries = 0
    i = 0
    winLoseContainer.style.display = 'none'
    await getRandomWord()
  })

  resetButton.addEventListener('click', () => {
    tries = 0
    i = 0
    mistakes.innerHTML = ''
    dots.forEach((dot) => {
      dot.classList.remove('tried')
    })
    letterListElement.forEach((letter) => {
      letter.setAttribute('disabled', '')
      letter.value = ''
    })
    letterArray[0].removeAttribute('disabled')
    letterArray[0].focus()
    triesText.innerText = 'Tries(0/5): '
    return tries, i
  })

  addEventListener('keyup', () => {
    console.log(word)
    if (letterArray[i].value.length === 1 && letterArray[i].value === word[i]) {
      if (letterArray[i].getAttribute('position') == word.length) {
        winLoseContainer.firstElementChild.innerHTML = 'YOU WIN!!!'
        winLoseContainer.style.display = 'flex'
        return
      }
      letterArray[i].setAttribute('disabled', '')
      letterArray[i + 1].removeAttribute('disabled')
      letterArray[i + 1].focus()
      return i++
    } else if (letterArray[i].value !== word[i]) {
      dotsArray[tries].classList.add('tried')
      tries++
      if (tries === 5) {
        winLoseContainer.firstElementChild.innerHTML = 'YOU LOSE...'
        winLoseContainer.style.display = 'flex'
        return
      }
      triesText.innerText = `Tries(${tries}/5): `
      mistakes.innerHTML += letterArray[i].value + ','
      letterArray[i].value = ''
      return tries
    }
  })
})()

startButton.addEventListener('click', () => {
  startContainer.style.display = 'none'
  gameContainer.style.display = 'grid'
})
