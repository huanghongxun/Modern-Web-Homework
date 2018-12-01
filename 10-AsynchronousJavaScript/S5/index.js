$(document).ready(function () {

    liClickAsync = (li) => new Promise(function (resolve, reject) {
        if (li.attr('value')) return;
        if ($('#control-ring').attr('calculating')) return;
        li.find('.unread').text('...');
        li.attr('value', '...').attr('calculating', 'calculating');

        $('#control-ring').attr('calculating', 'calculating');

        fetch('http://localhost:3000/')
            .then(obj => obj.text())
            .then(res => {
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

    aHandler = (currentSum, display, resolve, reject) => {
        display('这是个天大的秘密');

        liClickAsync($('#control-ring li:nth-child(1)'))
            .then(res => {
                if (Math.random() < 0.5) resolve(currentSum + parseInt(res));
                else throw 0;
            })
            .catch(err => reject({
                message: '这不是个天大的秘密',
                currentSum
            }));
    }

    bHandler = (currentSum, display, resolve, reject) => {
        display('我不知道');

        liClickAsync($('#control-ring li:nth-child(2)'))
            .then(res => {
                if (Math.random() < 0.5) resolve(currentSum + parseInt(res));
                else throw 0;
            })
            .catch(err => reject({
                message: '我知道',
                currentSum
            }));
    }

    cHandler = (currentSum, display, resolve, reject) => {
        display('你不知道');

        liClickAsync($('#control-ring li:nth-child(3)'))
            .then(res => {
                if (Math.random() < 0.5) resolve(currentSum + parseInt(res));
                else throw 0;
            })
            .catch(err => reject({
                message: '你知道',
                currentSum
            }));
    }

    dHandler = (currentSum, display, resolve, reject) => {
        display('他不知道');

        liClickAsync($('#control-ring li:nth-child(4)'))
            .then(res => {
                if (Math.random() < 0.5) resolve(currentSum + parseInt(res));
                else throw 0;
            })
            .catch(err => reject({
                message: '他知道',
                currentSum
            }));
    }

    eHandler = (currentSum, display, resolve, reject) => {
        display('才怪');

        liClickAsync($('#control-ring li:nth-child(5)'))
            .then(res => {
                if (Math.random() < 0.5) resolve(currentSum + parseInt(res));
                else throw 0;
            })
            .catch(err => reject({
                message: '就是这样',
                currentSum
            }));
    }

    bubbleHandler = (currentSum, display, resolve, reject) => {
        if (Math.random() < 0.5)
            display('楼主异步调用战斗力感人，目测不超过' + currentSum);
        else
            reject({
                message: '楼主异步调用战斗力太强了，目测超过' + currentSum,
                currentSum
            })
    };

    display = (x) => {
        $('#sum').text(x);
    }

    robot = (callChain, current, currentSum, display) => {
        if (current >= callChain.length) return;

        callChain[current](currentSum, display, function (nextSum) {
            robot(callChain, current + 1, nextSum, display);
        }, function (err) {
            display(err.message, currentSum);
        });
    }

    $('#bottom-positioner').mouseenter(function (e) {
        $('#control-ring li .unread').text('...');
        $('#control-ring li').removeAttr('value')
            .removeAttr('calculating')
            .removeAttr('calculated');
        $('#control-ring').removeAttr('calculating');
        $('#info-bar').removeAttr('valid');
        $('#sum').text('');

        let handlers = [aHandler, bHandler, cHandler, dHandler, eHandler];
        handlers = _.shuffle(handlers);
        handlers.push(bubbleHandler);
        robot(handlers, 0, 0, display);
    });
});