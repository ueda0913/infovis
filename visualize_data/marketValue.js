var valueScale_max = 200;
var color = d3.schemeCategory10;

var tooltip = d3.select("body").append("div").attr("class", "tooltip");

var positionName = ["ゴールキーパー", "ディフェンダー", "ミッドフィールダー", "フォワード"];
var playerData = [];
var comparisonData = [];
var flag = false;
if (comparison_year !== year){
    flag = true;
}

marketValue
    .append("text")
    .attr("class", "value")
    .attr("text-anchor", "end")
    .attr("x", width[0])
    .attr("y", height[0] - 40)
    .text("Market Value (million €)");


marketValue
    .append("text")
    .attr("class", "Age")
    .attr("text-anchor", "end")
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .text("Age (years)");


var ageScale = d3
    .scaleLinear()
    .domain([15, 45])
    .range([height[0] - 30, 20]);

var valueScale = d3
    .scaleLinear()
    .domain([0, valueScale_max])
    .range([0, width[0] - 80]);

var ageAxis = d3.axisLeft(ageScale);
var valueAxis = d3.axisBottom(valueScale).ticks(5, d3.format(",d"));

marketValue
    .append("g")
    .attr("class", "valueAxis")
    .attr("fill", "black")
    .attr("stroke", "none")
    .attr("transform", "translate(50," + (height[0] - 30) + ")")
    .call(valueAxis);

marketValue
    .append("g")
    .attr("class", "ageAxis")
    .attr("fill", "black")
    .attr("stroke", "none")
    .attr("transform", "translate(50, 0)")
    .call(ageAxis);

//軸を最大に合わせて調節すると比較にならない？
var valueCircle;
var valueCircleCom;
d3.csv(`../dataset/player_worth/playerworth${year-1}.csv`).then(function(data){
  console.log(comparisonData)
  data.forEach(function(d){
    if (d.country == nation || d.country == nation.substr(0, 4)){
      playerData.push({
        name: d.name,
        position: d.position,
        age: d.age,
        value: d.worth,
        image: d.image,
        Year: year,
      });
    }
    else if (!flag && (d.country == comparison_nation || d.country == comparison_nation.substr(0, 4))){
        comparisonData.push({
          name: d.name,
          position: d.position,
          age: d.age,
          value: d.worth,
          image: d.image,
          Year: comparison_year,
        });
      }
  });
    console.log(comparisonData)

    valueCircle = marketValue
        .selectAll("circle")
        .data(playerData)
        .enter()
        .append("circle")
        .attr("class", "circle")
        //.attr("fill", "lightblue")
        .attr("fill", function(d, i){
            if (d.position === positionName[0]){
                return color[0];
            } else if (d.position === positionName[1]){
                return color[1];
            } else if (d.position === positionName[2]){
                return color[2];
            } else {
                return color[3];
            }
        })
        .attr("stroke", "black")
        .attr("r", 10)
        .on("mouseover", function (event, d) {
            tooltip
            .style("visibility", "visible")
            .html(
                "選手名 : " +
                d.name +
                "<br>年齢 : " +
                d.age +
                "<br>市場価値 : " +
                d.value/1000000 + "million €" +
                `<br><img src=${d.image}  width="70">`
            );
        })
        .on("mousemove", function (event, d) {
            tooltip
            .style("top", event.pageY - 20 + "px")
            .style("left", event.pageX + 10 + "px");
        })
        .on("mouseout", function (event, d) {
            tooltip.style("visibility", "hidden");
        })
        .call(position);

    if (year === comparison_year){
        valueCircleCom = marketValue
            .selectAll("polygon")
            .data(comparisonData)
            .enter()
            .append("polygon")
            .attr("class", "polygon")
            .attr("points", "10 2.7, 20 20, 0 20")
            //.attr("fill", "lightblue")
            .attr("fill", function(d, i){
                if (d.position === positionName[0]){
                    return color[0];
                } else if (d.position === positionName[1]){
                    return color[1];
                } else if (d.position === positionName[2]){
                    return color[2];
                } else {
                    return color[3];
                }
            })
            .attr("stroke", "black")
            // .attr("height", 20)
            // .attr("width", 20)
            .style("opacity", 0.3)
            .on("mouseover", function (event, d) {
                tooltip
                .style("visibility", "visible")
                .html(
                    "選手名 : " +
                    d.name +
                    "<br>年齢 : " +
                    d.age +
                    "<br>市場価値 : " +
                    d.value/1000000 + "million €" +
                    `<br><img src=${d.image}  width="70">`
                );
            })
            .on("mousemove", function (event, d) {
                tooltip
                .style("top", event.pageY - 20 + "px")
                .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function (event, d) {
                tooltip.style("visibility", "hidden");
            })
            .call(position_comparison);
        
    }
    var legend = marketValue.selectAll(".legend")
        .data(positionName)
        .enter()
        .append('g')
        .attr("class", "legend")
        .attr("transform", function (d, i) {
            return "translate(0," + i * 20 + ")";
        });

    legend.append("circle") 
        .attr("cx", 460)
        .attr("cy", 30)
        .attr("r", 10)
        .attr("fill", function (d, i) {
            return color[i]; 
        });

    legend.append("text")
        .attr("stroke", "none")
        .attr("stroke-width", 2)
        .attr("fill", "black")
        .attr("dominant-baseline", "middle")
        .attr("x", 475)
        .attr("y", 30)
        .text(function(d, i){
            return d;
        });

    if (!flag){
        marketValue.append("text")
            .attr("x", 400)
            .attr("y", 130)
            .text(function(){
                if (comparisonData.length !== 0){
                    return `参照国：${comparison_nation}(${comparison_year})`;
                }else{
                    return "参照国：なし"
                }
            })
    }

    function valueStrToNum(valueStr) {
        var index;
        if (valueStr.indexOf("m") !== -1) {
            index = valueStr.indexOf("m");
            var strAns = valueStr.substr(0, index);
            return Number(strAns) * 1e6;
        } else if (valueStr.indexOf("k") !== -1) {
            index = valueStr.indexOf("k");
            var strAns = valueStr.substr(0, index);
            return Number(strAns) * 1e3;
        } else {
            index = valueStr.indexOf("€");
            var strAns = valueStr.substr(0, index);
            return Number(strAns);
        }
    }

});

if (flag){
    d3.csv(`../dataset/player_worth/playerworth${comparison_year-1}.csv`).then(function(d2){
        console.log(comparisonData)
        d2.forEach(function(d4){
            if (d4.country == comparison_nation || d4.country == comparison_nation.substr(0, 4)){
                comparisonData.push({
                name: d4.name,
                position: d4.position,
                age: d4.age,
                value: d4.worth,
                image: d4.image,
                Year: comparison_year,
                });
            }
        });
        console.log(comparisonData)
        valueCircleCom = marketValue
            .selectAll("polygon")
            .data(comparisonData)
            .enter()
            .append("polygon")
            .attr("class", "polygon")
            .attr("points", "10 2.7, 20 20, 0 20")
            //.attr("fill", "lightblue")
            .attr("fill", function(d, i){
                if (d.position === positionName[0]){
                    return color[0];
                } else if (d.position === positionName[1]){
                    return color[1];
                } else if (d.position === positionName[2]){
                    return color[2];
                } else {
                    return color[3];
                }
            })
            .attr("stroke", "black")
            // .attr("height", 20)
            // .attr("width", 20)
            .style("opacity", 0.3)
            .on("mouseover", function (event, d) {
                tooltip
                .style("visibility", "visible")
                .html(
                    "選手名 : " +
                    d.name +
                    "<br>年齢 : " +
                    d.age +
                    "<br>市場価値 : " +
                    d.value/1000000 + "million €" +
                    `<br><img src=${d.image}  width="70">`
                );
            })
            .on("mousemove", function (event, d) {
                tooltip
                .style("top", event.pageY - 20 + "px")
                .style("left", event.pageX + 10 + "px");
            })
            .on("mouseout", function (event, d) {
                tooltip.style("visibility", "hidden");
            })
            .call(position_comparison);

        console.log(comparisonData.length)
        console.log(valueCircleCom)
        marketValue.append("text")
            .attr("x", 400)
            .attr("y", 130)
            .text(function(){
                if (comparisonData.length !== 0){
                    return `参照国：${comparison_nation} (${comparison_year})`;
                }else{
                    return "参照国：なし"
                }
            });
    
        });
}
    
marketValue.call(
    d3
    .drag()
    .on("start", dragstarted)
    .on("drag", dragged)
    .on("end", dragended)
);

var drag_delta;
function dragstarted() {
    drag_delta = 0;
    console.log(valueCircleCom)
}
function dragged(event){
    var drag_threshold =  0.00000001 * valueScale_max ** 3;
    drag_delta += event.dx;
    if(drag_delta != 0){
        var next_valueScale_max = valueScale_max - drag_delta * drag_threshold;
        if(next_valueScale_max < 10) next_valueScale_max = 10;
        else if(next_valueScale_max > 200) next_valueScale_max = 200;
        valueScale_max = next_valueScale_max;
        valueScale
        .domain([0, valueScale_max]);
        valueAxis = d3.axisBottom(valueScale).ticks(5, d3.format(",d"));
        marketValue.selectAll(".valueAxis").call(valueAxis);
        valueCircle.call(position)
        if (nation !== comparison_nation || year !== comparison_year){
            //console.log(valueCircleCom)
            valueCircleCom.call(position_comparison);
        }
    }
}
function dragended() {};

function position_comparison(p) {
    //console.log(p)
    p.attr("transform", function(d){
        return "translate(" + (valueScale(Number(d.value) / 1000000) + 50) + "," + ageScale(d.age) + ")";
    });
}

    function position(p) {
        //console.log(p)
        p.attr("cx", function (d) {
            return valueScale(Number(d.value) / 1000000) + 50;
        });
        p.attr("cy", function (d) {
            return ageScale(d.age); //同上
        });
    }