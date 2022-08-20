import outputData from "./outputData.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const decoy = document.getElementById("decoy");

let command = "";

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

decoy.focus();

window.addEventListener("keydown", (e) => {
    if (e.key.length !== 1) {
        switch (e.key) {
            case "Enter":
                executeCommand(command.trim());
                command = "";
                updateInput(command);
                break;

            case "Backspace":
                command = command.slice(0, -1);
                updateInput(command);
                break;

            default:
                break;
        }

        return;
    }

    if (possibleChars.includes(e.key)) {
        command += e.key;
        updateInput(command);
    }
});

function updateInput(command) {
    input.innerHTML = "Command: " + command;
}

function executeCommand(currentCommand) {
    if (!outputData[currentCommand]) {
        output.innerHTML = outputData["outputErrorMessage"];
        return;
    }

    output.innerHTML = outputData[currentCommand];
}
