class Timer {
    startTime: number;
    endTime: number;
    total: number;

    start_count() {
        this.startTime = new Date().getTime();
    }

    end_count() {
        this.endTime = new Date().getTime()
        this.total = this.total +  this.endTime - this.startTime;
    }

    result() {
        return this.total/1000;
    }

    constructor() {
        this.total = 0;
    }
}

class Pair {
    first: number;
    second: number;

    constructor() {
        this.first = 0;
        this.second = 0;
    }
}

class Result {
    length: number;
    stats: number[];
    total: number;

    constructor(length: number) {
        this.length = length;
        this.stats = new Array<number>(length);
    }
}

function displayTime() {
    intervalFun = setInterval(() => {
        actTime += 0.1;
        timerParagraph.innerHTML = (actTime.toFixed(1)).toString();
    }, 100);
}

function min(a: number, b: number) {
    if (a < b) {
        return a;
    }
    return b;
}

let quizJson: string = `{
    "wstep" : "Quiz matematyczny, bardzo trudny",
    "zadania" : ["2+2", "2+3", "1+7", "100+100"],
    "odpowiedzi" : [4, 5, 8, 200],
    "kary" : [5, 4, 3, 15]
}`;

class Quiz {
    wstep: string;
    zadania: string[];
    odpowiedzi: number[];
    kary: number[];
}

let quiz: Quiz = JSON.parse(quizJson);
let quizLength: number = quiz.zadania.length;
let actPos: number = 0;
let nextPos: number = 0;
let anwsers: (number|null)[] = new Array(quizLength);
let timer: Timer[] = new Array<Timer>(quizLength);
let givenAnwsers: number = 0;
let actTime: number = 0;
let intervalFun;
let totalResult: number = 0;

let startButton: HTMLElement = document.getElementById("startButton");

let start: HTMLButtonElement = document.querySelector("button[id=start]");

let quizDiv: HTMLElement = document.querySelector("div[id=quiz]");

let anwserInput: HTMLInputElement = document.querySelector("input[id=anwser]");

let stopButton: HTMLButtonElement = document.querySelector("button[id=end]");

let previousButton: HTMLButtonElement = document.querySelector("button[id=previous]");

let nextButton: HTMLButtonElement = document.querySelector("button[id=next]");

let cancelButton: HTMLButtonElement = document.querySelector("button[id=cancel]");

let entryParagrapgh: HTMLParagraphElement = document.querySelector("p[id=entry]");

let taskParagrapgh: HTMLParagraphElement = document.querySelector("p[id=task]");

let resultsDiv: HTMLElement = document.getElementById("results");

let results: HTMLParagraphElement = document.querySelector("p[id=results_par");

let returnButton: HTMLButtonElement = document.querySelector("button[id=return]");

let mistakesParagraph: HTMLParagraphElement = document.querySelector("p[id=mistakes]");

let penaltiesParagraph: HTMLParagraphElement = document.querySelector("p[id=penalties]");

let timerParagraph: HTMLParagraphElement = document.querySelector("p[id=timer_par]");

let saveWithStats: HTMLButtonElement = document.querySelector("button[id=saveWithStats]");

let saveNoStats: HTMLButtonElement = document.querySelector("button[id=saveNoStats]");

let statsParagraph: HTMLParagraphElement = document.querySelector("p[id=stats]");

let taskHeader: HTMLElement = document.querySelector("h2[id=task_header]");


function reset() {
    actPos = 0;
    givenAnwsers = 0;
    actTime = 0;
    let i: number = 0;
    while (i < quizLength) {
        timer[i] = new Timer();
        anwsers[i] = null;
        i++;
    }
    previousButton.style.visibility = "hidden";
    if (quizLength === 1) {
        nextButton.style.visibility = "hidden";
    } else {
        nextButton.style.visibility = "visible";
    }
    anwserInput.value = "";

    entryParagrapgh.innerHTML = quiz.wstep;
    taskParagrapgh.innerHTML = quiz.zadania[0];
    taskHeader.innerHTML = "Zadanie 1 z " + quizLength.toString();
    clearInterval(intervalFun);
}

start.addEventListener("click", () => {
    quizDiv.style.display = "inline";
    startButton.style.display = "none";
    reset();
    displayTime();
    timer[0].start_count();
})

function checkFields() {
    if (anwsers[actPos] != null && anwserInput.value === "") {
        givenAnwsers--;
    } else if (anwsers[actPos] == null && anwserInput.value !== "") {
        givenAnwsers++;
    }

    if (anwserInput.value === "") {
        anwsers[actPos] = null;
    } else {
        anwsers[actPos] = +anwserInput.value;
    }

    if (nextPos === 0) {
        previousButton.style.visibility = "hidden";
    } else {
        previousButton.style.visibility = "visible";
    }

    if (nextPos === quizLength - 1) {
        nextButton.style.visibility = "hidden";
    } else {
        nextButton.style.visibility = "visible";
    }
    if (anwsers[nextPos] != null) {
        anwserInput.value = anwsers[nextPos].toString();
    } else {
        anwserInput.value = "";
    }

    taskParagrapgh.innerHTML = quiz.zadania[nextPos];
    taskHeader.innerHTML = "Zadanie " + (nextPos+1).toString() + " z " + quizLength.toString();
    actPos = nextPos;
}

nextButton.addEventListener("click", () => {
    nextPos = actPos + 1;
    timer[actPos].end_count();
    timer[nextPos].start_count();
    checkFields();
})

previousButton.addEventListener("click", () => {
    nextPos = actPos - 1;
    timer[actPos].end_count();
    timer[nextPos].start_count();
    checkFields();
})

cancelButton.addEventListener("click", () => {
    quizDiv.style.display = "none";
    startButton.style.display = "flex";
    reset();
})

function proceedResults() {
    let result: number = 0;
    let i: number = 0;
    while (i < quizLength) {
        if (anwsers[i] !== quiz.odpowiedzi[i]) {
            result += quiz.kary[i];
        }
        i++;
    }
    return result
}

function wrongAnwsers() {
    let mistakes: string = "";
    let i: number = 0;
    while (i < quizLength) {
        if (anwsers[i] !== quiz.odpowiedzi[i]) {
            mistakes += (i+1).toString() + " ";
        }
        i++;
    }
    if (mistakes === "") {
        mistakes = "Wszystko dobrze :)"
    }
    return mistakes;
}

function countTime() {
    let i: number = 0;
    let total: number = 0;
    while (i < quizLength) {
        total = total + timer[i].result();
        i++;
    }
    return total;
}

function bestResults() {
    const storLen: number = localStorage.length;
    const resultsArr: number[] = new Array<number>(storLen);
    for (let i = 0; i < localStorage.length; i++){
        const key = localStorage.key(i);
        const value: Result = JSON.parse(localStorage.getItem(key));
        resultsArr[i] = value.total;
    }
    const sortedResults: number[] = resultsArr.sort((n1,n2) => n1 - n2);
    let bestResultsStr: string = "";
    for (let i = 0; i < min(3, sortedResults.length); i++) {
        bestResultsStr += sortedResults[i].toString();
        bestResultsStr += "<br>";
    }
    if (bestResultsStr === "") {
        bestResultsStr += "Zagraj, aby zobaczyć wyniki"
    }
    return bestResultsStr;
}

stopButton.addEventListener("click", () => {
    nextPos = actPos;
    checkFields();
    if (givenAnwsers === quizLength) {
        timer[actPos].end_count();
        const result: number = proceedResults();
        totalResult = result + countTime();
        resultsDiv.style.display = "inline";
        results.innerHTML = totalResult.toString();

        const mistakes: string = wrongAnwsers();
        mistakesParagraph.innerHTML = mistakes;
        penaltiesParagraph.innerHTML = result.toString();
        statsParagraph.innerHTML = bestResults();
        quizDiv.style.display = "none";
    }
})

function returnAction() {
    resultsDiv.style.display = "none";
    quizDiv.style.display = "none";
    startButton.style.display = "flex";
    reset();
}

returnButton.addEventListener("click", () => {
    returnAction();
})

function createStats() {
    const stats = new Result(quizLength);
    stats.total = totalResult;
    let i: number = 0;
    while (i < quizLength) {
        stats.stats[i] = timer[i].result();
        i++;
    }
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(stats));
}

function createSoloResult() {
    const stats = new Result(0);
    stats.total = totalResult;
    localStorage.setItem(localStorage.length.toString(), JSON.stringify(stats));
}

saveWithStats.addEventListener("click", () => {
    createStats();
    returnAction();
})

saveNoStats.addEventListener("click", () => {
    createSoloResult();
    returnAction();
})

