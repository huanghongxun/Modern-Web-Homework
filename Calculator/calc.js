let evaluated = false;

function append(str) {
    if (evaluated) {
        clearScreen();
        evaluated = false;
    }

    calc.value += str;
}

function backspace() {
    calc.value = calc.value.substring(0, calc.value.length - 1)
}

function clearScreen() {
    calc.value = "";
}

function calculate() {
    evaluated = true;
    try {
        var input = eval(calc.value);
        calc.value = input;
    } catch (err) {
        calc.value = "表达式错误";
    }
}

function applyDragTo(draggable, movement) {
    let target = movement;
    
    window.addEventListener('mousedown', function(e) {
        this.mouseX = e.pageX;
        this.mouseY = e.pageY;

        this.initX = target.offsetLeft;
        this.initY = target.offsetTop;

        this.dragging = true;
    }, false);

    window.addEventListener('mousemove', function(e) {
        if (this.dragging) {
            target.style.left = (e.pageX - this.mouseX + this.initX) + "px";
            target.style.top = (e.pageY - this.mouseY + this.initY) + "px";
        }
    }, false);

    window.addEventListener('mouseup', function(e) {
        this.dragging = false;
    }, false);
}

window.onload = function() {
    applyDragTo(document.getElementById("title"),
        document.getElementById("calculator"));
}