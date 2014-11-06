var pieChart = {};

pieChart.createContainer = function(data, width, height) {
    return d3.select("body")
        .append("svg:svg")
        .data([data])
        .attr("width", width)
        .attr("height", height)
        .append("svg:g")
        .attr("transform", "translate(" + 300 + "," + 300 + ")") ;
} 

pieChart.draw = function(data , metadata, innerRadiusOfPieChart) {
    var width = 1100,
    height = 650,
    radius = 250,
    color = ["#C5AAF5","#FB7374","#A3CBF1","#79BFA1","#F5A352","#94B3C8", "#F9D08B","#B2AC4E","#64BD4F","#C09372"];

    var colorDescriptions = [];
 
    var svgContainer = pieChart.createContainer(data, width, height);

    var arc = d3.svg.arc()
        .outerRadius(radius)
        .innerRadius(innerRadiusOfPieChart);
 
    var pie = d3.layout.pie()
        .value(function(d) { return d.value; });

    var arcs = svgContainer.selectAll("g.slice")
        .data(pie)   
        .enter()
        .append("svg:g")
        .attr("class", "slice");

    arcs.append("svg:path")
        .attr("fill", function(d, i) { 
        var colorSelected =  color[i];
        colorDescriptions.push({"colorSelected": colorSelected, "label": data[i].label});
        return colorSelected; } )
        .attr("d", arc)

    arcs.append("svg:text")
        .attr("transform", function(d) {
        d.innerRadius = 0;
        d.outerRadius = radius;
            return "translate(" + arc.centroid(d) + ")";
        })
        .attr("text-anchor", "middle")
        .text(function(d, i) { return data[i].value; })
        .style("font-weight", "bold")
        .style("font-size", "20px");

    var description = svgContainer.append("g").attr("class", "description");
    var desc_label = description.append("text")
        .attr("class", "description")
        .attr("y", 300)
        .attr("x", 000)
        .text("Pie Chart of "+ metadata.x + " with " + metadata.y)
        .style("font-weight", "bold")
        .style("font-size", "20px")
        .style("text-anchor", "middle"); 

    var pieChartLabels = svgContainer.append("g").attr("id","pie-chart-labels");
    pieChartLabels.selectAll("text").data(colorDescriptions).enter().append("svg:text")
        .text(function(d) { return d.label; } ).attr("x",440)
        .attr("y",function(d, i) { return 14 + i*30; })
        .style("font-weight", "bold")
        .style("font-size", "20px");
    
    var pieChartLabelsColors = svgContainer.append("g").attr("id","pie-chart-labels-colors");
    pieChartLabelsColors.selectAll("rect").data(colorDescriptions).enter().append("rect")
        .attr("x",400)
        .attr("y",function(d, i) { return i*30; })
        .attr("width", 25)
        .attr("height", 15)
        .style("fill" , function(d) { return d.colorSelected; });

}