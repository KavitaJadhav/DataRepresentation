var bubbleGraph = {};

bubbleGraph.getMaxValueOnYAxis = function(data) {
      var maxValue = data.reduce(function(obj, result) {
            if(obj.value > result.value) return obj;
            return result;
      }).value;
      return (maxValue%20) > 0 ? maxValue + (20-(maxValue%20)) : maxValue;
};

bubbleGraph.getMaxValueOnXAxis = function(data) {
      var maxValue = data.reduce(function(obj, result) {
            if(obj.murder > result.murder) return obj;
            return result;
      }).murder;
      return (maxValue%20) > 0 ? maxValue + (20-(maxValue%20)) : maxValue;
};

bubbleGraph.getChartDimension = function(data, metadata, maxValue) {
      var dimension = {};
      dimension.chartTopX = metadata['y'].length * 10 + 25 + (maxValue.toString().length * 10);
      dimension.chartTopY = 100;
      dimension.chartBottomX = 900;
      dimension.chartBottomY = 500;
      return dimension;
};

bubbleGraph.maxLabelLength = function(data) {
      return data.map(function(obj) { return obj.label; })
            .reduce(function(prev, curr) { return prev.length>curr.length?prev:curr; }).length;
}

bubbleGraph.drawYAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartBottomX + 40)
      .attr("y2", dimension.chartBottomY)
      .attr("stroke","black");
};

bubbleGraph.drawXAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartTopX)
      .attr("y2", dimension.chartTopY)
      .attr("stroke", "black");
};

bubbleGraph.getIntervals = function(maxValue, numOfTicks) {
      var interval = [];
      for(var i = 0; i < numOfTicks; i++) 
            interval.push((maxValue/(numOfTicks-1))*i);
      return interval;
}
bubbleGraph.drawLabelsOnXAxis = function(xLabelsGroups, data, maxValue, numOfTicks, dimension, xDistance) {
      var interval = this.getIntervals(maxValue, numOfTicks);
      xLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) { return d;})
      .attr("class", "tick-label")
      .style("text-anchor" ,"end")
      .attr("transform", function (d, i)  {
            return "translate(" + (dimension.chartTopX + ((xDistance/(interval.length))*(i)) + "," + ((dimension.chartBottomY) + 20)+") rotate(0)") })
};

bubbleGraph.drawLabelsOnYAxis = function(yLabelsGroups, dimension, maxValue, numOfTicks, yDistance) {
      var interval = this.getIntervals(maxValue, numOfTicks);
      yLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) {return d;})
      .attr("x", dimension.chartTopX - maxValue.toString().length * 10)
      .attr("y", function(d, i) { return dimension.chartBottomY - (yDistance/(numOfTicks - 1)*i); });
};

bubbleGraph.drawCircles = function(bubbleGroup, data, dimension, yScale, xScale, color, maxValueOfYAxis) {      
      bubbleGroup.selectAll("circle").data(data).enter().append("circle")
      .attr("cx", function(d, i) { return dimension.chartTopX + xScale(d.murder); })
      .attr("cy", function(d) { return dimension.chartBottomY - yScale(d.value); })
      .attr("r", function(d) { return (d.value/maxValueOfYAxis) * 50;})
      .attr("fill",function(d,i){return color(i);})
      .attr("fill-opacity",0.6)
};

bubbleGraph.displayXAxisDescription = function(group, dimension, maxLength, metadata, xDistance) {
      var x_axis_label = group.append("g").attr("class", "x_axis_label");
      var x_label = x_axis_label.append("text")
      .attr("class", "x_axis_label")
      .attr("y", dimension.chartBottomY + (maxLength*3))
      .attr("x", dimension.chartTopX + (xDistance/2))
      .text(metadata.x)
      .style("font-weight", "bold")
      .style("font-size", "19px");
};

bubbleGraph.displayYAxisDescription = function(group, dimension, yDistance, metadata) {
      var y_axis_label = group.append("g").attr("class", "y_axis_label")
      var y_label = y_axis_label.append("text")
      .attr("class", "y_axis_label")
      .attr("y", dimension.chartTopY + (yDistance/2))
      .attr("x", 25)
      .text(metadata.y)
      .style("font-weight", "bold")
      .style("font-size", "19px");  
} 

bubbleGraph.draw = function(data, metadata) {
      
      var svgContainer = d3.select("body").append("svg").attr("width",1100).attr("height",1100); 
      var color = d3.scale.category20();
      var maxValueOfYAxis = this.getMaxValueOnYAxis(data);
      var maxValueOfXAxis = this.getMaxValueOnXAxis(data);
      var dimension = this.getChartDimension(data, metadata, maxValueOfYAxis);

      var numOfTicks = 5;
      var yDistance = dimension.chartBottomY - dimension.chartTopY;
      var xDistance = dimension.chartBottomX - dimension.chartTopX;
      var group = svgContainer.append("g");

      var lineGroup = group.append("g").attr("class", "line");
      this.drawYAxis(lineGroup, dimension);
      this.drawXAxis(lineGroup, dimension);      
      
      var xLabelsGroups = group.append("g").attr("class", "x-labels")
      this.drawLabelsOnXAxis(xLabelsGroups, data, maxValueOfXAxis, numOfTicks,dimension, xDistance);

      var yLabelsGroups = group.append("g").attr("class", "y-labels");
      this.drawLabelsOnYAxis(yLabelsGroups, dimension, maxValueOfYAxis, numOfTicks, yDistance);
      
      var yScale = d3.scale.linear().domain([0, maxValueOfYAxis]).range([0, yDistance]);
      var xScale = d3.scale.linear().domain([0, maxValueOfXAxis]).range([0, xDistance]);
      var bubbleGroup = group.append("g").attr("class", "bubbles");
      this.drawCircles(bubbleGroup, data, dimension, yScale, xScale, color, maxValueOfYAxis);

      var bubbleChartGroup = group.append("g").attr("class", "bubble-label");

      var maxLength = this.maxLabelLength(data);
      this.displayXAxisDescription(group, dimension, maxLength, metadata, xDistance);
      this.displayYAxisDescription(group, dimension, yDistance, metadata);
};