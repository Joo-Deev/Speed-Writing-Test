let words = [
    "Programming",
    "Faith",
    "Games",
    "Hacker",
    "Messi",
    "Ronaldo",
    "Maradona",
    "Ball",
    "Kilo",
    "Pepsi",
    "Salah",
    "Phone",
    "Mouse",
    "HandBall",
    "Bow",
    "Minecraft",
    "Cod",
    "Miner",
    "Failed",
    "School",
    "Primary",
    "King",
    "blood",
    "HTML",
    "CSS",
    "Luke",
    "Channel"
]

let Hwords = [
    "My Baby is Stupid",
    "The World is Beautiful",
    "Barcelona Beat RealMadrid",
    "Hello World :)",
    "Lionel Andres Messi",
    "Micheal Jackson",
    "Like Father Like Son"
]

let TheWord = document.querySelector(".word")
let start = document.querySelector(".Start")
let test = document.querySelector("input")
let random = '';
let time = document.querySelector(".time")
let select = document.querySelector("select")
let upWords = document.querySelector(".upcoming-words")
let leftWords = document.querySelector(".words-left")
let score = document.querySelector(".score")
let result = document.querySelector(".result")
let div  = '';


function PageRefresh() {
    let recount = 2;
    let lose = document.createElement("div")
    lose.textContent = `Shame , You Failed `
    result.appendChild(lose)
    result.style.color = 'Red'
    let counter = setInterval(() => {
        recount--;
        if (recount === 0) {
            window.location.reload()
        }
    }, 1000);
}

function genWord() {
    random = words[Math.floor(Math.random() * words.length)]
    TheWord.textContent = random
    upWords.innerHTML = '';
    for(i = 0; i < words.length; i++) {
        div = document.createElement("div")
        div.classList.add("left")
        div.innerHTML = words[i]
        upWords.appendChild(div)
    }
}

function genHardWord() {
    random = Hwords[Math.floor(Math.random() * Hwords.length)]
    TheWord.textContent = random
    upWords.innerHTML = '';
    for(i = 0; i < Hwords.length; i++) {
        div = document.createElement("div")
        div.classList.add("left")
        div.innerHTML = Hwords[i]
        upWords.appendChild(div)
    }
}

function StartGame() {
    window.localStorage.setItem("Difficult" , select.value)
    start.remove()
    test.removeAttribute("disabled")
    test.style.cursor = 'text'
    test.focus()
    if (select.value === 'Easy') {
        genWord()
        leftWords.innerHTML = words.length
        time.innerHTML = '5'
        let countOne = setInterval(() => {
            time.textContent--;
            if (time.textContent === '0' && test.value.toLowerCase() !== random.toLowerCase()) {
                test.value = '';
                test.blur()
                clearInterval(countOne)
                PageRefresh()
            }
            if (time.textContent >= '0' && test.value.toLowerCase() === random.toLowerCase()) {
                test.value = '';
                let indWord = words.indexOf(random)
                words.splice(indWord, 1)
                leftWords.innerHTML = words.length
                time.textContent = '5';
                genWord()
                score.innerHTML++;
                if (words.length === 0) {
                    let win = document.createElement("div")
                    win.textContent = `Ahhh , Iam Not Happy Of That , You Won But On Easy Mode!!! Your Score is ${score.innerHTML} `
                    result.appendChild(win)
                    result.style.color = '#57ff57'
                    time.textContent = '0';
                    clearInterval(countOne)
                }
            }
        }, 1000);
    }
    if (select.value === 'Normal') {
        genWord()
        leftWords.innerHTML = words.length
        time.innerHTML = '3'
        let countOne = setInterval(() => {
            time.textContent--;
            if (time.textContent === '0' && test.value.toLowerCase() !== random.toLowerCase()) {
                test.value = '';
                test.blur()
                clearInterval(countOne)
                PageRefresh()
            }
            if (time.textContent >= '0' && test.value.toLowerCase() === random.toLowerCase()) {
                test.value = '';
                let indWord = words.indexOf(random)
                words.splice(indWord, 1)
                leftWords.innerHTML = words.length
                time.textContent = '3';
                score.innerHTML++;
                genWord()
                if (words.length === 0) {
                    let win = document.createElement("div")
                    win.textContent = `Congratulations , Your Score is ${score.innerHTML} `
                    result.appendChild(win)
                    result.style.color = '#57ff57'
                    time.textContent = '0';
                    clearInterval(countOne)
                }
            }
        }, 1000);
    }
    if (select.value === 'Hard') {
        leftWords.innerHTML = Hwords.length
        genHardWord()
        time.innerHTML = '6'
        let countOne = setInterval(() => {
            time.textContent--;
            if (time.textContent === '0' && test.value.toLowerCase() !== random.toLowerCase()) {
                test.value = '';
                test.blur()
                clearInterval(countOne)
                PageRefresh()
            }
            if (time.textContent >= '0' && test.value.toLowerCase() === random.toLowerCase()) {
                test.value = '';
                let indWord = Hwords.indexOf(random)
                Hwords.splice(indWord, 1)
                leftWords.innerHTML = Hwords.length
                time.textContent = '6';
                score.innerHTML++;
                genHardWord()
                if (Hwords.length === 0) {
                    let win = document.createElement("div")
                    win.textContent = `You Are Amazing , Your Score is ${score.innerHTML} `
                    result.appendChild(win)
                    result.style.color = '#57ff57'
                    time.textContent = '0';
                    clearInterval(countOne)
                }
            }
        }, 1000);
    }
}

start.onclick = StartGame

test.onpaste = function () {
    return '';
}

if (window.localStorage.getItem("Difficult")) {
    select.value = window.localStorage.getItem("Difficult")
}
