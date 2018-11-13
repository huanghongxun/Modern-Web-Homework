function offset({ x, y }, d) {
    switch (d) {
        case 0: return { x: x - 1, y };
        case 1: return { x, y: y + 1 };
        case 2: return { x: x + 1, y };
        case 3: return { x, y: y - 1 };
        default: return undefined;
    }
}

function swap(arr, i, j) {
    let t = arr[i]; arr[i] = arr[j]; arr[j] = t;
}

class Game {
    constructor(container, image) {
        this.index = 0;
        this.image = image;
        this.container = container;
        this.running = false;
        $(container).addClass('board');

        $(this.container).empty();

        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                if (i + j < 6)
                    this.buildChild(this.image[this.index], i, j, i, j);
                else
                    this.empty = { x: i, y: j };
    }

    reset() {
        this.running = false;

        // i and j are current display coord
        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                this.moveChild(i, j, i, j);
    }

    restart() {
        this.running = true;
        this.empty = { x: 3, y: 3 };

        let now = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15];
        let ops = [];
        let time = 50;
        for (let t = 0; t < time; ++t) {
            let X = this.empty;
            let x = X.x * 4 + X.y;
            let d = Math.floor(Math.random() * 4);
            let Y = offset(X, d);
            if (Y.x < 0 || Y.x >= 4 || Y.y < 0 || Y.y >= 4) Y = offset(X, d ^ 2);
            let y = Y.x * 4 + Y.y;
            let t = now[x]; now[x] = now[y]; now[y] = t;

            ops.push({ from: X, to: Y });
            this.empty = Y;
        }

        console.log("Start");
        for (let t = time - 1; t >= 0; --t) {
            console.log("Swap ", ops[t].from, ops[t].to);
        }

        // i and j are current display coord
        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                if (i != this.empty.x || j != this.empty.y)
                    this.moveChild(i, j, Math.floor(now[i * 4 + j] / 4), now[i * 4 + j] % 4);

        this.now = now;
    }

    switchImage() {
        this.index = (this.index + 1) % this.image.length;
        $(this.container).find(".img").css({ 'background-image': `url("${this.image[this.index]}")` });
    }

    moveChild(x, y, actX, actY) {
        $(this.container).find(`.component[ori-x='${actX}'][ori-y='${actY}']`)
            .attr({ 'game-x': x, 'game-y': y })
            .css({ left: y * 100 + 'px', top: x * 100 + 'px' });
    }

    buildChild(image, x, y, actX, actY) {
        let img = $('<div class="img"></div>')
            .css({ left: -actY * 100 + 'px', top: -actX * 100 + 'px' })
            .css({ 'background-image': `url("${image}")` });
        let div = $('<div></div>')
            .addClass('component')
            .attr({ 'ori-x': actX, 'ori-y': actY })
            .attr({ 'game-x': x, 'game-y': y })
            .css({ left: y * 100 + 'px', top: x * 100 + 'px' })
            .append(img);

        div.click(() => {
            if (!this.running) return;

            const location = { x: parseInt(div.attr('game-x')), y: parseInt(div.attr('game-y')) };

            if (Math.abs(this.empty.x - location.x) + Math.abs(this.empty.y - location.y) != 1)
                return;

            swap(this.now, location.x * 4 + location.y, this.empty.x * 4 + this.empty.y);

            div.attr({ 'game-x': this.empty.x, 'game-y': this.empty.y })
                .css({ left: this.empty.y * 100 + 'px', top: this.empty.x * 100 + 'px' });
            this.empty = location;

            if (this.isGameSuccess()) {
                this.running = false;
                setTimeout(function() {
                    alert("You Win");
                }, 200);
            }
        });

        $(this.container).append(div);
    }

    isGameSuccess() {
        for (let i = 0; i < this.now.length; ++i)
            if (this.now[i] != i) return false;
        return true;
    }
}