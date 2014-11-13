var lineGraph = {};
lineGraph.getDimension = function() {
	var dimension = {};
	dimension.chartTopX = 100;
	dimension.chartTopY = 100;
	dimension.chartBottomX = 800;
	dimension.chartBottomY = 500;
	return dimension;
};
lineGraph.drawPath = function(svgContainer, data, dimension, yScale, xDistance) {
	var yPoints = data.map(function(element) { return dimension.chartBottomY - yScale(element.value);});
	var lines = svgContainer.append("g");
	lines.selectAll("line").data(yPoints).enter().append("line")
	.attr("x1", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)); })
	.attr("y1", function(d, i) { return d; })
	.attr("x2", function(d, i) { 
		if(i==data.length-1)
			return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5));
		return dimension.chartTopX + ((xDistance/(data.length))*((i+1)+0.5)); 
	})
	.attr("y2", function(d, i) {
		if(i==data.length-1)
			return d;
		return yPoints[i+1];
	})
	.attr("stroke", "black");

	var circles = svgContainer.append("g");
	circles.selectAll("circle").data(yPoints).enter().append("circle")
	.attr("cx", function(d, i) {
		return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5));
	})
	.attr("cy", function(d, i) { return d; })
	.attr("r", 3)
	.style("fill", "red");
};

lineGraph.drawXTicks = function(tickLineGroup, data, dimension, xDistance) {
      tickLineGroup.selectAll("line").data(data).enter().append("line")
      .attr("x1", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)); })
      .attr("y1", dimension.chartBottomY)
      .attr("x2", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)); })
      .attr("y2", dimension.chartBottomY + 10)
      .attr("stroke", "black")
      .attr("stroke-opacity", 1);
};

lineGraph.draw = function(data, metadata) {
	var svgContainer = d3.select("body").append("svg").attr("width",1100).attr("height",1100); 
	var maxValue = barGraph.getMaxValueOnYAxis(data);
	var dimension = this.getDimension();

	var numOfTicks = 5;
	var yDistance = dimension.chartBottomY - dimension.chartTopY;
	var xDistance = dimension.chartBottomX - dimension.chartTopX;
	var group = svgContainer.append("g");

	var yScale = d3.scale.linear().domain([0, maxValue]).range([0, yDistance]);

	var lineGroup = group.append("g").attr("class", "line");
	barGraph.drawYAxis(lineGroup, dimension);
	barGraph.drawXAxis(lineGroup, dimension);  

	var xLabelsGroups = group.append("g").attr("class", "x-labels");
	barGraph.drawLabelsOnXAxis(xLabelsGroups, data, dimension, xDistance, 0);
	
	var yLabelsGroups = group.append("g").attr("class", "y-labels");
    var yAxisLabels = barGraph.getValuesOnYAxis(maxValue, numOfTicks);
    barGraph.drawLabelsOnYAxis(yLabelsGroups, dimension, yAxisLabels, maxValue, maxValue, yScale);
    var xTickLineGroup = group.append("g").attr("class", "x-tick-lines");
    this.drawXTicks(xTickLineGroup, data, dimension, xDistance);

    var yTickLineGroup = group.append("g").attr("class", "y-tick-lines");
    barGraph.drawYTicks(yTickLineGroup, yAxisLabels, yScale, dimension);
	
	this.drawPath(group, data, dimension, yScale, xDistance);

	var maxLength = barGraph.maxLabelLength(data);
  	barGraph.displayXAxisDescription(group, dimension, maxLength, xDistance, metadata.x);
	barGraph.displayYAxisDescription(group, dimension, yDistance, metadata);

	var chartDescription = "Line Graph: " + metadata.x + " vs " +metadata.y;
	barGraph.displayTableInfo(group, metadata, dimension, chartDescription);
}