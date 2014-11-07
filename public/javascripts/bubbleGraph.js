var bubbleGraph = {};

bubbleGraph.getMaxValue = function(data, column) {
      var maxValue = data.reduce(function(obj, result) {
            if(obj[column] > result[column]) return obj;
            return result;
      })[column];
      return (maxValue%20) > 0 ? maxValue + (20-(maxValue%20)) : maxValue;
};

bubbleGraph.getChartDimension = function(metadata, maxValue) {
      var dimension = {};
      dimension.chartLeftX = (metadata.yAxis.length * 10) + 50 + (maxValue.toString().length * 10);
      dimension.chartTopY = 100;
      dimension.chartRightX = 1000;
      dimension.chartBottomY = 500;
      return dimension;
};

bubbleGraph.drawAxis = function(lineGroup, x1, y1, x2, y2) {
      lineGroup.append("line")
      .attr("x1", x1).attr("y1", y1)
      .attr("x2", x2).attr("y2", y2)
      .attr("stroke","black");
};

bubbleGraph.drawXAxis = function(lineGroup, dimension) {
      this.drawAxis(lineGroup, dimension.chartLeftX , dimension.chartBottomY,
             dimension.chartRightX + 40, dimension.chartBottomY)
};

bubbleGraph.drawYAxis = function(lineGroup, dimension) {
      this.drawAxis(lineGroup, dimension.chartLeftX , dimension.chartBottomY,
             dimension.chartLeftX, dimension.chartTopY);
};

bubbleGraph.getIntervals = function(maxValue, numOfTicks) {
      var interval = [];
      for(var i = 0; i < numOfTicks; i++) 
            interval.push((maxValue/(numOfTicks-1))*i);
      return interval;
};

bubbleGraph.drawLabelsOnXAxis = function(xLabelsGroups, dimension, maxValue, numOfTicks, xDistance) {
      var interval = this.getIntervals(maxValue, numOfTicks);
      xLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) { return d;})
      .attr("x", function(d, i) { return dimension.chartLeftX + (xDistance/(numOfTicks - 1))*(i) })
      .attr("y", ((dimension.chartBottomY) + 20))
};

bubbleGraph.drawLabelsOnYAxis = function(yLabelsGroups, dimension, maxValue, numOfTicks, yDistance) {
      var interval = this.getIntervals(maxValue, numOfTicks);
      yLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) {return d;})
      .attr("x", dimension.chartLeftX - maxValue.toString().length * 10)
      .attr("y", function(d, i) { return dimension.chartBottomY - (yDistance/(numOfTicks - 1)*i); });
};

bubbleGraph.drawCircles = function(bubbleGroup, data, dimension, yScale, xScale, color) {
      var maxRadius = this.getMaxValue(data,"circleR");
      var descOrderedData = data.sort(function (dataPoint1,dataPoint2) {
            return dataPoint2.circleR - dataPoint1.circleR;
      });
      // sorting data in descending order so that smaller bubbles will show data on hover
      var tip = d3.tip()
        .attr('class', 'd3-tip')
        .offset([-10, 0])
        .html(function(d) {
          return "<strong> "+d.desc+"<br>"+d.xAxis+"<br>"+ d.yAxis+"<br>"+d.circleR+"</strong> ";
      });

      bubbleGroup.selectAll("circle").data(descOrderedData).enter().append("circle")
      .attr("cx", function(d, i) { return dimension.chartLeftX + xScale(d.xAxis); })
      .attr("cy", function(d) { return dimension.chartBottomY - yScale(d.yAxis); })
      .attr("r", function(d) { return (d.circleR/maxRadius) * 50;})
      .attr("fill",function(d,i){return color(i);})
      .attr("fill-opacity",0.6)
      .call(tip)
      .on('mouseover', tip.show)
      .on('mouseout', tip.hide)  
};

bubbleGraph.displayAxisDescription = function(group, x, y, classForAxisLabel, axisTitle) {
      var axis_label = group.append("g").attr("class", classForAxisLabel);
      var label = axis_label.append("text")
      .attr("class", classForAxisLabel)
      .attr("y", y)
      .attr("x", x)
      .text(axisTitle)
      .style("font-weight", "bold")
      .style("font-size", "19px");
};

bubbleGraph.displayXAxisDescription = function(group, dimension, xDistance, metadata) {
      this.displayAxisDescription(group, dimension.chartLeftX + (xDistance/2),
             dimension.chartBottomY + 50, "x_axis_label", metadata.xAxis);
};

bubbleGraph.displayYAxisDescription = function(group, dimension, yDistance, metadata) {
      this.displayAxisDescription(group, 25, dimension.chartTopY + (yDistance/2),
             "y_axis_label", metadata.yAxis); 
} 

bubbleGraph.draw = function(data, metadata) {
      
      var svgContainer = d3.select("body").append("svg").attr("width",1100).attr("height",1100); 
      var color = d3.scale.category20();
      var maxValueOfYAxis = this.getMaxValue(data,"yAxis");
      var maxValueOfXAxis = this.getMaxValue(data,"xAxis");
      var dimension = this.getChartDimension(metadata, maxValueOfYAxis);

      var numOfTicks = 5;
      var yDistance = dimension.chartBottomY - dimension.chartTopY;
      var xDistance = dimension.chartRightX - dimension.chartLeftX;
      var group = svgContainer.append("g");

      var lineGroup = group.append("g").attr("class", "line");
      this.drawYAxis(lineGroup, dimension);
      this.drawXAxis(lineGroup, dimension);      
      
      var xLabelsGroups = group.append("g").attr("class", "x-labels")
      this.drawLabelsOnXAxis(xLabelsGroups, dimension, maxValueOfXAxis, numOfTicks, xDistance);

      var yLabelsGroups = group.append("g").attr("class", "y-labels");
      this.drawLabelsOnYAxis(yLabelsGroups, dimension, maxValueOfYAxis, numOfTicks, yDistance);

      var yScale = d3.scale.linear().domain([0, maxValueOfYAxis]).range([0, yDistance]);
      var xScale = d3.scale.linear().domain([0, maxValueOfXAxis]).range([0, xDistance]);
      var bubbleGroup = group.append("g").attr("class", "bubbles");
      this.drawCircles(bubbleGroup, data, dimension, yScale, xScale, color);

      var bubbleChartGroup = group.append("g").attr("class", "bubble-label");

      this.displayXAxisDescription(group, dimension,  xDistance, metadata);
      this.displayYAxisDescription(group, dimension, yDistance, metadata);
};