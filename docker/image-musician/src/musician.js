/**
* Lawrence Stalder
* RES_Docker
*/

var uuid = require("uuid");
var dgram = require("dgram");

var config = require("./config");
const INTERVAL = 1000;

var socket = dgram.createSocket("udp4");

var instrument = process.argv[2];

var payloadUUID = uuid.v4();

function sound() {

	var payload = JSON.stringify
		({
			uuid : payloadUUID, 
			instrument : instrument,
			sound : config.INSTRUMENTS[instrument]
		})

	var buf = new Buffer(payload);

	socket.send(buf, 0, buf.length, config.PORT, config.ADDR);

	console.log(payload);
}


/**----------Main------------**/
if (config.INSTRUMENTS[instrument] === undefined) {
    process.on("exit", function () {
        console.log("The instrument " + instrument + " is not defined.");
        process.exit(1);
    });
}

setInterval(sound, INTERVAL);
/**--------------------------**/

