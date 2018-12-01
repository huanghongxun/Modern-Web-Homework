$(document).ready(function () {

    liClickAsync = (li) => new Promise(function (resolve, reject) {
        if (li.attr('value')) return;
        li.find('.unread').text('...');
        li.attr('value', '...').attr('calculating', 'calculating');

        $('#control-ring').attr('calculating', 'calculating');

        fetch('http://localhost:3000/' + Math.random())
            .then(obj => obj.text())
            .then(res => {
                li.find('.unread').text(res);
                li.attr('value', res)
                    .attr('calculated', 'calculated')
                    .removeAttr('calculating');
                $('#control-ring').removeAttr('calculating');
                if ($('#control-ring li').toArray().filter(x => $(x).attr('value') === '...' || !$(x).attr('value')).length == 0)
                    $('#info-bar').attr('valid', 'valid');
                
                resolve();
            })
            .catch(err => reject(err));
    });

    infoBarClick = (infoBar) => new Promise(function (resolve, reject) {
        if (!infoBar.attr('valid')) return;
        let res = $('#control-ring li .unread').toArray().map(x => parseInt($(x).text())).reduce((a, b) => a + b, 0);
        $('#sum').text(res);
        infoBar.removeAttr('valid');
    });

    $('#bottom-positioner').mouseenter(function (e) {
        $('#control-ring li .unread').text('...');
        $('#control-ring li').removeAttr('value')
            .removeAttr('calculating')
            .removeAttr('calculated');
        $('#control-ring').removeAttr('calculating');
        $('#info-bar').removeAttr('valid');
        $('#sum').text('');

        Promise.all($('#control-ring li').toArray().map(li => liClickAsync($(li))))
            .then(() => infoBarClick($('#info-bar')));
    });
});