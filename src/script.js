import outputData from "./outputData.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const caret = document.getElementById("caret");
const bannerRows = Array.from(
    document.getElementById("banner").getElementsByClassName("row")
);

let command = "";
let caretIndex = 0;

let i = 0;

let timer = window.setInterval(() => {
    bannerRows[i].classList.remove("hidden");

    if (++i >= bannerRows.length) {
        window.clearInterval(timer);
    }
}, 100);

input.addEventListener("click", () => {
    caret.classList.add("blink");

    const end = input.value.length;
    input.setSelectionRange(end, end);
    input.focus();
});

input.addEventListener("blur", () => {
    caret.classList.remove("blink");
});

input.addEventListener("input", (e) => {
    if (e.inputType === "deleteContentBackward") {
        if (command.length !== 0) {
            moveCaret("backward");
        }
    } else {
        moveCaret("forward");
    }

    command = input.value;
});

window.addEventListener("keydown", (e) => {
    if (e.repeat) {
        return;
    }

    console.log(e.repeat);

    const validKeys = ["ArrowLeft", "ArrowRight", "Enter"];

    if (!validKeys.includes(e.key)) {
        if (e.key === "Alt" || e.key === "Control") e.preventDefault();

        return;
    }

    switch (e.key) {
        case "ArrowLeft":
            moveCaret("backward", true);
            caret.classList.remove("blink");
            break;

        case "ArrowRight":
            moveCaret("forward", true);
            break;

        case "Enter":
            if (command.length !== 0) executeCommand();
            break;

        default:
            break;
    }
});

function executeCommand() {
    const newDiv = document.createElement("div");
    newDiv.classList = "";

    newDiv.innerHTML = `C:\\visitor> ${command}<br>`;

    if (!outputData[command]) {
        newDiv.innerHTML += `"${command}" is not recognized as an internal
        or external command operable program or batch file`;
    } else {
        switch (command) {
            case "help":
                newDiv.innerHTML += `${outputData[command]}`;
                break;

            case "about":
                newDiv.innerHTML += `${outputData[command]}`;
                break;

            case "social":
                newDiv.innerHTML += `${outputData[command]}`;
                break;

            case "contactMe":
                newDiv.innerHTML += `${outputData[command]}`;
                break;

            case "cls":
                output.innerHTML = "";
                break;

            default:
                break;
        }
    }

    if (command !== "cls") output.appendChild(newDiv);

    command = "";
    caretIndex = 0;
    caret.style = `--chars:${caretIndex}`;
    input.value = "";
}

function moveCaret(move, arrow) {
    if (move === "forward") {
        caretIndex++;
    } else {
        caretIndex--;
    }

    if (arrow) {
        if (caretIndex >= command.length) {
            caret.classList.add("blink");
            caretIndex = command.length;
        }

        if (caretIndex < 0) {
            caretIndex = 0;
        }
    }

    caret.style = `--chars: ${caretIndex}`;
}
