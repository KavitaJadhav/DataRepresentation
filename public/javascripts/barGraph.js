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
}

barGraph.drawYAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartBottomX + 40)
      .attr("y2", dimension.chartBottomY)
      .attr("stroke","black");
};

barGraph.drawXAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartTopX)
      .attr("y2", dimension.chartTopY - 20)
      .attr("stroke", "black");
};

barGraph.drawLabelsOnXAxis = function(xLabelsGroups, data, dimension, xDistance) {
      xLabelsGroups.selectAll("text").data(data).enter().append("svg:text")
      .text(function(d) { return d.label;})
      .attr("class", "tick-label")
      .attr("y", dimension.chartBottomY + 20)
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)) + 20; })
      .style("writing-mode", "tb")
};

barGraph.drawLabelsOnYAxis = function(yLabelsGroups, dimension, maxValue, numOfTicks, yDistance) {
      var interval = [];
      for(i = 0; i < numOfTicks; i++) 
            interval.push((maxValue/(numOfTicks-1))*i);
      yLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) {return d;})
      .attr("x", dimension.chartTopX - maxValue.toString().length * 10)
      .attr("y", function(d, i) { return dimension.chartBottomY - (yDistance/(numOfTicks - 1)*i); });
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

barGraph.displayXAxisDescription = function(group, dimension, maxLength, metadata, xDistance) {
      var x_axis_label = group.append("g").attr("class", "x_axis_label");
      var x_label = x_axis_label.append("text")
      .attr("class", "x_axis_label")
      .attr("y", dimension.chartBottomY + (maxLength*11))
      .attr("x", dimension.chartTopX + (xDistance/2))
      .text(metadata.x)
      .style("font-weight", "bold")
      .style("font-size", "19px");
};

barGraph.displayYAxisDescription = function(group, dimension, yDistance, metadata) {
      var y_axis_label = group.append("g").attr("class", "y_axis_label")
      var y_label = y_axis_label.append("text")
      .attr("class", "y_axis_label")
      .attr("y", dimension.chartTopY + (yDistance/2))
      .attr("x", 25)
      .text(metadata.y)
      .style("font-weight", "bold")
      .style("font-size", "19px");  
} 

barGraph.draw = function(data, metadata) {
      var svgContainer = d3.select("body").append("svg").attr("width",1100).attr("height",1100); 
      var maxValue = this.getMaxValueOnYAxis(data);
      var dimension = this.getChartDimension(data, metadata, maxValue);

      var numOfTicks = 5;
      var yDistance = dimension.chartBottomY - dimension.chartTopY;
      var xDistance = dimension.chartBottomX - dimension.chartTopX;
      var group = svgContainer.append("g");

      var lineGroup = group.append("g").attr("class", "line");
      this.drawYAxis(lineGroup, dimension);
      this.drawXAxis(lineGroup, dimension);      
      
      var xLabelsGroups = group.append("g").attr("class", "x-labels")
      this.drawLabelsOnXAxis(xLabelsGroups, data, dimension, xDistance);

      var yLabelsGroups = group.append("g").attr("class", "y-labels");
      this.drawLabelsOnYAxis(yLabelsGroups, dimension, maxValue, numOfTicks, yDistance);
      
      var yScale = d3.scale.linear().domain([0, maxValue]).range([0, yDistance]);
      var barGroup = group.append("g").attr("class", "bars");
      this.drawBars(barGroup, data, dimension, yScale, xDistance);

      var barLabelGroups = group.append("g").attr("class", "bar-label");

      var maxLength = this.maxLabelLength(data);
      this.displayXAxisDescription(group, dimension, maxLength, metadata, xDistance);
      this.displayYAxisDescription(group, dimension, yDistance, metadata);
};