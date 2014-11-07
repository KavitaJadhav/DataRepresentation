var multiBarGraph = {};

multiBarGraph.getMaxValueOnYAxis = function(data) {

      var maxValue = 0;
      for(var i = 0 ; i < data.length ; i++){
            var obj = data[i];
            var keys = Object.keys(obj);
            for(var j = 1 ;j < keys.length ;j++){
                  if(obj[keys[j]] > maxValue)
                        maxValue = obj[keys[j]];
            }
      }
      return (maxValue%20) > 0 ? maxValue + (20-(maxValue%20)) : maxValue;
};
multiBarGraph.getChartDimension = function(data, metadata, maxValue) {
      var dimension = {};
      dimension.chartTopX = "values".length * 10 + 25 + (maxValue.toString().length * 10);
      dimension.chartTopY = 100;
      dimension.chartBottomX = dimension.chartTopX + (data.length *  Object.keys(data[0]).length * 50);
      dimension.chartBottomY = 500;
      return dimension;
};

multiBarGraph.maxLabelLength = function(data) {
      return data.map(function(obj) { return obj.value1; })
            .reduce(function(prev, curr) { return prev.length > curr.length ? prev : curr;}).toString().length;
}

multiBarGraph.drawYAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartBottomX + 40)
      .attr("y2", dimension.chartBottomY)
      .attr("stroke","black");
};

multiBarGraph.drawXAxis = function(lineGroup, dimension) {
      lineGroup.append("line")
      .attr("x1", dimension.chartTopX)
      .attr("y1", dimension.chartBottomY)
      .attr("x2", dimension.chartTopX)
      .attr("y2", dimension.chartTopY - 20)
      .attr("stroke", "black");
};

multiBarGraph.drawLabelsOnXAxis = function(xLabelsGroups, data, dimension, xDistance) {
      xLabelsGroups.selectAll("text").data(data).enter().append("svg:text")
      .text(function(d) { return d.value1;})
      .attr("class", "tick-label")
      .style("text-anchor" ,"end")
      .attr("transform", function (d, i)  {
            return "translate(" + (dimension.chartTopX + ((xDistance/(data.length))*(i+0.5) + 60) + "," + ((dimension.chartBottomY) + 20)+") rotate(270)") })
};

multiBarGraph.drawLabelsOnYAxis = function(yLabelsGroups, dimension, maxValue, numOfTicks, yDistance) {
      var interval = [];
      for(i = 0; i < numOfTicks; i++) 
            interval.push((maxValue/(numOfTicks-1))*i);
      yLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) {return d;})
      .attr("x", dimension.chartTopX - maxValue.toString().length * 10)
      .attr("y", function(d, i) { return dimension.chartBottomY - (yDistance/(numOfTicks - 1)*i); });
};

multiBarGraph.drawBars = function(barGroup, data, dimension, yScale, xDistance) {
      var barCount = Object.keys(data[0]).length-1;

      var firstGroup = barGroup.append("g");
      firstGroup.selectAll("rect").data(data).enter().append("rect")
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.2)); })
      .attr("y", function(d) { return dimension.chartBottomY - yScale(d.value2); })
      .attr("width", 36).attr("height", function(d) { return yScale(d.value2); })
      .style("fill", "#00b3dc");

      if(barCount < 2) return;
      var secondGroup = barGroup.append("g");
      secondGroup.selectAll("rect").data(data).enter().append("rect")
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.2)) + 40; })
      .attr("y", function(d) { return dimension.chartBottomY - yScale(d.value3); })
      .attr("width", 36).attr("height", function(d) { return yScale(d.value3); })
      .style("fill", "#DEB887");

      if(barCount < 3) return;
      var thirdGroup = barGroup.append("g");
      thirdGroup.selectAll("rect").data(data).enter().append("rect")
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.2)) + 80; })
      .attr("y", function(d) { return dimension.chartBottomY - yScale(d.value4); })
      .attr("width", 36).attr("height", function(d) { return yScale(d.value4); })
      .style("fill", "#7B68EE");
};

multiBarGraph.drawBarLabels = function(barLabelGroups, data, dimension, yScale, xDistance) {
      barLabelGroups.selectAll("text").data(data).enter().append("svg:text")
      .attr("class", "tick-label")
      .attr("y", function(d) { return dimension.chartBottomY - yScale(d.value) - 10})
      .attr("x", function(d, i) { return dimension.chartTopX + ((xDistance/(data.length))*(i+0.5)); })
      .text(function(d) { return d.value});
};

multiBarGraph.displayXAxisDescription = function(group, dimension, maxLength, metadata, xDistance) {
      var x_axis_label = group.append("g").attr("class", "x_axis_label");
      var x_label = x_axis_label.append("text")
      .attr("class", "x_axis_label")
      .attr("y", dimension.chartBottomY + (maxLength*25))
      .attr("x", dimension.chartTopX + (xDistance/2))
      .text(metadata.label1)
      .style("font-weight", "bold")
      .style("font-size", "19px");
};

multiBarGraph.displayYAxisDescription = function(group, dimension, yDistance, metadata) {
      var y_axis_label = group.append("g").attr("class", "y_axis_label")
      var y_label = y_axis_label.append("text")
      .attr("class", "y_axis_label")
      .attr("y", dimension.chartTopY + (yDistance/2))
      .attr("x", 25)
      .text("values")
      .style("font-weight", "bold")
      .style("font-size", "19px");  
} 

multiBarGraph.displayValue = function(percentageGroups , data , xDistance , chartBottomY , yScale, chartTopX){
      var barCount = Object.keys(data[0]).length-1;

      var firstGroup = percentageGroups.append("g");
      firstGroup.selectAll("text").data(data).enter().append("svg:text")
            .text(function(d) { return d.value2;})
            .attr("class", "tick-label")
            .attr("y", function(d) { return chartBottomY - yScale(d.value2) - 10})
            .attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.2)); });

      if(barCount < 2) return;
      var secondGroup = percentageGroups.append("g");
      secondGroup.selectAll("text").data(data).enter().append("svg:text")
            .text(function(d) { return d.value3;})
            .attr("class", "tick-label")
            .attr("y", function(d) { return chartBottomY - yScale(d.value3) - 10})
            .attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.2))+40; });
      
      if(barCount < 3) return;
      var thirdGroup = percentageGroups.append("g");
      thirdGroup.selectAll("text").data(data).enter().append("svg:text")
            .text(function(d) { return d.value4;})
            .attr("class", "tick-label")
            .attr("y", function(d) { return chartBottomY - yScale(d.value4) - 10})
            .attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.2)) + 80; });
}

multiBarGraph.drawIndex = function(group , metadata , chartBottomX , chartTopY){
      var keys = Object.keys(metadata).slice(1);
      var labels = group.append("g").attr("id","labels");
      labels.selectAll("text").data(keys).enter().append("svg:text")
            .text(function(d , i) { return metadata[d]; } )
            .attr("x",chartBottomX + 100)
            .attr("y",function(d, i) { return chartTopY + i*30 + 13; })
            .style("font-size", "20px");

      var colors = ["#00b3dc" , "#DEB887" , "#7B68EE"].slice(0,keys.length);
      
      var labelsColors = group.append("g").attr("id","labels-colors");
      labelsColors.selectAll("rect").data(colors).enter().append("rect")
            .attr("x",chartBottomX + 50)
            .attr("y",function(d, i) { return chartTopY + i*30; })
            .attr("width", 25)
            .attr("height", 15)
            .style("fill" , function(d) { return d; });
}

multiBarGraph.draw = function(data, metadata) {
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

      var percentageGroups = group.append("g").attr("class", "percentage")
      this.displayValue(percentageGroups , data , xDistance , dimension.chartBottomY ,yScale, dimension.chartTopX);

      this.drawIndex(group , metadata , dimension.chartBottomX , dimension.chartTopY);
};
