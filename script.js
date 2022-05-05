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
const functional = ["Shift", "Ctrl", "Caps Lock", "Alt"];

let actualLanguage = "en";

class But {
    addition = "";

    code = "";

    sizeClasses = [
        "size_win",
        "size_shift",
        "size_ctrl_l",
        "size_ctrl_s",
        "size_alt",
        "size_space",
        "size_capsenter",
        "size_tabdel",
        "size_small",
    ];

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
        if (functional.includes(this.text)) {
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

window.addEventListener("load", drawButtons);
let textarea;
let base;
let shiftIsPressed = false;
let capsIsPressed = false;
let ctrlIsPressed = false;
let altIsPressed = false;

let word = "";

function checkLanguage() {
    return actualLanguage;
}

function checkShift() {
    return shiftIsPressed;
}

function checkCaps() {
    return capsIsPressed;
}
/* function getFocus(){
    textarea.focus();
    console.log(word.length);
    textarea.selectionStart = word.length;
}
 */
function writeMe(code) {
    /*   getFocus(); */
    textarea.addEventListener("blur", () => {
        textarea.focus();
    });
    if (code === "ShiftLeft" || code === "ShiftRight") {
        if (!checkShift()) {
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_shift")) {
                    a.classList.add("pressed");
                }
            });
            shiftIsPressed = true;
        } else {
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_shift")) {
                    a.classList.remove("pressed");
                }
            });
            shiftIsPressed = false;
        }
    } else if (code === "Control") {
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
    } else if (code === "AltLeft") {
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
        if (!checkCaps()) capsIsPressed = true;
        else capsIsPressed = false;
    } else if (code === "Escape") {
        word = "";
        textarea.value = "";
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
    }

    return w;
}

function upperLowerText(w) {
    if ((checkShift() && !checkCaps()) || (!checkShift() && checkCaps())) {
        return w.toUpperCase();
    }
    return w.toLowerCase();
}

function drawButtons() {
    document.body.innerHTML = "";
    base = document.createElement("div");
    textarea = document.createElement("textarea");
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
    fs.forEach((x) => {
        const b = new But(x, "size_small");

        const a = b.createButton();
        base.append(a);
        a.addEventListener("click", () => {
            b.pressMe(a);
            if (b.text === "esc") {
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
    console.log(event.code);

    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
        event.preventDefault();
        if (!checkShift()) {
            [...base.children].forEach((a) => {
                if (a.classList.contains("size_shift")) {
                    a.classList.add("pressed");
                }
            });
            shiftIsPressed = true;
        } else {
            shiftIsPressed = false;
        }
    } else if (["ArrowLeft", "ArrowUp", "ArrowDown", "ArrowRight"].includes(event.code)) {
        event.preventDefault();
        const arrow = [...wrapper.children].filter((x) =>
            x.dataset.code === event.code)[0];
        arrow.classList.add("pressed");
        writeMe(event.code);
    } else {
        const button = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === event.code,
        )[0];
        if (event.code === "Tab" || event.code === "Control" || event.code === "Alt") {
            event.preventDefault();
        }

        button.classList.add("pressed");

        writeMe(event.code);
    }
});
window.addEventListener("keyup", (event) => {
    if (event.code === "ShiftLeft" || event.code === "ShiftRight") {
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
    } else {
        const button = [...base.childNodes].filter(
            (x) =>
                x.dataset.code === event.code,
        )[0];

        button.classList.remove("pressed");
    }
});

function select() {
    textarea.addEventListener("click", function () {
        console.log(`this.selectionStart: ${this.selectionStart}`);
        console.log(`this.selectionEnd: ${this.selectionEnd}`);
    });
}

function changeLanguage() {
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
