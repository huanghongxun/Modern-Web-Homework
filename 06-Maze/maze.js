const reset = function () {
    $('#map').removeAttr('fail');
}

$(document).ready(function () {
    var ingame = false, inmap = false;

    $('#map').mouseleave(function () {
        inmap = false;
        reset();
    });

    $('#start').mouseover(function () {
        reset();
        $('#info').removeAttr('display');
        $('#map').attr('start', '');
        ingame = true;
        inmap = true;
    });

    $('#end').mouseover(function () {
        if (ingame) {
            if (inmap) {
                $('#info').text('You Win');
            } else {
                $('#info').text("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
            }
        } else {
            $('#info').text("Don't cheat, you should start from the 'S' and move to the 'E' inside the maze!");
        }
        $('#info').attr('display', '');
        $('#map').removeAttr('start');
        ingame = false;
    });


    $('.wall').mouseover(function () {
        if (ingame) {
            ingame = false;
            $('#info').attr('display', '');
            $('#map').removeAttr('start');
            $('#map').attr('fail', '');
            $('#info').text('You Lose');
        }
    });
});