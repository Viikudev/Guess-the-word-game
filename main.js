const scrambledWord = document.querySelector(".random-word");
const wordContainer = document.getElementById("word");
const randomButton = document.querySelector(".random");
const resetButton = document.querySelector(".reset");
const triesText = document.querySelector(".tries-text");
const mistakes = document.querySelector(".letters-tried");
const dots = document.querySelectorAll(".dot");
const dotsArray = Array.from(dots);

const words = ["raton", "silla", "fruta", "azul", "gato", "flor", "medico"];

let i = 0;
let tries = 0;
let wordSorted = "";
let word = words[Math.floor(Math.random() * words.length)];

const shuffle = (word) => {
    let wordArray = word.split("");
    let wordArraySorted = wordArray.sort(() => Math.random() - 0.5);
    let wordSorted = wordArraySorted.join("");
    if (wordSorted === word) {
        wordArraySorted = wordArray.sort(() => Math.random() - 0.5);
        wordSorted = wordArraySorted.join("");
    }
    return wordSorted;
};

const letterList = (word) => {
    while (wordContainer.children[1]) {
        wordContainer.children[1].remove();
    }
    for (let i = 0; i <= word.length - 2; i++) {
        let newLetter = document.createElement("input");
        newLetter.classList.add("letter");
        newLetter.setAttribute("type", "text");
        newLetter.setAttribute("disabled", "");
        newLetter.setAttribute("size", "1");
        newLetter.setAttribute("maxlength", "1");
        wordContainer.appendChild(newLetter);
    }
};

letterList(word);
const letterListElement = wordContainer.querySelectorAll(".letter");
const letterArray = Array.from(letterListElement);

scrambledWord.innerHTML = shuffle(word);

randomButton.addEventListener("click", () => {
    word = words[Math.floor(Math.random() * words.length)];
    scrambledWord.innerHTML = shuffle(word);
    letterList(word);
    const firstLetter = document.getElementById("first").focus();
});

resetButton.addEventListener("click", () => {
    tries = 0;
    mistakes.innerHTML = "";
    dots.forEach((dot) => {
        dot.classList.remove("tried");
    });
    letterListElement.forEach((letter) => {
        letter.setAttribute("disabled", "");
        letter.value = "";
    });
    letterArray[0].removeAttribute("disabled");
    letterArray[0].focus();
    return tries;
});

addEventListener("keyup", () => {
    if (letterArray[i].value.length === 1 && letterArray[i].value === word[i]) {
        letterArray[i].setAttribute("disabled", "");
        letterArray[i + 1].removeAttribute("disabled");
        letterArray[i + 1].focus();
        return i++;
    } else if (letterArray[i].value !== word[i]) {
        dotsArray[tries].classList.add("tried");
        tries++;
        triesText.innerText = `Tries(${tries}/5): `;
        mistakes.innerHTML += letterArray[i].value + ",";
        letterArray[i].value = "";
        return tries;
    }
});
