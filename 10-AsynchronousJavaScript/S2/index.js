$(document).ready(function () {
    let current = 0;

    liClickAsync = (li, time) => new Promise(function (resolve, reject) {
        if (li.attr('value')) return;
        if ($('#control-ring').attr('calculating')) return;
        li.find('.unread').text('...');
        li.attr('value', '...').attr('calculating', 'calculating');

        $('#control-ring').attr('calculating', 'calculating');

        fetch('http://localhost:3000/')
            .then(obj => obj.text())
            .then(res => {
                if (time != current) return;
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
        current++;
        $('#control-ring li .unread').text('...');
        $('#control-ring li').removeAttr('value')
            .removeAttr('calculating')
            .removeAttr('calculated');
        $('#control-ring').removeAttr('calculating');
        $('#info-bar').removeAttr('valid');
        $('#sum').text('');
    });

    $('.apb').click(function () {
        let thisTime = current;
        let lis = $('#control-ring li').toArray();
        let promise = Promise.resolve();
        for (let i = 0; i < lis.length; ++i)
            promise = promise.then(() => liClickAsync($(lis[i]), thisTime));
        promise.then(() => infoBarClick($('#info-bar')))
    });
});