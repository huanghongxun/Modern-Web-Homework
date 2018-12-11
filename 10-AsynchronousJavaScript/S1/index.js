$(document).ready(function () {
    let current = 0;

    $('#control-ring li').click(function (e) {
        let time = current;
        if ($(this).attr('value')) return;
        if ($('#control-ring').attr('calculating')) return;
        $(this).find('.unread').text('...');
        $(this).attr('value', '...').attr('calculating', 'calculating');

        $('#control-ring').attr('calculating', 'calculating');

        fetch('http://localhost:3000/')
            .then(obj => obj.text())
            .then(res => {
                if (time != current) return;
                $(this).find('.unread').text(res);
                $(this).attr('value', res)
                    .attr('calculated', 'calculated')
                    .removeAttr('calculating');
                $('#control-ring').removeAttr('calculating');
                if ($('#control-ring li').toArray().filter(x => $(x).attr('value') === '...' || !$(x).attr('value')).length == 0)
                    $('#info-bar').attr('valid', 'valid');
            })
            .catch(err => console.log(err));
    });

    $('#bottom-positioner').mouseenter(function (e) {
        current++;
        $('#control-ring li .unread').text('...');
        $('#control-ring li').removeAttr('value')
            .removeAttr('calculating')
            .removeAttr('calculated');
        $('#control-ring').removeAttr('calculating');
        $('#info-bar').removeAttr('valid');
        $('#sum').text('');
    });

    $('#info-bar').click(function (e) {
        if (!$(this).attr('valid')) return;
        let res = $('#control-ring li .unread').toArray().map(x => parseInt($(x).text())).reduce((a, b) => a + b, 0);
        $('#sum').text(res);
        $(this).removeAttr('valid');
    });
});