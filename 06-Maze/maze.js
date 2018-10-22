const reset = function () {
    $('.wall').removeAttr('hover');
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
                $('#info').text("Don't cheat, you should start from the 'S' and move to the 'E' inmap the maze!");
            }
            $('#info').attr('display', '');
            $('#map').removeAttr('start');
        }
        ingame = false;
    });

    
    $('.wall').mouseover(function () {
        if (ingame) {
            ingame = false;
            $(this).attr('hover', '');
            $('#info').attr('display', '');
            $('#map').removeAttr('start');
            $('#info').text('You Lose');
        }
    });
});