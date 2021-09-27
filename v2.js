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
// Doc: https://www.d3-graph-gallery.com/graph/pie_annotation.html
// ========================


// set the dimensions and margins of the graph
const width = 600,
      height = 600,
      margin = 20;

// The radius of the pieplot is half the width or half the height (smallest one). I subtract a bit of margin.
const radius = Math.min(width, height) / 2 - margin

// set the color scale
const color = d3.scaleOrdinal()
    .range(["#FFDFD3", "#E0BBE4", "#957DAD", "#D291BC", "#FEC8D8"])

    

// get customer input as pie element
var data = [];
const portion = 10;

const pie = d3.pie()
.value(function(d) {return d[1]})


// append the svg object to the div called 'my_dataviz'
const svg = d3.select("#spinner")
  .append("svg")
    .attr("width", width)
    .attr("height", height)
  .append("g")
    .attr("transform", `translate(${width / 2}, ${height / 2})`);

d3.select("body")
    .on("keydown", function(e) {
      if(e.keyCode == 188){
        var inputString = d3.select("#user-input").node().value;
        var inputArr = inputString.split(',');
        var currName = inputArr[inputArr.length - 1]; 
        data[currName] = 10;

        // Compute the position of each group on the pie:
        const data_ready = pie(Object.entries(data))
        // Now I know that group A goes from 0 degrees to x degrees and so on.

        // shape helper to build arcs:
        const arcGenerator = d3.arc()
        .innerRadius(0)
        .outerRadius(radius)

        // Build the pie chart: Basically, each part of the pie is a path that we build using the arc function.
        svg
        .selectAll('mySlices')
        .data(data_ready)
        .join('path')
          .attr('d', arcGenerator)
          .attr('fill', function(d){ return(color(d.data[0])) })
          .attr("stroke", "white")
          .style("stroke-width", "2px")
          // .style("opacity", 0.7)

        // Now add the annotation. Use the centroid method to get the best coordinates
        svg
        .selectAll('mySlices')
        .data(data_ready)
        .join('text')
        .text(function(d){ return d.data[0]})
        .attr("transform", function(d) { return `translate(${arcGenerator.centroid(d)})`})
        .style("text-anchor", "middle")
        .style("font-size", 25)
        .style("fill", "white")
      }
    });