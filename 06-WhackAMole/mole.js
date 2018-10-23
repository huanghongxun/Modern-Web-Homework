for (let i = 1; i <= 16; i++) {
    $('#board').append('<div></div>');
}

$('#board > div')
    .append('<img class="mole" src="./image/mole1.png" draggable="false"></div>')
    .append('<img class="ground" src="./image/ground.png" draggable="false"></div>');

$('.mole').hide();

let disp = [];
setInterval(function () {
    let num = Math.ceil(Math.random() * 2); // 1 or 2
    for (let i = 1; i <= num; i++) {
        $($('#board div')[Math.floor(Math.random() * 16)])
            .children('.mole')
            .slideDown().delay(2000).slideUp();
    }

}, 1000);

let score = 0;
$('.mole').click(function () {
    $(this).hide();
    ++score;
    $('#count').text(score);
});