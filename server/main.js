var VOLTAGE = 5;

var five = require('johnny-five');
var io   = require('socket.io').listen(8080);

var temperatureSensor;

var socket;
var board = new five.Board();

board.on("ready", function() {
    temperatureSensor = new five.Sensor({
        pin: "A0",
        freq: 1000
    });

    io.sockets.on("connection", function(socket) {
        console.log("New connection arrived: " + socket.id);
        temperatureSensor.on("data", function() {
            socket.emit("temperature", getTemperature());
        });
    });

    this.repl.inject({
        temperatureSensor: temperatureSensor
    });
});

function getTemperature() {
    return Math.round(temperatureSensor.value * (VOLTAGE / 1023) * 100) - 50;
}
