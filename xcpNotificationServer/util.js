(function () {

    module.exports.info = function (info) {
        console.log(info);
    };

    var JsonDB = require('node-json-db');
    var db = new JsonDB("NotificationDatabase", true, false);

    module.exports.notificationPush = function (path, notificationObject) {
        db.push('/' + path, notificationObject);
    }
    module.exports.getNotification = function () {
        return db.getData('/');
    }
    module.exports.getNotificationAt = function (path) {
        return db.getData('/' + path);
    }
}());