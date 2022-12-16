var svgImgs = Twitter
    .append("image")
    .attr("xlink:href", `../fetch_data/TwitterData/wordCloud/wc-${nation}-${year}.png`)
    .attr("width", 480)
    .attr("height", 240)
    .attr("y", 5)
    .attr("x", 10);