const scrambledWord = document.querySelector(".random-word");
const wordContainer = document.getElementById("word");
const randomButton = document.querySelector(".random");

const words = ["flower", "table", "yellow", "common", "river", "fruit", "blue"];

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
        wordContainer.appendChild(newLetter);
    }
};

const autoTab = () => {};

letterList(word);

scrambledWord.innerHTML = shuffle(word);

randomButton.addEventListener("click", () => {
    word = words[Math.floor(Math.random() * words.length)];
    scrambledWord.innerHTML = shuffle(word);
    letterList(word);
    const firstLetter = document.getElementById("first").focus();
});
