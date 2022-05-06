import codes from "./codes.js";

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const doubles = "\\!@#$%&/()=?*QWERTYUIOP{}>ASDFGHJKL:\"ZXCVBNM~;.".split(""); // 46
const doubladdit = "Ё1234567890'+ЙЦУКЕНГШЩЗХЪ<ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,".split(""); // 46

const fs = [
    "esc",
    "f1",
    "f2",
    "f3",
    "f4",
    "f5",
    "f6",
    "f7",
    "f8",
    "f9",
    "f10",
    "f11",
    "f12",
    "ins",
    "canc",
];

let actualLanguage = "en"; // localStorage!!!!!!!!!

class But {
    addition = "";

    code = "";

    /*  sizeClasses = [
        "size_win",
        "size_shift",
        "size_ctrl_l",
        "size_ctrl_s",
        "size_alt",
        "size_space",
        "size_capsenter",
        "size_tabdel",
        "size_small",
    ]; */

    constructor(text, size, addition = "") {
        this.text = text;
        this.size = size;
        this.addition = addition;
        this.code = codes.filter((x) => {
            if (x.text === this.text || x.shText === this.text) {
                return x.code;
            }
            return "";
        })[0];
    }

    createButton() {
        const b = document.createElement("div");

        if (this.addition.length > 0) {
            const s1 = document.createElement("span");
            const s2 = document.createElement("span");
            s1.innerText = this.text;
            s2.innerText = this.addition;

            b.classList.add("double_button");
            b.append(s1);
            b.append(s2);
        } else {
            b.classList.add("button");
            if (this.text === "win") {
                const win = document.createElement("div");
                win.innerHTML = "<img class='win_img' src='icons/win_icon.svg' alt='win'>";
                b.append(win);
            } else {
                const s = document.createElement("span");
                s.innerText = this.text;
                b.append(s);
            }
        }
        b.dataset.code = this.code.code;

        b.classList.add(this.size);

        return b;
    }

    pressMe(el) {
        if (["Shift", "Ctrl", "Caps Lock", "Alt"].includes(this.text)) {
            if (!this.isPressed) {
                this.isPressed = true;
                el.classList.add("pressed");
            } else {
                this.isPressed = false;
                el.classList.remove("pressed");
            }
        }
    }
}

window.addEventListener("load", () => {
    readFromStorage();

    console.log(window.navigator);
    drawButtons();
});
let textarea;
let base;
let shiftIsPressed = false;
let capsIsPressed = false;
let ctrlIsPressed = false;
let altIsPressed = false;

let [shiftDown, altdown] = [false, false];

let word = "";
let textAreaHeight = "200px";

function checkLanguage() {
    return actualLanguage;
}

function checkShift() {
    return shiftIsPressed;
}

function checkCaps() {
    return capsIsPressed;
}

function writeMe(code) {
    textarea.addEventListener("blur", () => {
        textarea.focus();
    });
    if (code === "ShiftLeft" || code === "ShiftRight") {
        console.log(`INSIDE WRITEME: shift = ${shiftIsPressed}`);
        if (!checkShift()) {
            shiftIsPressed = true;
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_shift")) {
                    a.classList.add("pressed");
                }
            });
        } else {
            shiftIsPressed = false;
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_shift")) {
                    a.classList.remove("pressed");
                }
            });
        }
    } else if (code === "Control") {
        console.log(`control: ${code}`);
        if (!ctrlIsPressed) {
            [...base.children].forEach((a) => {
                if (
                    a.classList.contains("size_ctrl_l")
                    || a.classList.contains("size_ctrl_s")
                ) {
                    a.classList.add("pressed");
                }
            });
            ctrlIsPressed = true;
        } else {
            [...base.children].forEach((a) => {
                if (
                    a.classList.contains("size_ctrl_l")
                    || a.classList.contains("size_ctrl_s")
                ) {
                    a.classList.remove("pressed");
                }
            });
            ctrlIsPressed = false;
        }
    } else if (code === "AltLeft" || code === "AltRight") {
        console.log(`alt: ${code}`);
        if (!altIsPressed) {
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_alt")) {
                    a.classList.add("pressed");
                }
            });
            altIsPressed = true;
        } else {
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_alt")) {
                    a.classList.remove("pressed");
                }
            });
            altIsPressed = false;
        }
    } else if (code === "CapsLock") {
        const cl = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === "CapsLock",
        )[0];
        if (!checkCaps()) {
            capsIsPressed = true;

            if (capsIsPressed) cl.classList.add("pressed");
        } else {
            capsIsPressed = false;
            cl.classList.remove("pressed");
        }
    } else if (code === "Escape") {
        word = "";
        textarea.value = "";
    } else if (code === "Backspace" || code === "Delete") {
        console.log(code);
        word = deleteLetter(code);
        textarea.value = word;
    } else {
        word = insertLetter(code);
        textarea.value = word;
    }
}
function insertLetter(code) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];
    let result = word;
    const w = letterKey(code);
    if (start === end && end === word.length) {
        result += w;
    } else {
        textarea.setRangeText(`${w}`, start, end, "end");
        result = textarea.value;
    }
    textarea.focus();
    return result;
}
function deleteLetter(code) {
    const [start, end] = [textarea.selectionStart, textarea.selectionEnd];

    if (code === "Backspace") {
        if (start === 0) {
            textarea.setRangeText("", start, end, "end");
            textarea.focus();
            return textarea.value;
        }

        textarea.setRangeText("", start - 1, end, "end");
        textarea.focus();
        return textarea.value;
    }
    if (code === "Delete") {
        console.log(`start: ${start}, end: ${end}, word.length = ${word.length}`);
        textarea.setRangeText("", start, end + 1, "end");
        textarea.focus();
        return textarea.value;
    }
    return textarea.value;
}

function letterKey(code) {
    let w = "";
    const key = codes.filter((x) => {
        if (x.code === code) {
            return x;
        }
        return "";
    })[0];

    if (letters.includes(key.text)) {
        const lang = checkLanguage();
        if (lang === "en") {
            w = key.text;
        } else {
            w = key.shText;
        }
        w = upperLowerText(w);
    }
    if ("ХЪЖЭБЮ".includes(key.shText)) {
        if (checkLanguage() === "ru") {
            w = upperLowerText(key.shText);
        } else {
            w = key.text;
        }
    }
    if ("\\1234567890?*>.".includes(key.text)) {
        if ((checkShift() && !checkCaps()) || (!checkShift() && checkCaps())) {
            w = key.shText;
        } else w = key.text;
        if (key.text === "\\") {
            if (checkLanguage() === "en") {
                w = key.text;
            } else {
                w = upperLowerText(key.shText);
            }
        }
    }
    if (code === "Enter") {
        w = "\n";
    }
    if (code === "Tab") {
        w = "    ";
    }
    if (code === "ArrowLeft" || code === "ArrowRight" || code === "ArrowUp" || code === "ArrowDown") {
        w = key.text;
    }
    if (code === "MetaLeft") {
        w = "";
    } if (code === "Space") {
        w = " ";
    }

    return w;
}

function upperLowerText(w) {
    if ((checkShift() && !checkCaps()) || (!checkShift() && checkCaps())) {
        console.log(`upperLowerText: shift = ${checkShift()}, caps = ${checkCaps()}`);
        return w.toUpperCase();
    }
    console.log(`upperLowerText: shift = ${checkShift()}, caps = ${checkCaps()}`);
    return w.toLowerCase();
}

function explanation() {
    const block = document.createElement("div");
    block.classList.add("explanation_block");
    const explanationText = document.createElement("p");
    block.append(explanationText);
    if (actualLanguage === "ru") {
        explanationText.innerText = "Привет, друг!\n\nЭта клавиатура была создана для ОС Windows.\n\nКлавиши 'Shift', 'Alt' и 'Ctrl' на виртуальной клавиатуре после щелчка мышью остаются нажатыми до тех пор, пока не будут нажаты снова. Это сделано для большего удобства использования.\n\n Для переключения языка можно использовать кнопку под клавиатурой или комбинацию 'Shift+Alt' на физической клавиатуре.\n\n Клавиша 'esc' на виртуальной клавиатуре предназначена для очистки текстовой области.\n\n Спасибо!";
    } else {
        explanationText.innerText = "Hello friend!\n\n This keyboard was created for WindowsOS.\n\nKeys 'Shift', 'Alt' and 'Ctrl' on the virtual keyboard after being clicked with a mouse will remain pressed until not clicked again. It was made for more ease of use.\n\n You can use a button under the keyboard for switch language or combination 'Shift+Alt' on the fisical keyboard.\n\n Key 'esc' on the virtual keyboard is for clearing the text area.\n\n Thank you!";
    }
    return block;
}

function drawButtons() {
    document.body.innerHTML = "";
    base = document.createElement("div");
    textarea = document.createElement("textarea");
    if (textarea.style.height !== textAreaHeight) {
        textarea.style.height = textAreaHeight;
    }

    base.classList.add("base");

    textarea.classList.add("textarea");

    textarea.value = word;

    const langDiv = document.createElement("div");
    const langDivSpan = document.createElement("span");
    langDivSpan.innerText = actualLanguage;
    langDiv.classList.add("langdiv");
    langDiv.append(langDivSpan);
    langDiv.addEventListener("click", changeLanguage);

    base.append(textarea);
    base.append(langDiv);
    document.body.append(base);
    document.body.append(explanation());
    fs.forEach((x) => {
        const b = new But(x, "size_small");

        const a = b.createButton();
        base.append(a);
        a.addEventListener("click", () => {
            b.pressMe(a);
            if (b.text === "esc" || b.text === "canc") {
                console.log(b.text);
                writeMe(b.code.code);
            }
        });
    });

    doubles.forEach((x, index) => {
        const b = new But(x, "size_standart");
        b.addition = doubladdit[index];

        const a = b.createButton();
        if (letters.includes(x)) {
            if (actualLanguage === "ru") {
                a.classList.add("secondaryRU");
            } else {
                a.classList.add("secondaryEN");
            }
        }
        base.append(a);

        a.addEventListener("click", () => {
            b.pressMe(a);
            writeMe(b.code.code);
        });

        if (index === 12) {
            singleButton("Backspace", "size_tabdel", base);
            singleButton("Tab", "size_tabdel", base);
        }
        if (index === 25) {
            singleButton("Caps Lock", "size_capsenter", base);
        }
        if (index === 36) {
            singleButton("ENTER", "size_capsenter", base);
            singleButton("Shift", "size_shift", base);
        }
        if (index === 46) {
            singleButton("Shift", "size_shift", base);
            singleButton("Ctrl", "size_ctrl_l", base);
            singleButton("win", "size_win", base);
            singleButton("Alt", "size_alt", base);
            singleButton(" ", "size_space", base);
            singleButton("Alt", "size_alt", base);
            singleButton("Ctrl", "size_ctrl_s", base);
            base.append(arrowsDiv());
        }
    });
    select();
}

function singleButton(text, size, bas) {
    const f = new But(text, size);
    const fButton = f.createButton();
    fButton.addEventListener("click", () => {
        f.pressMe(fButton);
        writeMe(f.code.code);
    });
    if (text === "Shift" && shiftIsPressed) fButton.classList.add("pressed");
    if (text === "Caps Lock" && capsIsPressed) {
        fButton.classList.add("pressed");
    }
    if (text === "Ctrl" && ctrlIsPressed) fButton.classList.add("pressed");
    if (text === "Alt" && altIsPressed) fButton.classList.add("pressed");
    bas.append(fButton);
}
let wrapper;
function arrowsDiv() {
    wrapper = document.createElement("div");
    wrapper.classList.add("arrow_wrapper");
    const leftArrBut = new But("←", "size_small").createButton();

    const rightArrBut = new But("→", "size_small").createButton();

    const upArrBut = new But("↑", "size_small").createButton();

    const downArrBut = new But("↓", "size_small").createButton();

    [leftArrBut, rightArrBut, upArrBut, downArrBut].forEach((x) =>
        x.classList.add("button"));
    leftArrBut.classList.add("arrleftright");
    upArrBut.classList.add("arrup");

    downArrBut.classList.add("arrdown");
    rightArrBut.classList.add("arrleftright");
    [upArrBut, downArrBut].forEach((x) =>
        x.classList.add("arrupdown"));
    [leftArrBut, upArrBut, downArrBut, rightArrBut].forEach((x) =>
        x.addEventListener("click", function (event) {
            event.stopPropagation();
            writeMe(this.dataset.code);
        }));
    wrapper.append(leftArrBut, upArrBut, downArrBut, rightArrBut);
    return wrapper;
}

window.addEventListener("keydown", (event) => {
    if (["F1", "F2", "F3", "F4", "F5", "F6", "F7", "F8", "F9", "F10", "F11", "F12", "Insert"].includes(event.code)) {
        return;
    }
    event.preventDefault();
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        shiftDown = true;
        shiftAlt();
        if (!checkShift()) {
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_shift")) {
                    a.classList.add("pressed");
                }
            });
            shiftIsPressed = true;
        }
    } else if (["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(event.code)) {
        /*  event.preventDefault(); */
        const arrow = [...wrapper.children].filter((x) =>
            x.dataset.code === event.code)[0];
        arrow.classList.add("pressed");
        writeMe(event.code);
    } else if (["Control", "ControlLeft", "ControlRight"].includes(event.code)) {
        /*  event.preventDefault(); */
        const b = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === "Control",
        );
        b.forEach((a) =>
            a.classList.add("pressed"));
    } else if (["Alt", "AltLeft", "AltRight"].includes(event.code)) {
        altdown = true;
        shiftAlt();
        /*  event.preventDefault(); */
        const f = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === "AltLeft",
        );
        f.forEach((a) =>
            a.classList.add("pressed"));
    } else if (event.code === "CapsLock") {
        const cl = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === event.code,
        )[0];

        if (capsIsPressed) cl.classList.add("pressed");
        else cl.classList.remove("pressed");
        writeMe(event.code);
    } else {
        const button = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === event.code,
        );

        if (["Tab", "Backspace", "Delete"].includes(event.code)) {
            /*  event.preventDefault(); */
        }

        console.log(`btn: ${event.code}`);
        button.forEach((a) =>
            a.classList.add("pressed"));
        writeMe(event.code);
    }
});
window.addEventListener("keyup", (event) => {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        shiftDown = false;
        shiftAlt();
        [...base.children].forEach((a) => {
            if (a.classList.contains("size_shift")) {
                a.classList.remove("pressed");
            }
        });
        shiftIsPressed = false;
    } else if (["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(event.code)) {
        const arrow = [...wrapper.children].filter((x) =>
            x.dataset.code === event.code)[0];
        arrow.classList.remove("pressed");
    } else if (["Control", "ControlLeft", "ControlRight"].includes(event.code)) {
        const b = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === "Control",
        );
        b.forEach((a) =>
            a.classList.remove("pressed"));
    } else if (["Alt", "AltLeft", "AltRight"].includes(event.code)) {
        altdown = false;
        shiftAlt();
        const f = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === "AltLeft",
        );
        f.forEach((a) =>
            a.classList.remove("pressed"));
    } else if (event.code === "CapsLock") {
        const cl = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === event.code,
        )[0];

        if (capsIsPressed) cl.classList.add("pressed");
        else cl.classList.remove("pressed");
    } else {
        const button = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === event.code,
        );

        button.forEach((a) =>
            a.classList.remove("pressed"));
    }
    textarea.focus();
});
function shiftAlt() {
    if (shiftDown && altdown) {
        console.log(`shift: ${shiftDown}, alt: ${altdown}`);
        changeLanguage();
    }
}
function changeLanguage() {
    textAreaResize();
    if (actualLanguage === "en") {
        actualLanguage = "ru";
        console.log(`switched to ru, word = ${word}`);
    } else {
        actualLanguage = "en";
        console.log(`switched to en, word = ${word}`);
    }
    drawButtons();
    textarea.focus();
}
function textAreaResize() {
    console.log(textAreaHeight);
    if (textarea.style.height !== textAreaHeight) {
        textAreaHeight = textarea.style.height;
    }
}
function addToStorage() {
    localStorage.setItem("keyboardLanguage", actualLanguage);
/* localStorage.setItem("keyboardHeight", textAreaHeight) */
}
function readFromStorage() {
    if (localStorage.getItem("keyboardLanguage")) {
        actualLanguage = localStorage.getItem("keyboardLanguage");
    }
/* if(localStorage.getItem("keyboardHeight")){
    textAreaHeight = localStorage.getItem("textAreaHeight");
} */
}

window.addEventListener("beforeunload", () =>
    addToStorage());

/* '''''''''''''''delete'''''''''''' */
function select() {
    textarea.addEventListener("click", function () {
        console.log(`this.selectionStart: ${this.selectionStart}`);
        console.log(`this.selectionEnd: ${this.selectionEnd}`);
    });
}
