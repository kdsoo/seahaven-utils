#!/usr/bin/env node

var path = require('path')
process.env['NODE_CONFIG_DIR'] = path.join(__dirname, "..", "config");
var UUID = require('uuid-1345');
var config = require('config');
var servicedomain = config.get("uuid.servicedomain");
var devicedomain = config.get("uuid.devicedomain");
var userdomain = config.get("uuid.userdomain");

if (process.argv.length < 3) {
	console.error('Usage: %s category(service|device|user) "name" <option: -v (verbose)>', path.basename(process.argv[1]))
		process.exit(1)
}
var category = process.argv[2];
if (category == "service") {
	namespace = UUID.namespace.url;
	category = servicedomain;
} else if (category == "device") {
	namespace = UUID.namespace.oid;
	category = devicedomain;
} else if (category == "user") {
	namespace = UUID.namespace.oid;
	category = userdomain;
} else {
	console.error("Only 'service', 'device' or 'user' category accepted");
	process.exit();
}
var name = process.argv[3];
var verbose = process.argv[4] == "-v" ? true:false;

UUID.v3({
	namespace: namespace,
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


