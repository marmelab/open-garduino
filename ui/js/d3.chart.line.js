d3.chart = d3.chart || {};

d3.chart.line = function() {
    var width = 800;
    var height = 600;
    var maximumDisplayedData = 100;

    var graph;

    var x, y;

    var lineFunction = d3.svg.line()
        .x(function(d, i) { return x(i); })
        .y(function(d) { return y(d.temperature); })
    ;

    function chart(selection) {
        x = d3.scale.linear()
            .range([0, width])
            .domain([0, maximumDisplayedData])
        ;

        y = d3.scale.linear()
            .domain([-10, 40])
            .range([height, 0])
        ;

        graph = selection.append("svg")
            .attr("width", width)
            .attr("height", height)
            .append("g")
        ;

        graph
            .selectAll("path")
            .data(selection.data())
            .enter()
                .append("svg:path")
                .attr("d", lineFunction)
        ;
    }

    chart.update = function(selection) {
        var full = false;
        var data = selection.datum();
        if (data.length > maximumDisplayedData) {
            full = true;
        }

        graph.select("path")
            .data([data])
            .attr("d", lineFunction)
            .attr("transform", null)
        ;

        if (full) {
            graph.select("path")
                .transition()
                .duration(500)
                .ease("linear")
                .attr("transform", "translate(" + x(-1) + ")");

            data.splice(0, 1);
        }

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

    chart.maximumDisplayedData = function(value) {
        if (!arguments.length) return maximumDisplayedData ;
        maximumDisplayedData = value;

        return chart;
    }

    return chart;
}
