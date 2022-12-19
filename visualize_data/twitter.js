d3.csv(`../fetch_data/TwitterData/adjectiveNumber/AdjectiveNum-${year}.csv`).then(function(data){
    adjectiveNum = []
    data.forEach(function(data){
        adjectiveNum.push({
            nation: data.nation,
            adjective: data.adjectiveNum,
        });
    });
    Twitter
        .append("image")
        .attr("xlink:href", `../fetch_data/TwitterData/wordCloud/wc-${nation}-${year}.png`)
        .attr("width", 480)
        .attr("height", 240)
        .attr("y", 5)
        .attr("x", 10);

    Twitter
        .append("image")
        .attr("xlink:href", "twitter_logo.png")
        .attr("width", 50)
        .attr("y", 5)
        .attr("x", (width[1]-60));
    
    var radius = Math.min((width[1]-480), height[1]) / 2 - 10;
    var color = d3.scaleSequential(d3.interpolateRainbow).domain([0, 20]);
    g = Twitter
        .append("g")
        .attr("transform", "translate(" + ((width[1]-480)/2+480) + "," + height[1]/2 + ")");

    var pie = d3.pie()
        .value(function(d) { return d.adjective; });

    var pieGroup = g.selectAll(".pie")
        .data(pie(adjectiveNum))
        .enter()
        .append("g")
        .attr("class", "pie");
    
    arc = d3.arc()
        .outerRadius(radius)
        .innerRadius(0);
     
    pieGroup.append("path")
        .attr("d", arc)
         .attr("fill", function(d) { return color(d.index) })
        //.attr("fill", "red")
        .style("opacity", function(d){
            if(d.data.nation === nation){
                return 1; 
            }else{
                return 0.3;
            }
        })
        .attr("opacity", 0.75)
        .attr("stroke", "white");
    
    var text = d3.arc()
        .outerRadius(radius - 30)
        .innerRadius(radius - 30);
     
    pieGroup.append("text")
        .attr("fill", "black")
        .attr("transform", function(d) { return "translate(" + text.centroid(d) + ")"; })
        .attr("dy", "5px")
        .attr("font", "10px")
        .attr("font-size", "8px")
        .attr("text-anchor", "middle")
        .text(function(d) { 
            if(d.data.nation === nation){
                return d.data.nation; 
            }else{
                return;
            }
        });
    
    Twitter
        .append("text")
        .attr("x", ((width[1]-480)/2+480))
        .attr("y", (height[1]- 40))
        .attr("font-size", "8px")
        .attr("width", 50)
        .attr("text-anchor", "middle")
        .text(`${nation}と他の出場国のtweet数`)
})
