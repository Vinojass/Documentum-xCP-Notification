chrome.notifications.onClosed.addListener(function () {
    console.log(arguments);
})

chrome.notifications.onClicked.addListener(function () {
    console.log(arguments);
})


var url = null;

var notify = function (title, message) {
    chrome.notifications.create('xCPNotificationId', {
        type: 'image',
        title: title,
        message: message,
        iconUrl: 'xcp.png',
        imageUrl: 'xcp.png',
        buttons: [{
            title: 'Open URL'
        }, {
            title: 'cancel'
        }]
    }, function () {
        console.log(arguments);
    })
}

var socket = io.connect('http://localhost:3000');
socket.on('connect', function () {
    console.log('Client connected');
    console.log(socket);
});

socket.on('receiveYourNotification', info => {
    url = 'http://vino:8080/Fathom';
    notify(info.message, info.userName + info.message + info.dateReceived);
})

function openURL() {
    window.open(url);
    closeNotification();
}

function closeNotification() {
    chrome.notifications.clear('xCPNotificationId', function () {
        console.log('xCPNotificationId cleared..!')
    })
}


chrome.notifications.onButtonClicked.addListener(function (notificationId, buttonIndex) {
    if (notificationId === 'xCPNotificationId' && buttonIndex === 0)
        openURL();
    else if (notificationId === 'xCPNotificationId' && buttonIndex === 1)
        closeNotification();
})