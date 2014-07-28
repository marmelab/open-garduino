var socket = io.connect("http://192.168.56.101:8080");

var temperatures = [
    { datetime: new Date(), temperature: 23 }
];

var lineChart = d3.chart.line().width(350).height(220);

var temperatureChart = d3.select(".temperature .chart")
    .data([temperatures])
    .call(lineChart)
;

socket.on("temperature", function(value) {
    temperatures.push({ datetime: new Date(), temperature: value });
    d3.select(".temperature .chart")
        .data([temperatures])
        .call(lineChart.update)
    ;

    $(".temperature .value").text(value + "°C");
});
