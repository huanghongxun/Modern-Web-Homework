const countDown = function(delay, times, handler, stopped) {
    let _times = times;
    let id;
    let timer = function() {
        if (_times <= 0) {
            clearInterval(id);
            stopped();
            return;
        }

        handler(_times--);
    };

    id = setInterval(timer, delay);
    handler(_times--);

    return function() { clearInterval(id); };
}

$(document).ready(function() {
    var score = 0;
    var stop = null;
    var ingame = false;

    // Initialize game board
    for (let i = 1; i <= 16; i++) {
        $('#board').append('<div class="hole"></div>');
    }

    $('#board > div')
        .append('<img class="mole" src="./image/mole1.png" draggable="false"></div>')
        .append('<img class="ground" src="./image/ground.png" draggable="false"></div>');

    const resetGame = function() {
        ingame = false;
        $('.mole').hide();
        $('#timer').text('0');
        if (stop) stop();
    }

    const displaySummary = function() {
    }

    const createMole = function() {
        // show next mole
        $($('#board div')[Math.floor(Math.random() * 16)])
            .children('.mole')
            .slideUp();
    }

    const startGame = function() {
        ingame = true;
        score = 0;
        createMole();
        stop = countDown(1000, 30, function(remain) {
            $('#timer').text(remain);
        }, function() {
            resetGame();
            displaySummary();
        });
    }

    resetGame();

    $('.hole').click(function() {
        if (score > 0) --score;
        $('#count').text(score);
    });

    $('.mole').click(function (e) {
        e.stopPropagation();

        // hide self
        $(this).hide();

        // Count score
        ++score;
        $('#count').text(score);

        createMole();
    });

    $('#play').click(function() {
        if (ingame) {
            resetGame();
            displaySummary();
            $(this).removeAttr('gaming');
            this.src = './image/play.png';
        } else {
            startGame();
            $(this).attr('gaming', '');
            this.src = './image/pause.png';
        }
    });
});