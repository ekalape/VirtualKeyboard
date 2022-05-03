const sizes = {
    STANDART: {
        width: "52px",
        height: "52px",
    },
    LONG: {
        width: "70px",
        height: "52px",
    },
    SPACE: {
        width: "150px",
        height: "52px",
    },
    SMALL: {
        width: "52px",
        height: "26px",
    },
};
let actualLanguage = "en";
console.log(sizes);

class But {
    isPressed = false;
    addition = "";
    constructor(text, isFunctional, size) {
        this.text = text;
        this.isFunctional = isFunctional;
        this.size = size;
    }
    createButton() {
        const s = document.createElement("span");
        s.innerText = this.text;
        console.log(this.text);
        const b = document.createElement("div");
        b.classList.add("button");
        b.style.width = this.size.width;
        b.style.height = this.size.height;
        b.append(s);
        return b;
    }

    pressMe(el) {
        if (this.isFunctional) {
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
    /*    const wrapper = document.createElement("div");
    wrapper.classList.add("wrapper");
 */
    const base = document.createElement("div");
    base.classList.add("base");

    const langDiv = document.createElement("div");
    const langDiv_span = document.createElement("span");
    langDiv_span.innerText = actualLanguage;
    langDiv.classList.add("langdiv");

    langDiv.append(langDiv_span);

    /*   wrapper.append(base);
          wrapper.append(langDiv); */
    base.append(langDiv);
    document.body.append(base);

    nums.forEach((x) => {
        const b = new But(x, false, sizes.STANDART);
        const a = b.createButton();
        base.append(a);
        a.addEventListener("click", function() {
            b.pressMe(a);
        });
    });
}

const nums = "1234567890".split("");
const singleSymbEN = "ABCDEFGHIJKLMNOPQRSTUVWXYZ\\/,.;'`".split("");
const singleSymbRU = "ЁЙЦУКЕНГШЩЗХЪФЫВАПРОЛДЖЭЯЧСМИТЬБЮ".split("");

document.addEventListener("keydown", (event) => {
    console.log(event);
    console.log(event.key, event.code, event.ctrlKey, event.shiftKey);
});