var pieChart = {};

pieChart.createContainer = function(data, width, height, radius) {
    return d3.select("body")
        .append("svg:svg")
        .data([data])
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + 1.5 * radius + "," + 1.5 * radius + ")");
}

pieChart.draw = function(data, metadata, innerRadiusOfPieChart) {
    var width = 1100,
        height = 1100,
        radius = 250,
        color = ["#C5AAF5", "#FB7374", "#A3CBF1", "#79BFA1", "#F5A352", "#94B3C8", "#F9D08B", "#B2AC4E", "#64BD4F", "#C09372"];

    var colorDescriptions = [];

    var svgContainer = pieChart.createContainer(data, width, height, radius);

    var dd = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(innerRadiusOfPieChart);

    var dd2 = d3.svg.arc()
        .outerRadius(radius + 20)
        .innerRadius(innerRadiusOfPieChart);


    var pie = d3.layout.pie()
        .value(function(d) {
            return d.value;
        });

    var arcs = svgContainer.selectAll("g.slice")
        .data(pie)
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i) {
            var colorSelected = color[i];
            colorDescriptions.push({
                "colorSelected": colorSelected,
                "label": data[i].label
            });
            return colorSelected;
        })
        .attr("class", "pie")
        .attr("d", dd)
        .style('stroke', 'white')
        .style('stroke-width', 2)
        .on("mouseover", function(d) {
            d3.selectAll("text")
                .filter(function(thisData) {
                    return d.value == thisData.value;
                })
                .style("font-size", "30px")
                .transition()
                .duration(500)
                .attr("transform", function(d) {
                    var temp = dd.innerRadius();
                    dd.innerRadius(0);
                    var c = dd.centroid(d);
                    dd.innerRadius(temp);
                    return "translate(" + c[0] * 2.3 + "," + c[1] * 2.3 + ")";
                })

            d3.selectAll("path")
                .filter(function(thisData) {
                    return d.value == thisData.value;
                })
                .transition()
                .duration(500)
                .attr("d", dd2);
        })
        .on("mouseout", function(d) {
            d3.selectAll("text")
                .filter(function(thisData) {
                    return d.value == thisData.value;
                })
                .style("font-size", "20px")
                .transition()
                .duration(500)
                .attr("transform", function(d) {
                    var temp = dd.innerRadius();
                    dd.innerRadius(0);
                    var c = dd.centroid(d);
                    dd.innerRadius(temp);
                    return "translate(" + c[0] * 2.1 + "," + c[1] * 2.1 + ")";
                })

            d3.selectAll("path")
                .filter(function(thisData) {
                    return d.value == thisData.value;
                })
                .transition()
                .duration(500)
                .attr("d", dd);
        });


    arcs.append("svg:text")
        .attr("transform", function(d) {
            var temp = dd.innerRadius();
            dd.innerRadius(0);
            var c = dd.centroid(d);
            dd.innerRadius(temp);
            return "translate(" + c[0] * 2.1 + "," + c[1] * 2.1 + ")";
        })
        .attr("text-anchor", "middle")
        .style("font-family", "monospace")
        .style("fill", "#3f3f3f")
        .style("font-size", "20px")
        .text(function(d, i) {
            return data[i].value;
        })
        .on("mouseover", function(d) {
            d3.selectAll("text")
                .filter(function(thisData) {
                    return d.value == thisData.value;
                })
                .style("font-size", "30px")
        })
        .on("mouseout", function(d) {
            d3.selectAll("text")
                .filter(function(thisData) {
                    return d.value == thisData.value;
                })
                .style("font-size", "20px")
        });

    var descriptionText = innerRadiusOfPieChart > 0 ? "Donut Chart of " : "Pie Chart of ";

    descriptionText = descriptionText + metadata.x + " with " + metadata.y;

    var description = svgContainer.append("g").attr("class", "description");
    var desc_label = description.append("text")
        .attr("class", "description")
        .attr("y", 375)
        .attr("x", 000)
        .text(descriptionText)
        .style("font-weight", "bold")
        .style("font-size", "20px")
        .style("text-anchor", "middle");

    var pieChartLabels = svgContainer.append("g").attr("id", "pie-chart-labels");
    pieChartLabels.selectAll("text").data(colorDescriptions).enter().append("svg:text")
        .text(function(d) {
            return d.label;
        }).attr("x", 440)
        .attr("y", function(d, i) {
            return 14 + i * 30;
        })
        .style("font-size", "20px");

    var pieChartLabelsColors = svgContainer.append("g").attr("id", "pie-chart-labels-colors");
    pieChartLabelsColors.selectAll("rect").data(colorDescriptions).enter().append("rect")
        .attr("x", 400)
        .attr("y", function(d, i) {
            return i * 30;
        })
        .attr("width", 25)
        .attr("height", 15)
        .style("fill", function(d) {
            return d.colorSelected;
        });

}