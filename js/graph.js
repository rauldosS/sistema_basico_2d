// Set graph
var width = 700,
    height = 700,
    padding = 100;

// create an svg container
var vis = d3.select("#graph")
    .append("svg:svg")
    .attr("width", width)
    .attr("height", height);

var xScale = d3.scale.linear().domain([10, -10]).range([width - padding, padding]);
var yScale = d3.scale.linear().domain([-10, 10]).range([height - padding, padding]);

// define the y axis
var yAxis = d3.svg.axis()
    .orient("left")
    .scale(yScale);

// define the y axis
var xAxis = d3.svg.axis()
    .orient("bottom")
    .scale(xScale);

var xAxisPlot = vis.append("g")
    .attr("class", "axis axis--x")
    .attr("transform", "translate(0," + (height / 2) + ")")
    .call(xAxis.tickSize(-height, 0, 0));

var yAxisPlot = vis.append("g")
    .attr("class", "axis axis--y")
    .attr("transform", "translate(" + (width / 2) + ",0)")
    .call(yAxis.tickSize(-width, 0, 0));


xAxisPlot.selectAll(".tick line")
    .attr("y1", (width - (2 * padding)) / 2 * -1)
    .attr("y2", (width - (2 * padding)) / 2 * 1);

yAxisPlot.selectAll(".tick line")
    .attr("x1", (width - (2 * padding)) / 2 * -1)
    .attr("x2", (width - (2 * padding)) / 2 * 1);