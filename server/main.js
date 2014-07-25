var five = require('johnny-five');

var temperatureSensor;
var board = new five.Board();

board.on("ready", function() {
    temperatureSensor = new five.Sensor({
        pin: "A0"
    });

    setInterval(function() {
        console.log("Temperature: " + getTemperature() + "°C");
    }, 2000);

    this.repl.inject({
        temperatureSensor: temperatureSensor
    });
});

function getTemperature() {
    return Math.round(temperatureSensor.value * (5 / 1023) * 100) - 50;
}
