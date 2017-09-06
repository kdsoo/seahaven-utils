#!/usr/bin/env node

var webpush = require('web-push');
var fs = require('fs');
var path = require('path')

var filename = process.argv[2];
if (!filename) filename = "VAPID.json";
else filename += ".json";

var vapidKeys = webpush.generateVAPIDKeys();
vapidKeys.issued = new Date();

console.log(vapidKeys);
fs.writeFile(filename, JSON.stringify(vapidKeys), "utf8", function(err) {
	if (err) console.error(filename + " save to file failed");
});
