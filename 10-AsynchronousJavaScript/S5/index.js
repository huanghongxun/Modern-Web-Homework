$(document).ready(function () {
    let current = 0;

    liClickAsync = (li, time, reason) => new Promise(function (resolve, reject) {
        if (li.attr('value')) return;
        if ($('#control-ring').attr('calculating')) return;
        li.find('.unread').text('...');
        li.attr('value', '...').attr('calculating', 'calculating');

        $('#control-ring').attr('calculating', 'calculating');

        fetch('http://localhost:3000/')
            .then(obj => obj.text())
            .then(res => {
                if (time != current) return;
                if (Math.random() < 0.5) {
                    li.removeAttr('value').removeAttr('calculating');
                    $('#control-ring').removeAttr('calculating');
                    reject(reason);
                    return;
                }

                li.find('.unread').text(res);
                li.attr('value', res)
                    .attr('calculated', 'calculated')
                    .removeAttr('calculating');
                $('#control-ring').removeAttr('calculating');
                if ($('#control-ring li').toArray().filter(x => $(x).attr('value') === '...' || !$(x).attr('value')).length == 0)
                    $('#info-bar').attr('valid', 'valid');
                
                resolve(res);
            })
            .catch(err => reject(err));
    });

    aHandler = (currentSum, thisTime, display, resolve, reject) => {
        if (thisTime != current) return;
        display('这是个天大的秘密');

        liClickAsync($('#control-ring li:nth-child(1)'), thisTime, {
            message: '这不是个天大的秘密',
            currentSum
        }).then(res => resolve(currentSum + parseInt(res)))
        .catch(err => reject(err));
    }

    bHandler = (currentSum, thisTime, display, resolve, reject) => {
        if (thisTime != current) return;
        display('我不知道');

        liClickAsync($('#control-ring li:nth-child(2)'), thisTime, {
            message: '我知道',
            currentSum
        }).then(res => resolve(currentSum + parseInt(res)))
        .catch(err => reject(err));
    }

    cHandler = (currentSum, thisTime, display, resolve, reject) => {
        if (thisTime != current) return;
        display('你不知道');

        liClickAsync($('#control-ring li:nth-child(3)'), thisTime, {
            message: '你知道',
            currentSum
        }).then(res => resolve(currentSum + parseInt(res)))
        .catch(err => reject(err));
    }

    dHandler = (currentSum, thisTime, display, resolve, reject) => {
        if (thisTime != current) return;
        display('他不知道');

        liClickAsync($('#control-ring li:nth-child(4)'), thisTime, {
            message: '他知道',
            currentSum
        }).then(res => resolve(currentSum + parseInt(res)))
        .catch(err => reject(err));
    }

    eHandler = (currentSum, thisTime, display, resolve, reject) => {
        if (thisTime != current) return;
        display('才怪');

        liClickAsync($('#control-ring li:nth-child(5)'), thisTime, {
            message: '就是这样',
            currentSum
        }).then(res => resolve(currentSum + parseInt(res)))
        .catch(err => reject(err));
    }

    bubbleHandler = (currentSum, thisTime, display, resolve, reject) => {
        if (thisTime != current) return;
        if (Math.random() < 0.5)
            display('楼主异步调用战斗力感人，目测不超过' + currentSum);
        else
            reject({
                message: '楼主异步调用战斗力太强了，目测超过' + currentSum,
                currentSum
            })
    };

    display = (msg, sum) => {
        $('#sum').text(msg);
        if (sum) $('#ss').text(sum.toString());
    }

    robot = (callChain, index, currentSum, display, thisTime) => {
        if (index >= callChain.length) return;

        callChain[index](currentSum, thisTime, display, function (nextSum) {
            robot(callChain, index + 1, nextSum, display, thisTime);
        }, function (err) {
            if (thisTime != current) return;
            display(err.message, currentSum);
        });
    }

    clear = () => {
        $('#control-ring li .unread').text('...');
        $('#control-ring li').removeAttr('value')
            .removeAttr('calculating')
            .removeAttr('calculated');
        $('#control-ring').removeAttr('calculating');
        $('#info-bar').removeAttr('valid');
        $('#sum').text('');
        $('#order').text('');
        $('#ss').text('');
    }

    $('#bottom-positioner').mouseenter(function (e) {
        clear();
    });

    $('.apb').click(function () {
        clear();
        let thisTime = ++current;
        let handlers = [aHandler, bHandler, cHandler, dHandler, eHandler].map((action, i) => ({ action, i }));
        handlers = _.shuffle(handlers);
        $('#order').text(handlers.map(li => String.fromCharCode(65 + li.i)).join(", "));
        handlers.push({ action: bubbleHandler });
        robot(handlers.map(({action}) => action), 0, 0, display, thisTime);
    });
});