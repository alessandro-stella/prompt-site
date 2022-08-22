import outputData from "./outputData.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const caret = document.getElementById("caret");
const bannerRows = Array.from(
    document.getElementById("banner").getElementsByClassName("row")
);

let command = "";
let caretIndex = 0;

const possibleChars = [
    "a",
    "b",
    "c",
    "d",
    "e",
    "f",
    "g",
    "h",
    "i",
    "j",
    "k",
    "l",
    "m",
    "n",
    "o",
    "p",
    "q",
    "r",
    "s",
    "t",
    "u",
    "v",
    "w",
    "x",
    "y",
    "z",
    "A",
    "B",
    "C",
    "D",
    "E",
    "F",
    "G",
    "H",
    "I",
    "J",
    "K",
    "L",
    "M",
    "N",
    "O",
    "P",
    "Q",
    "R",
    "S",
    "T",
    "U",
    "V",
    "W",
    "X",
    "Y",
    "Z",
    " ",
    0,
    1,
    2,
    3,
    4,
    5,
    6,
    7,
    8,
    9,
];

let i = 0;

let timer = window.setInterval(() => {
    bannerRows[i].classList.remove("hidden");

    if (++i >= bannerRows.length) {
        window.clearInterval(timer);
    }
}, 100);

input.addEventListener("focus", () => {
    caret.classList.add("blink");
});

input.addEventListener("blur", () => {
    caret.classList.remove("blink");
});

input.addEventListener("input", (e) => {
    if (e.inputType === "deleteContentBackward") {
        if (command.length !== 0) {
            command = command.slice(0, -1);
            moveCaret("backward");
        }

        return;
    }

    if (possibleChars.includes(e.data)) {
        command += e.data;
        moveCaret("forward");
    } else {
        input.value = input.value.slice(0, -1);
    }
});

window.addEventListener("keydown", (e) => {
    if (e.key !== "Enter") return;

    executeCommand();
});

function executeCommand() {
    if (!outputData[command]) {
        output.innerHTML = outputData["outputErrorMessage"];
    } else {
        output.innerHTML = outputData[command];
    }

    command = "";
    caretIndex = 0;
    caret.style = `--chars:${caretIndex}`;
    input.value = "";
}

function moveCaret(move) {
    if (move === "forward") {
        caretIndex++;
    } else {
        caretIndex--;
    }

    caret.style = `--chars:${caretIndex}`;
}
