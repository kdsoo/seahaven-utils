#!/usr/bin/env node

var mdns = require('multicast-dns')();
var path = require('path');

if (process.argv.length < 3) {
	console.error('Usage: %s <hostname>', path.basename(process.argv[1]));
	process.exit(1);
}

var hostname = process.argv[2];

mdns.on('response', function (response) {
	response.answers.forEach(function (answer) {
		if (answer.name === hostname) {
			console.log(answer.data);
			process.exit(1);
		}
	});
});
mdns.query(hostname, 'A');
setTimeout(function () {
	console.error(hostname + " not found");
	process.exit(1);
}, 1000);

