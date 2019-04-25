var dist14 = {
    labels: [
        '< 10K', '$10-20K', '$20-30K', '$30-40K', '$40-50K', '$50-60K',
        '$60-70K', '$70-80K', '$80-90K', '$90-100K', '$100K-110',
        '$110-120', '$120-130', '$130-140', '$140-150', '$150-160',
        '$160-170', '$170-180', '$180-190', '$190-200K', '$200K+'
    ],
    series: [
      {
        label: 'US_average',
        values: [0.136, 0.151, 0.149, 0.131, 0.103, 0.079, 0.06 , 0.043, 0.032,
            0.022, 0.022, 0.01 , 0.013, 0.007, 0.005, 0.007, 0.003, 0.003,
            0.002, 0.001, 0.02 ]
      },
      {
        label: 'Computer Programer',
        values: [0.037, 0.038, 0.031, 0.046, 0.064, 0.086, 0.108, 0.112, 0.103,
            0.094, 0.1  , 0.043, 0.043, 0.02 , 0.016, 0.017, 0.01 , 0.005,
            0.006, 0.005, 0.017]
      },]
  };

  var dist15 = {
    labels: [
        '< 10K', '$10-20K', '$20-30K', '$30-40K', '$40-50K', '$50-60K',
        '$60-70K', '$70-80K', '$80-90K', '$90-100K', '$100K-110',
        '$110-120', '$120-130', '$130-140', '$140-150', '$150-160',
        '$160-170', '$170-180', '$180-190', '$190-200K', '$200K+'
    ],
    series: [
      {
        label: 'US_average',
        values: [0.13 , 0.146, 0.149, 0.131, 0.103, 0.08 , 0.061, 0.044, 0.034,
            0.023, 0.023, 0.011, 0.013, 0.007, 0.005, 0.008, 0.003, 0.003,
            0.003, 0.001, 0.021]
      },
      {
        label: 'Computer Programer',
        values: [0.026, 0.032, 0.035, 0.041, 0.062, 0.093, 0.103, 0.105, 0.104,
            0.108, 0.095, 0.049, 0.05 , 0.021, 0.015, 0.019, 0.01 , 0.005,
            0.004, 0.004, 0.019]
      },]
  };

  var dist16 = {
    labels: [
        '< 10K', '$10-20K', '$20-30K', '$30-40K', '$40-50K', '$50-60K',
        '$60-70K', '$70-80K', '$80-90K', '$90-100K', '$100K-110',
        '$110-120', '$120-130', '$130-140', '$140-150', '$150-160',
        '$160-170', '$170-180', '$180-190', '$190-200K', '$200K+'
    ],
    series: [
      {
        label: 'US_average',
        values: [0.124, 0.14 , 0.147, 0.131, 0.104, 0.081, 0.063, 0.045, 0.035,
            0.024, 0.025, 0.012, 0.014, 0.007, 0.006, 0.008, 0.004, 0.003,
            0.003, 0.001, 0.022]
      },
      {
        label: 'Computer Programer',
        values: [0.031, 0.029, 0.032, 0.052, 0.064, 0.069, 0.102, 0.103, 0.105,
            0.095, 0.093, 0.053, 0.053, 0.025, 0.022, 0.024, 0.012, 0.006,
            0.007, 0.001, 0.021]
      },]
  };

  function update_2(data){
    d3.selectAll('.wage_dist_graph rect')
    .transition()
    .duration(1000)
    .style('opacity',0);

    d3.selectAll('.wage_dist_graph text')
    .transition()
    .duration(1000)
    .style('opacity',0);
    

    const margin = 120;


  var chartHeight       = 600 - 2 * margin;
      barWidth        = 16;
      groupWidth      = barWidth * data.series.length,
      gapBetweenGroups = 10,
      spaceForLabels   = 150;
    
const svg = d3.select('.wage_dist_graph');
const chart = svg.append('g')
      .attr('transform', `translate(${margin}, ${margin})`);
  
  // Zip the series data together (first values, second values, etc.)
  var zippedData = [];
  for (var i=0; i<data.labels.length; i++) {
    for (var j=0; j<data.series.length; j++) {
      zippedData.push(data.series[j].values[i]);
    }
  }
  

  // Color scale
  var color = d3.scaleOrdinal(d3.schemeCategory10);
  var chartWidth = barWidth * zippedData.length + gapBetweenGroups * data.labels.length;
  
  var yScale = d3.scaleLinear()
      .domain([0, d3.max(zippedData)])
      .range([chartHeight,0]);
  
  var xScale = d3.scaleLinear()
      .domain([0, d3.range(42)])
      .range([0,chartWidth + gapBetweenGroups]);
  
  var xAxis = d3.axisBottom()
      .scale(xScale)
      .tickFormat('')
      .tickSize(0);
      

  var yAxis = d3.axisLeft()
      .scale(yScale)
      .tickFormat('')
      .tickSize(10, 0, 0);
  // Specify the chart area and dimensions

      //.attr("width", spaceForLabels + chartWidth + spaceForLegend)
      //.attr("height", chartHeight);
  
  // Create bars
  var bar = chart.selectAll("g")
      .data(zippedData)
      .enter().append("g")
      .attr("transform", function(d, i) {
        return "translate("+ (i * barWidth + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length))) +  "," + spaceForLabels + ")";
      });
  
  // Create rectangles of the correct width
  bar.append("rect")
        .attr("y", function(d) {
        return chartHeight-spaceForLabels - d/d3.max(zippedData)*chartHeight;
        })
      .attr("fill", function(d,i) { return color(i % data.series.length); })
      .attr("class", "bar")
      .attr("width", barWidth - 1)
      .attr("height", function(d) {
        return d/d3.max(zippedData)*chartHeight;
        })
        .on("mouseover", function(d,i) {

            //Get this bar's x/y values, then augment for the tooltip
            var xPosition = i * barWidth + gapBetweenGroups * (0.5 + Math.floor(i/data.series.length));
            var yPosition =   0.1/d3.max(zippedData)*chartHeight;

            //Create the tooltip label
            chart.append("text")
               .attr("id", "tooltip")
               .attr("x", xPosition)
               .attr("y", yPosition)
               .attr("text-anchor", "middle")
               .attr("font-family", "sans-serif")
               .attr("font-size", "11px")
               .attr("font-weight", "bold")
               .attr("fill", "black")
               .text(d);

       })
       .on("mouseout", function() {
       
            //Remove the tooltip
            d3.select("#tooltip").remove();
            
       });
  
  // Add text label in bar
  bar.append("text")
      .attr("y", function(d) { return  chartHeight-spaceForLabels - d/d3.max(zippedData)*chartHeight+20; })
      .attr("fill", "red")
      .attr("dx", "0.5em")
      .text(function(d) { 
        if(d>0.1)  
            return d; })
      .attr('text-anchor','middle');
  
  // Draw labels
  /*chart.append("text")
      .attr('class', 'label')
      .attr("y", margin /2.62)
      .attr("x",-(chartHeight / 2) - 1.2*margin)
      .attr("transform", "rotate(-90)")
      .style("text-anchor", "middle")
      .text("Share");      
*/

  bar.append("text")
      .attr("class", "label")
      //.attr("x", function(d,i) { return 0; })
      .attr("y", chartHeight-130)
      .attr("dx", "-7.5em")
      .text(function(d,i) {
        if (i % data.series.length === 0)
          return data.labels[Math.floor(i/data.series.length)];
        else
          return ""})
       .attr('transform', 'rotate(-25)');
  
  chart.append("g")
        .attr("class", "x axis")
        .attr("transform", "translate(0," + chartHeight + ")")
        .call(xAxis);
  /*chart.append("g")
        .attr("class", "y axis")
        .attr("transform", "translate(0,0")
        .call(yAxis);
        */
  // Draw legend
  var legendRectSize = 18,
      legendSpacing  = 4;
  
  var legend = chart.selectAll('.legend')
      .data(data.series)
      .enter()
      .append('g')
      .attr('transform', function (d, i) {
          var height = legendRectSize + legendSpacing;
          var offset = -gapBetweenGroups/2;
          var horz = chartWidth-spaceForLabels ;
          var vert = i * height - offset;
          return 'translate(' + horz + ',' + vert + ')';
      });
  
  legend.append('rect')
      .attr('width', legendRectSize)
      .attr('height', legendRectSize)
      .style('fill', function (d, i) { return color(i); })
      .style('stroke', function (d, i) { return color(i); });
  
  legend.append('text')
      .attr('class', 'legend')
      .attr('x', legendRectSize + legendSpacing)
      .attr('y', legendRectSize - legendSpacing)
      .text(function (d) { return d.label; });


      chart.append('text')
    .attr('class', 'label')
    .attr('x', chartWidth / 2 )
    .attr('y', chartHeight + margin * 0.7)
    .attr('text-anchor', 'middle')
    .text('wage bin')

    chart.append('text')
    .attr('class', 'title')
    .attr('x', chartWidth / 2 )
    .attr('y', -margin/2)
    .attr('text-anchor', 'middle')
    .text('Wage Distribution')

    chart.append('text')
    .attr('class', 'source')
    .attr('x', chartWidth  )
    .attr('y', chartHeight + margin * 0.7)
    .attr('text-anchor', 'start')
    .text('Source: DataUSA')
    }

    update_2(dist14)
