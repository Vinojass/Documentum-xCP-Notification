# Documentum-xCP-Notification
Using nodejs express, socket io, node-json-db send notification to chrome browser using chrome extension.

This is under development..!

### Installation
Open command prompt in xcpNotificationServer path and install the following packages from npm (if you don't have npm then install nodejs from its official)

```sh
$ npm install express --save
$ npm install socket.io --save
$ npm install node-json-db --save
```
Open your chrome browser and add the following folder as unpacked extension
```
xcpNotification ->add this folder as unpackged extension in your chrome browser
```

start your node js application
```
node index.js
```

use postman to call the following nodejs applicaton url using post method
```
localhost:3000/notify
```

Now you will receive notification from chrom with sample image.

License
----
MIT
