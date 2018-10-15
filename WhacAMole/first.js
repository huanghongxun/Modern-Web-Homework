for (var i = 1; i < 17; i++) {
    $('#board').append('<div></div>');
}

$('#board div').append('<img class="hole" src="image/hole.png" draggable="false">');
$('#board div').append('<img class="mole" src="image/mole.png" draggable="false">');

// 设置初始状态地鼠都没出现

$('.mole').hide();

//袋鼠出现
// [1,4] [0, 3)
// 随机出现的袋鼠数目 [1 16]  (0, 15]  向上取整
var num
// 
//袋鼠位置[0  15]  索引 index
var index
var object;
setInterval(function () {
    num = Math.ceil(Math.random() * 2);
    for (var i = 1; i <= num; i++) {
        //随机出现的袋鼠位置[0  15]  索引
        index = Math.floor(Math.random() * 16);
        object = $('#board div:nth-of-type(' + (index + 1) + ') .mole')

        object.slideDown();
        object.delay(2000).slideUp();
    }

}, 1000);

var score = 0;
$('.mole').click(function () {
    $(this).hide();
    ++score;
    $('#count').text('得分：' + score);
});


