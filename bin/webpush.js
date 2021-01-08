#!/usr/bin/env node

var path = require('path');
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, "..", "config");
var config = require('config');
var request = require('request');
var pushurl = config.get("webpush.notify");
var auth = config.get("webpush.auth");

if (process.argv.length < 5) {
	console.error('Usage: %s ID CHANNEL {"title":"", "message":"", "clickTarget":"", "icon":""}', path.basename(process.argv[1]));
	for (var i = 0; i < process.argv.length; i++) {
		console.log("[" + i + "] " + process.argv[i]);
	}
	process.exit(1);
}

var id = process.argv[2];
var channel = process.argv[3];
var data = process.argv[4];
try {
	data = JSON.parse(data);
} catch(e) {
	console.error(e);
	console.error(data, "is not JSON");
	process.exit();
}

data = {id: id, title: data.title, message: data.message, clickTarget: data.clickTarget, icon: data.icon};
console.log("data to be pushed:", data);
var endpoint = pushurl + channel;
console.log("Notify endpoint: " + endpoint);
var data = { url: endpoint, headers: {"auth-secret": auth}, form: data, rejectUnauthorized: false};

request.post(data, function(err, httpResponse, body) {
	if (err) console.error(err);
	console.log(body);
});

