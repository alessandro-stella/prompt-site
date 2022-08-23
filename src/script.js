import outputData from "./outputData.js";

const input = document.getElementById("input");
const output = document.getElementById("output");
const caret = document.getElementById("caret");
const bannerRows = Array.from(
    document.getElementById("banner").getElementsByClassName("row")
);

window.onload = () => {
    const background = localStorage.getItem("background");
    const text = localStorage.getItem("text");

    if (background && text) {
        document.body.style = `--background: var(${background}); --text: var(${text})`;
        return;
    }

    saveInStorage("--black", "--white");
};

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

    caretIndex = command.length;
    caret.style = `--chars: ${caretIndex}`;
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

input.addEventListener("keydown", (e) => {
    const validKeys = ["ArrowLeft", "ArrowRight", "Enter"];

    if (!validKeys.includes(e.key)) return;

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
    const errorMessage = `"${command}" is not recognized as an internal
    or external command operable program or batch file`;

    if (!outputData[command.split(" ")[0]]) {
        newDiv.innerHTML += errorMessage;
    } else {
        if (command === "cls") {
            output.innerHTML = "";
        } else {
            switch (command.split(" ")[0]) {
                case "help":
                    if (command === "help") {
                        const table = createTable(outputData[command]);

                        newDiv.appendChild(table);
                    } else newDiv.innerHTML += errorMessage;
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

                case "color":
                    const colorData = outputData["color"];

                    if (command === "color") {
                        let message = document.createElement("div");
                        message.innerHTML = `
                        You can change the colors of the prompt by using "color XY", where
                        <br>
                        X = background color and Y = text color
                        <br><br>
                        All available colors:
                        `;

                        newDiv.appendChild(message);
                        const table = createTable(colorData, true);

                        newDiv.appendChild(table);
                    } else {
                        if (command.length !== 8) {
                            newDiv.innerHTML += errorMessage;
                            break;
                        }

                        const colors = {
                            0: "--black",
                            1: "--dark-blue",
                            2: "--green",
                            3: "--aqua",
                            4: "--bordeaux",
                            5: "--purple",
                            6: "--olive",
                            7: "--light-grey",
                            8: "--grey",
                            9: "--blue",
                            a: "--lime",
                            b: "--light-blue",
                            c: "--red",
                            d: "--magenta",
                            e: "--yellow",
                            f: "--white",
                        };

                        const background = colors[command.charAt(6)];
                        const text = colors[command.charAt(7)];

                        if (background === text) {
                            newDiv.innerHTML +=
                                "Warning: the two colors must differ!";
                            break;
                        }

                        document.body.style = `--background: var(${background}); --text: var(${text})`;
                        let message = document.createElement("div");
                        message.innerHTML = `
                        Colors changed successfully
                        <br>
                        Background: ${colorData.get(
                            command.charAt(6)
                        )} | Text: ${colorData.get(command.charAt(7))}`;

                        saveInStorage(background, text);

                        newDiv.appendChild(message);
                    }

                    break;

                default:
                    break;
            }
        }
    }

    if (command !== "cls") output.appendChild(newDiv);

    command = "";
    caretIndex = 0;
    caret.style = `--chars:${caretIndex}`;
    input.value = "";
}

function createTable(data, isObject) {
    let table = document.createElement("div");
    table.classList.add("table");

    let row;

    if (isObject) {
        let index = 0;

        for (const [key, value] of data) {
            let cell = document.createElement("div");
            cell.classList.add("table-cell");

            if (index % 2 === 0) {
                row = document.createElement("div");
                row.classList.add("table-row");
                cell.classList.add("pr-[1ch]");
                cell.innerHTML = `${key} - ${value}`;
            } else {
                cell.innerHTML = `| ${key} - ${value}`;
            }

            row.appendChild(cell);

            if (index % 2 === 1) {
                table.appendChild(row);
                row = undefined;
            }

            index++;
        }

        return table;
    }

    data.forEach((singleCommand, index) => {
        let cell = document.createElement("div");
        cell.classList.add("table-cell");

        if (index % 2 === 0) {
            row = document.createElement("div");
            row.classList.add("table-row");
            cell.classList.add("pr-[1ch]");
            cell.innerHTML = singleCommand;
        } else {
            cell.innerHTML = `| ${singleCommand}`;
        }

        row.appendChild(cell);

        if (index % 2 === 1) {
            table.appendChild(row);
            row = undefined;
        }
    });

    return table;
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

function saveInStorage(background, text) {
    localStorage.removeItem("background");
    localStorage.removeItem("text");

    localStorage.setItem("background", background);
    localStorage.setItem("text", text);
}
