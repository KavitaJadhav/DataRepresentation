function barGraph(data, metadata) {
      var svgContainer = d3.select("body").append("svg").attr("width",1100).attr("height",1100); 
      
      var maxValue = data.reduce(function(obj, result) {
            if(obj.value > result.value) return obj;
            return result;
      }).value;
      maxValue = (maxValue%20) > 0 ? maxValue + (20-(maxValue%20)) : maxValue;
      var chartTopX = metadata['y'].length * 10 + 25 + (maxValue.toString().length * 10);
      var chartTopY = 100;
      var chartBottomX = chartTopX + (data.length * 40) + (data.length * 10);
      var chartBottomY = 500;
     
      var numOfTicks = 5;
      var yDistance = chartBottomY - chartTopY;
      var xDistance = chartBottomX - chartTopX;
      var group = svgContainer.append("g");

      var lineGroup = group.append("g").attr("class", "line");
      //y axis
      lineGroup.append("line").attr("x1", chartTopX).attr("y1", chartBottomY).attr("x2", chartBottomX + 40).attr("y2", chartBottomY)
      .attr("stroke","black");
      //x axis
      lineGroup.append("line").attr("x1", chartTopX).attr("y1", chartBottomY).attr("x2", chartTopX).attr("y2", chartTopY - 20)
      .attr("stroke", "black");
      
      var xLabelsGroups = group.append("g").attr("class", "x-labels")
      var years = xLabelsGroups.selectAll("text").data(data).enter().append("svg:text")
      .text(function(d) { return d.label;}).attr("class", "tick-label")
      .attr("y", chartBottomY + 20).attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.5)); });

      var yLabelsGroups = group.append("g").attr("class", "y-labels");
      var interval = [];
      for(i = 0; i < numOfTicks; i++) 
      interval.push((maxValue/(numOfTicks-1))*i);
      var value = yLabelsGroups.selectAll("text").data(interval).enter().append("svg:text")
      .text(function(d) {return d;})
      .attr("x", chartTopX - maxValue.toString().length * 10)
      .attr("y", function(d, i) { return chartBottomY - (yDistance/(numOfTicks - 1)*i);});
      
      var yScale = d3.scale.linear().domain([0, maxValue]).range([0, yDistance]);
      var barGroup = group.append("g").attr("class", "bars");
      barGroup.selectAll("rect").data(data).enter().append("rect")
      .attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.5)); })
      .attr("y", function(d) { return chartBottomY - yScale(d.value); })
      .attr("width", 40).attr("height", function(d) { return yScale(d.value); })
      .style("fill", "#00b3dc").text();

      var percentageGroups = group.append("g").attr("class", "percentage")
      var percentage = percentageGroups.selectAll("text").data(data).enter().append("svg:text")
      .text(function(d) { return d.label;}).attr("class", "tick-label")
      .attr("y", function(d) { return chartBottomY - yScale(d.value) - 10})
      .attr("x", function(d, i) { return chartTopX + ((xDistance/(data.length))*(i+0.5)); }).text(function(d) { return d.value});

      var x_axis_label = group.append("g").attr("class", "x_axis_label")
      var x_label = x_axis_label.append("text")
      .attr("class", "x_axis_label")
      .attr("y", chartBottomY + 70)
      .attr("x", chartTopX + (xDistance/2))
      .text(metadata.x)
      .style("font-weight", "bold");

      var y_axis_label = group.append("g").attr("class", "y_axis_label")
      var y_label = y_axis_label.append("text")
      .attr("class", "y_axis_label")
      .attr("y", chartTopY + (yDistance/2))
      .attr("x", 25)
      .text(metadata.y)
      .style("font-weight", "bold");
};