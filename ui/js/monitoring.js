var socket = io.connect("http://192.168.56.101:8080");

socket.on("temperature", function(value) {
    $(".temperature .value").text(value + "°C");
});
