class Game {
    constructor(container, image) {
        this.image = image;
        this.container = container;
        $(container).addClass('board');

        $(this.container).empty();
        this.empty = { x: 3, y: 3 };

        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                if (i + j < 6)
                    this.buildChild(this.image, i, j, i, j);
    }

    restart() {
        $(this.container).empty();
        this.empty = { x: 3, y: 3 };

        let now = _.shuffle([0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15]);

        for (let i = 0; i < 4; ++i)
            for (let j = 0; j < 4; ++j)
                if (i + j < 6)
                    this.buildChild(this.image, Math.floor(now[i * 4 + j] / 4), now[i * 4 + j] % 4, i, j);
    }

    buildChild(image, x, y, actX, actY) {
        let img = $('<img alt="Puzzle Part" />')
            .css({ left: -actY * 100 + 'px', top: -actX * 100 + 'px' })
            .attr('src', image);
        let div = $('<div></div>')
            .addClass('component')
            .attr({ 'game-x': x, 'game-y': y })
            .css({ left: y * 100 + 'px', top: x * 100 + 'px' })
            .append(img);

        div.click(() => {
            const location = { x: parseInt(div.attr('game-x')), y: parseInt(div.attr('game-y')) };

            if (Math.abs(this.empty.x - location.x) + Math.abs(this.empty.y - location.y) != 1)
                return;

            div.attr({ 'game-x': this.empty.x, 'game-y': this.empty.y })
                .css({ left: this.empty.y * 100 + 'px', top: this.empty.x * 100 + 'px' });
            this.empty = location;
        });

        $(this.container).append(div);
    }
}