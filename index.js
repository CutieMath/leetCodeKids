// ========================
// Method to spin the wheel
// ========================
let spinner = document.querySelector("#spinner");
let btn = document.getElementById("start");
let number = Math.ceil(Math.random() * 3000);
btn.onclick = function(){
    spinner.style.transform = "rotate(" + number + "deg)";
    number += Math.ceil(Math.random() * 3000);
}


// =============
// D3 Pie chart. 
// Docs: 
// https://www.d3-graph-gallery.com/graph/pie_annotation.html
// https://www.d3-graph-gallery.com/graph/pie_changeData.html
// ========================


// set the dimensions and margins of the graph
const width = 600,
      height = 600,
      margin = 20;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin


const pie = d3.pie()
.value(function(d) {return d[1]})

var local = d3.local();

// append the svg object to the div called 'my_dataviz'
const svg = d3.select("#spinner")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);



// Create dataset
const data1 = {a: 9, b: 20}
var data = [];
const portion = 10;
d3.select("body")
    .on("keydown", function() {
      if(d3.event.keyCode == 188){
        var inputString = d3.select("#user-input").node().value;
        var inputArr = inputString.split(',');
        var currName = inputArr[inputArr.length - 1]; 
        data[currName] = 10;
        // call the function to create the pie
        update(data);
      }

      if(d3.event.keyCode == 13){
        setNames();
      }

    });


// set the color scale
const color = d3.scaleOrdinal()
    .range(["#FFDFD3", "#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8"])


var arc = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)


function update(data) {

  // Compute the position of each group on the pie:
  var pie = d3.pie()
    .value(function(d) {return d.value; })
    .sort(function(a, b) { return d3.ascending(a.key, b.key);} ) // This make sure that group order remains the same in the pie chart
  var data_ready = pie(d3.entries(data))

  // map to data
  var u = svg.selectAll("path")
    .data(data_ready)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  u
    .enter()
    .append('path')
    .each(function(d){
      local.set(this, d)
    })
    .merge(u)
    .transition()
    .duration(1000)
    .attrTween('d', function(d) {
      var i = d3.interpolate(local.get(this), d);
      local.set(this, i(0));
      return function(t) {
        return arc(i(t));
      };
    })
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "white")
    .style("stroke-width", "5px")
    .style("opacity", 0.7)    

};


function setNames(){
  // Compute the position of each group on the pie:
  var pie = d3.pie()
  .value(function(d) {return d.value; })
  var data_ready = pie(d3.entries(data))
  // Now I know that group A goes from 0 degrees to x degrees and so on.

  // shape helper to build arcs:
  var arcGenerator = d3.arc()
  .innerRadius(0)
  .outerRadius(radius)

  // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
  svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('path')
    .attr('d', arcGenerator)
    .attr('fill', function(d){ return(color(d.data.key)) })
    .attr("stroke", "black")
    .style("stroke-width", "2px")
    .style("opacity", 0)

  // Now add the annotation. Use the centroid method to get the best coordinates
  svg
  .selectAll('mySlices')
  .data(data_ready)
  .enter()
  .append('text')
  .text(function(d){ return d.data.key})
  .attr("transform", function(d) { return "translate(" + arcGenerator.centroid(d) + ")";  })
  .style("text-anchor", "middle")
  .style("font-size", 25)
  .style("fill", "white")
}