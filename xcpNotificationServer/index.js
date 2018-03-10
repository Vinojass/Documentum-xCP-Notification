var app = require('express')();
var http = require('http').Server(app);
var io = require('socket.io')(http);
var util = require('./util');

app.get('/', function (req, res) {
    res.sendFile(__dirname + '/index.html');
})

var num = 0;


io.on('connection', function (socket) {
    util.info('New session started..!');

    app.route('/notify')
        .get(function (req, res) {
            res.send(util.getNotification());
            util.info('Objects retreived from databse');
        })
        .post(function (req, res) {
            util.notificationPush(num, {
                userName: 'Vinojash' + num,
                message: 'Email received..!',
                dateReceived: new Date(),
                isNotified: false
            });
            res.send('Notification sent');
            util.info('New object inserted in to database');
            io.sockets.emit('receiveYourNotification', util.getNotificationAt(num));
            num++;
        })

    socket.on('getMyNotification', function () {
        util.info('Client request processing..!');
        socket.emit('receiveYourNotification', util.getNotificationAt(0));
        util.info('Request sent to client');
    })

    socket.on('disconnect', function () {
        util.info('A user disconnected..!');
    });
});

http.listen(3000, function () {
    console.log('listening on *:3000');
});