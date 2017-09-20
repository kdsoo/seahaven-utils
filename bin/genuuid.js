#!/usr/bin/env node

var UUID = require('uuid-1345');
var config = require('config');
var servicedomain = config.get("uuid.servicedomain");
var devicedomain = config.get("uuid.devicedomain");
var path = require('path')

if (process.argv.length < 3) {
	console.error('Usage: %s category(service|device) "service name" <option: -v (verbose)>', path.basename(process.argv[1]))
		process.exit(1)
}
var category = process.argv[2];
if (category == "service") {
	category = servicedomain;
} else if (category == "device") {
} else {
	console.error("Only 'service' or 'device' category accepted");
	process.exit();
}
var name = process.argv[3];
var verbose = process.argv[4] == "-v" ? true:false;

UUID.v3({
	namespace: UUID.namespace.url,
	name: category
}, function (err, result) {
	if (verbose) {
		console.log("Service namespace for name " + name + ": " + result);
		console.log(UUID.check(result));
	}

	var data = { namespace: result, name: name };
	UUID.v5(data, function (err, result) {
		console.log("Generated a name-based UUID using SHA1:", result);
		if (verbose) console.log(UUID.check(result));
	});
});


