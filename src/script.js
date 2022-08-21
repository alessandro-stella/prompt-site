import outputData from "./outputData.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const caret = document.getElementById("caret");

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

input.addEventListener("focus", () => {
    caret.classList.add("blink");
});

input.addEventListener("blur", () => {
    caret.classList.remove("blink");
});

input.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) {
        switch (e.key) {
            case "Enter":
                executeCommand(command.trim());
                break;

            case "Backspace":
                if (command.length === 0) break;

                command = command.slice(0, -1);
                moveCaret("backward");
                break;

            default:
                break;
        }

        return;
    }

    if (possibleChars.includes(e.key)) {
        command += e.key;
        moveCaret("forward");
    } else {
        console.log({ before: input.value });

        input.value = input.value.slice(0, -1);

        console.log({ after: input.value });
    }
});

function executeCommand(currentCommand) {
    if (!outputData[currentCommand]) {
        output.innerHTML = outputData["outputErrorMessage"];
    } else {
        output.innerHTML = outputData[currentCommand];
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
