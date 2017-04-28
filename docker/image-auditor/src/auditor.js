/**
* Lawrence Stalder
* RES_Docker
*/
var net = require("net");
var dgram = require("dgram");

var config = require("./config");
const INTERVAL = 1000;
const AFK = 5000;

var socket = dgram.createSocket("udp4");
var server = net.createServer((c) => {
	c.end(JSON.stringify(musicians));
});

var musicians = [];

// DES TRUCS POUR METTRE A JOUR LE UPLAST //
socket.on('message', function(payload) {
	var p = JSON.parse(payload);

	for (var i = 0; i < musicians.length; i++) {
		if (musicians[i].uuid == p.uuid) {
			musicians[i].activeSince = new Date();
			console.log("Payload received");
			//console.log("Musician " + p.uuid + " played sound : " + p.sound);
			return;
		}
	}

	p.activeSince = new Date();
	musicians.push(p);
});


// CLEANING AFK MUSICIANS // 
function clean() {
	var current = new Date();

	for (var i = 0; i < musicians.length; i++) {
		if (current - musicians[i].activeSince > AFK) {
			console.log("Removing " + musicians[i].uuid);
			musicians.splice(i,1);
		}
	}

	setTimeout(clean, INTERVAL);
}


socket.bind(config.PORT_UDP, function() {
	socket.addMembership(config.ADDR);
});

server.listen(config.PORT_TCP, config.LOCALHOST);

setTimeout(clean, INTERVAL);


