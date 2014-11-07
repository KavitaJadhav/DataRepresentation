var barGraph = {};

barGraph.getMaxValueOnYAxis = function(data) {
      var maxValue = data.reduce(function(obj, result) {
            if(obj.value > result.value) return obj;
            return result;
      }).value;
      return (maxValue%20) > 0 ? maxValue + (20-(maxValue%20)) : maxValue;
};
barGraph.getChartDimension = function(data, metadata, maxValue) {
      var dimension = {};
      dimension.chartTopX = metadata['y'].length * 10 + 25 + (maxValue.toString().length * 10);
      dimension.chartTopY = 100;
      dimension.chartBottomX = dimension.chartTopX + (data.length * 50);
      dimension.chartBottomY = 500;
      return dimension;
};

barGraph.maxLabelLength = function(data) {
      return data.map(function(obj) { return obj.label; })
            .reduce(function(prev, curr) { return prev.length>curr.length?prev:curr; }).length;
};

//drawAxis function
barGraph.drawXAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartBottomX + 40)
      .attr("y2", dimension.chartBottomY)
      .attr("stroke","black");
};

barGraph.drawYAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartTopX)
      .attr("y2", dimension.chartTopY - 20)
      .attr("stroke", "black");
};

barGraph.drawLabelsOnXAxis = function(xLabelsGroups, data, dimension, xDistance, deviation) {
      xLabelsGroups.selectAll("text").data(data).enter().append("svg:text")
      .text(function(d) { return d.label;})
      .attr("class", "tick-label")
      .style("text-anchor" ,"end")
      .attr("transform", function (d, i)  {
            return "translate(" + (dimension.chartTopX + ((xDistance/(data.length))*(i+0.5) + deviation) + "," + ((dimension.chartBottomY) + 20)+") rotate(270)") });
};

barGraph.getValuesOnYAxis = function(maxValue, numOfTicks) {
      var yAxisLabels = [];
      for(i = 0; i < numOfTicks; i++) 
            yAxisLabels.push((maxValue/(numOfTicks-1))*i);
      return yAxisLabels;
};

barGraph.drawLabelsOnYAxis = function(yLabelsGroups, dimension, yAxisLabels, maxValue, maxValue, yScale) {
      yLabelsGroups.selectAll("text").data(yAxisLabels).enter().append("svg:text")
      .text(function(d) {return d;})
      .attr("x", dimension.chartTopX - maxValue.toString().length * 10)
      .attr("y", function(d, i) { return dimension.chartBottomY - yScale(d); });
};

barGraph.drawBars = function(barGroup, data, dimension, yScale, xDistance) {
      barGroup.selectAll("rect").data(data).enter().append("rect")
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)); })
      .attr("y", function(d) { return dimension.chartBottomY - yScale(d.value); })
      .attr("width", 40).attr("height", function(d) { return yScale(d.value); })
      .style("fill", "#00b3dc");
};

barGraph.drawBarLabels = function(barLabelGroups, data, dimension, yScale, xDistance) {
      barLabelGroups.selectAll("text").data(data).enter().append("svg:text")
      .attr("class", "tick-label")
      .attr("y", function(d) { return dimension.chartBottomY - yScale(d.value) - 10})
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)); })
      .text(function(d) { return d.value});
};

barGraph.displayXAxisDescription = function(group, dimension, maxLength, xDistance, description) {
      var x_axis_label = group.append("g").attr("class", "x_axis_label");
      var x_label = x_axis_label.append("text")
      .attr("class", "x_axis_label")
      .attr("y", dimension.chartBottomY + (maxLength*10) + 20)
      .attr("x", dimension.chartTopX - (description.length*4) + (xDistance/2))
      .text(description)
      .style("font-weight", "bold")
      .style("font-size", "19px");
};
      
barGraph.displayTableInfo = function( group , metadata , dimension, description){
      var graphDescription = group.append("g").attr("class", "graph_description");
      graphDescription.append("text").
            attr("class", "graph_description")
            .attr("y", dimension.chartTopY - 50)
            .attr("x", dimension.chartTopX + 100)
            .text(description)
            .style("font-weight", "bold")
            .style("font-size", "19px");
}

barGraph.displayYAxisDescription = function(group, dimension, yDistance, metadata) {
      var y_axis_label = group.append("g").attr("class", "y_axis_label")
      var y_label = y_axis_label.append("text")
      .attr("class", "y_axis_label")
      .attr("y", dimension.chartTopY + (yDistance/2))
      .attr("x", 25)
      .text(metadata.y)
      .style("font-weight", "bold")
      .style("font-size", "19px");  
};

barGraph.displayValue = function(percentageGroups , data , xDistance , chartBottomY , yScale, chartTopX){
      percentageGroups.selectAll("text").data(data).enter().append("svg:text")
            .text(function(d) { return d.value;})
            .attr("class", "tick-label")
            .attr("y", function(d) { return chartBottomY - yScale(d.value) - 10})
            .attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.5)); });
};

barGraph.drawTicks = function(tickLineGroup, yAxisLabels, yScale, dimension) {
      tickLineGroup.selectAll("line").data(yAxisLabels).enter().append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", function(d, i) { return dimension.chartBottomY - yScale(d); })
      .attr("x2", dimension.chartBottomX)
      .attr("y2", function(d, i) { return dimension.chartBottomY - yScale(d); })
      .attr("stroke", "black")
      .attr("stroke-opacity", 0.09);
};

barGraph.draw = function(data, metadata) {
      var svgContainer = d3.select("body").append("svg").attr("width",1100).attr("height",1100); 
      var maxValue = this.getMaxValueOnYAxis(data);
      var dimension = this.getChartDimension(data, metadata, maxValue);

      var numOfTicks = 5;
      var yDistance = dimension.chartBottomY - dimension.chartTopY;
      var xDistance = dimension.chartBottomX - dimension.chartTopX;
      var group = svgContainer.append("g");

      var yScale = d3.scale.linear().domain([0, maxValue]).range([0, yDistance]);

      var lineGroup = group.append("g").attr("class", "line");
      this.drawYAxis(lineGroup, dimension);
      this.drawXAxis(lineGroup, dimension);      
      
      var xLabelsGroups = group.append("g").attr("class", "x-labels")
      this.drawLabelsOnXAxis(xLabelsGroups, data, dimension, xDistance, 20);

      var yLabelsGroups = group.append("g").attr("class", "y-labels");
      var yAxisLabels = this.getValuesOnYAxis(maxValue, numOfTicks);
      this.drawLabelsOnYAxis(yLabelsGroups, dimension, yAxisLabels, maxValue, maxValue, yScale);
      
      var tickLineGroup = group.append("g").attr("class", "tick-lines")
      this.drawTicks(tickLineGroup, yAxisLabels, yScale, dimension);

      var barGroup = group.append("g").attr("class", "bars");
      this.drawBars(barGroup, data, dimension, yScale, xDistance);

      var barLabelGroups = group.append("g").attr("class", "bar-label");

      var maxLength = this.maxLabelLength(data);
      this.displayXAxisDescription(group, dimension, maxLength, xDistance, metadata.x);
      this.displayYAxisDescription(group, dimension, yDistance, metadata);

      var description = "Bar Graph: "  + metadata.x + " vs " + metadata.y;
      this.displayTableInfo(group , metadata ,dimension, description);

      var percentageGroups = group.append("g").attr("class", "percentage")
      this.displayValue(percentageGroups , data , xDistance , dimension.chartBottomY ,yScale, dimension.chartTopX);
};