var svgImgs = Twitter
    .append("image")
    .attr("xlink:href", `../fetch_data/TwitterData/wordCloud/wc-${nation}-${year}.png`)
    .attr("width", 350)
    .attr("height", 230)
    .attr("y", 10)
    .attr("x", 10);