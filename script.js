const sizes = {
    STANDART: {
        width: "52px",
        height: "52px",
    },
    TABDEL: {
        width: "106px",
        height: "52px",
    },
    CAPSENTER: {
        width: "108px",
        height: "52px",
    },
    SHIFT: {
        width: "136px",
        height: "52px",
    },
    BIGCTRL: {
        width: "106px",
        height: "62px",
    },
    SPACE: {
        width: "300px",
        height: "62px",
    },
    SMALL: {
        width: "52px",
        height: "26px",
    },
    BIG_ST: {
        width: "62px",
        height: "62px",
    },
};
let actualLanguage = "en";
console.log(sizes);

class But {
    addition = "";
    constructor(text, size, addition = "") {
        this.text = text;
        this.size = size;
        this.addition = addition;
    }
    createButton() {
        const b = document.createElement("div");
        b.style.width = this.size.width;
        b.style.height = this.size.height;
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
                win.innerHTML =
                    "<img class='win_img' src='icons/win_icon.svg' alt='win'>";
                b.append(win);
            } else {
                const s = document.createElement("span");
                s.innerText = this.text;
                b.append(s);
            }
        }

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

function drawButtons() {
    document.body.innerHTML = "";
    const base = document.createElement("div");
    base.classList.add("base");

    const textarea = document.createElement("textarea");
    textarea.classList.add("textarea");

    const langDiv = document.createElement("div");
    const langDiv_span = document.createElement("span");
    langDiv_span.innerText = actualLanguage;
    langDiv.classList.add("langdiv");
    langDiv.append(langDiv_span);
    langDiv.addEventListener("click", changeLanguage);

    base.append(textarea);
    base.append(langDiv);
    document.body.append(base);
    fs.forEach((x) => {
        const b = new But(x, sizes.SMALL);

        const a = b.createButton();
        base.append(a);
        a.addEventListener("click", function() {
            b.pressMe(a);
        });
    });

    doubles.forEach((x, index) => {
        const b = new But(x, sizes.STANDART);
        b.addition = doubl_addit[index];

        const a = b.createButton();
        if (letters.includes(x)) {
            if (actualLanguage === "ru") {
                a.classList.add("secondaryRU");
            } else {
                a.classList.add("secondaryEN");
            }
        }
        base.append(a);
        a.addEventListener("click", function() {
            b.pressMe(a);
        });
        if (index === 12) {
            singleButton("Delete", sizes.TABDEL, base);
            singleButton("Tab", sizes.TABDEL, base);
        }
        if (index === 25) {
            singleButton("Caps Lock", sizes.CAPSENTER, base);
        }
        if (index === 36) {
            singleButton("ENTER", sizes.CAPSENTER, base);
            singleButton("Shift", sizes.SHIFT, base);
        }
        if (index === 46) {
            singleButton("Shift", sizes.SHIFT, base);
            singleButton("Ctrl", sizes.BIGCTRL, base);
            singleButton("win", sizes.BIG_ST, base);
            singleButton("Alt", sizes.BIG_ST, base);
            singleButton(" ", sizes.SPACE, base);
            singleButton("Alt", sizes.BIG_ST, base);
            singleButton("Ctrl", sizes.BIG_ST, base);
            base.append(arrowsDiv());
        }
    });
}

function singleButton(text, size, base) {
    const f = new But(text, size);
    const f_button = f.createButton();
    base.append(f_button);
    f_button.addEventListener("click", function() {
        f.pressMe(f_button);
    });
}

function arrowsDiv() {
    const wrapper = document.createElement("div");
    wrapper.classList.add("arrow_wrapper");
    const leftArrBut = new But("←", sizes.SMALL).createButton();

    const rightArrBut = new But("→", sizes.SMALL).createButton();

    const upArrBut = new But("↑", sizes.SMALL).createButton();

    const downArrBut = new But("↓", sizes.SMALL).createButton();

    [leftArrBut, rightArrBut, upArrBut, downArrBut].forEach((x) =>
        x.classList.add("button")
    );
    leftArrBut.classList.add("arrleftright");
    upArrBut.classList.add("arrup");

    downArrBut.classList.add("arrdown");
    rightArrBut.classList.add("arrleftright");
    /*   [leftArrBut, rightArrBut].forEach((x) => x.classList.add("arrleftright"));
                        [upArrBut, downArrBut].forEach((x) => x.classList.add("arrupdown")); */
    wrapper.append(leftArrBut, upArrBut, downArrBut, rightArrBut);
    return wrapper;
}

const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
const doubles = 'Ё!@#$%&/()=?*QWERTYUIOP{}>ASDFGHJKL:"ZXCVBNM~;.'.split(""); //46
const doubl_addit = "\\1234567890'+ЙЦУКЕНГШЩЗХЪ<ФЫВАПРОЛДЖЭЯЧСМИТЬБЮ,".split(
    ""
); //46

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

console.log(
    `doubles.length = ${doubles.length} vs addit.length = ${doubl_addit.length}`
);

function changeLanguage() {
    if (actualLanguage === "en") {
        actualLanguage = "ru";
    } else {
        actualLanguage = "en";
    }
    drawButtons();
}
/* doubles.forEach((a, index) => {
    console.log(`doubles: ${a}, addit: ${doubl_addit[index]}`);
}); */
/* const symbols = []; */
/* const singleSymbEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ\\/,.;'`".split(""); */
/* const singleSymbRU = "ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ".split(""); */

document.addEventListener("keydown", (event) => {
    console.log(event);
    console.log(event.key, event.code, event.ctrlKey, event.shiftKey);
});