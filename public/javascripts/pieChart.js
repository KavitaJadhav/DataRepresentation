var pieChart = {};

pieChart.draw = function(data , metadata) {
    var width = 1100,
    height = 650,
    radius = 250,
    color = d3.scale.category20c();

    var colorDescriptions = [];
 
    var svgContainer = d3.select("body")
        .append("svg:svg")
        .data([data])
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + 300 + "," + 300 + ")") ;


    var arc = d3.svg.arc()
        .outerRadius(radius);
 
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });

    var arcs = svgContainer.selectAll("g.slice")
        .data(pie)   
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i) { 
        var colorSelected =  color(i);
        colorDescriptions.push({"colorSelected": colorSelected, "label": data[i].label});
        return colorSelected; } )
        .attr("d", arc);

    arcs.append("svg:text")
        .attr("transform", function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d, i) { return data[i].value; });

    var description = svgContainer.append("g").attr("class", "description");
    var desc_label = description.append("text")
        .attr("class", "description")
        .attr("y", 300)
        .attr("x", 000)
        .text("PieChart for : "+ metadata.x + " with " + metadata.y)
        .style("font-weight", "bold")
        .style("font-size", "19px")
        .style("text-anchor", "middle"); 

    var pieChartLabels = svgContainer.append("g").attr("id","pie-chart-labels");
    pieChartLabels.selectAll("text").data(colorDescriptions).enter().append("svg:text")
        .text(function(d) { return d.label; } ).attr("x",440)
        .attr("y",function(d, i) { return 10 + i*30; });
    
    var pieChartLabelsColors = svgContainer.append("g").attr("id","pie-chart-labels-colors");
    pieChartLabelsColors.selectAll("rect").data(colorDescriptions).enter().append("rect")
        .attr("x",400)
        .attr("y",function(d, i) { return i*30; })
        .attr("width", 25)
        .attr("height", 15)
        .style("fill" , function(d) { return d.colorSelected; });

}