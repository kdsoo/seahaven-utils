#!/usr/bin/env node

var UUID = require('uuid-1345');
var servicedomain = "https://www.seahaven.xyz/";
var path = require('path')

if (process.argv.length < 3) {
	console.error('Usage: %s "service name"', path.basename(process.argv[1]))
		process.exit(1)
}
var name = process.argv[2];


UUID.v3({
	namespace: UUID.namespace.url,
	name: servicedomain
}, function (err, result) {
	console.log("Service namespace for name " + name + ": " + result);
	console.log(UUID.check(result));

	var data = { namespace: result, name: name };
	UUID.v5(data, function (err, result) {
		console.log("Generated a name-based UUID using SHA1:", result);
		console.log(UUID.check(result));
	});
});


