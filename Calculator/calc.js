let evaluated = false;

// Determines button clicked via id
function append(str) {
    if (evaluated) {
        clearScreen();
        evaluated = false;
    }

    document.calc.result.value += str;
}

function backspace() {
    document.calc.result.value = document.calc.result.value.substring(0, document.calc.result.value.length - 1)
}

// Clears calculator input screen
function clearScreen() {
    document.calc.result.value = "";
}

// Calculates input values
function calculate() {
    evaluated = true;
    try {
        var input = eval(document.calc.result.value);
        document.calc.result.value = input;
    } catch (err) {
        document.calc.result.value = "Error";
    }
}