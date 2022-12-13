var width = 630;
var height = 250;
// var Twitter = d3
// .select("#Twitter") //ここをid名に変える#を前につける
// .append("div")
// .append("svg")
// .attr("width", width)
// .attr("height", height);

var tooltip = d3.select("body").append("div").attr("class", "tooltip");
var svgImgs = Twitter
    .append("image")
    .attr("xlink:href", "../fetch_data/wc-4.png")
    .attr("width", 350)
    .attr("height", 230)
    .attr("y", 10)
    .attr("x", 10);