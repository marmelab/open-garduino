d3.chart = d3.chart || {};

d3.chart.line = function() {
    var width = 800;
    var height = 600;
    var maximumDisplayedData = 100;

    var graph;

    var x, y;
    var lineFunction = d3.svg.line()
        .x(function(d) { return x(d.datetime); })
        .y(function(d) { return y(d.temperature); })
    ;

    function chart(selection) {
        graph = selection.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
        ;

        updateAxes(selection.datum());

        graph
            .selectAll("path")
            .data(selection.data())
            .enter()
                .append("svg:path")
                .attr("d", lineFunction)
        ;
    }

    function updateAxes(data) {
        x = d3.time.scale()
            .range([0, width])
            .domain(d3.extent(data, function(d) {
                return d.datetime;
            }))
        ;

        y = d3.scale.linear()
            .domain([-10, 40])
            .range([height, 0])
        ;
    }

    chart.update = function(selection) {
        var data = selection.datum();
        if (data.length > maximumDisplayedData) {
            data.splice(0, 1);
        }

        updateAxes(data);

        graph.selectAll("path")
            .data([data])
            .attr("d", lineFunction)
        ;
    };

    chart.width = function(value) {
        if (!arguments.length) return width;
        width = value;

        return chart;
    };

    chart.height = function(value) {
        if (!arguments.length) return height;
        height = value;

        return chart;
    };

    return chart;
}
