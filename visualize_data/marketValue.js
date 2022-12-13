var marketvalue_r_max = 70;

var tooltip = d3.select("body").append("div").attr("class", "tooltip");

var positionName = ["ゴールキーパー", "ディフェンダー", "ミッドフィールダー", "フォワード"];
var playerData = [];
// d3.csv("./marketValue.csv").then(function(data){
//   data.forEach(function(d){
//     if (d.year = year && d.nation == nation){
//       playerData.push({
//         name: d.name,
//         position: d.position,
//         age: d.age,
//         value: d.value,
//         image: d.image,
//       });
//     }
//   })
// })


var testData = [
{
    year: "2022",
    name: "Alisson",
    position: "ゴールキーパー",
    age: "30",
    value: "50m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_850_1625.jpg/460px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_850_1625.jpg",
},
{
    year: "2022",
    name: "Ederson",
    position: "ゴールキーパー",
    age: "29",
    value: "45m€",
    image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ederson.png/400px-Ederson.png",
},
{
    year: "2022",
    name: "Weverton",
    position: "ゴールキーパー",
    age: "34",
    value: "3.5m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/1/1e/Brasil_estreia_contra_a_África_do_Sul_no_Mané_Garrincha_—_копия_%285%29.jpg",
},
{
    year: "2022",
    name: "Marquinhos",
    position: "ディフェンダー",
    age: "28",
    value: "70m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Brasil_conquista_primeiro_ouro_ol%C3%ADmpico_nos_penaltis_1039278-20082016-_mg_4916_%28cropped%29.jpg/400px-Brasil_conquista_primeiro_ouro_ol%C3%ADmpico_nos_penaltis_1039278-20082016-_mg_4916_%28cropped%29.jpg",
},
{
    year: "2022",
    name: "Éder Militão",
    position: "ディフェンダー",
    age: "24",
    value: "60m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Eder_Militao_2021.jpg/400px-Eder_Militao_2021.jpg",
},
{
    year: "2022",
    name: "Fabinho",
    position: "ミッドフィールダー",
    age: "29",
    value: "55m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Fabinho_%2843934382122%29_%28cropped%29.jpg/400px-Fabinho_%2843934382122%29_%28cropped%29.jpg",
},
{
    year: "2022",
    name: "Fred",
    position: "ミッドフィールダー",
    age: "29",
    value: "20m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Fred_Brazil.jpg/500px-Fred_Brazil.jpg",
},
{
    year: "2022",
    name: "Vinicius Junior",
    position: "フォワード",
    age: "22",
    value: "120m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Vinicius_Jr_2021.jpg/400px-Vinicius_Jr_2021.jpg",
},
{
    year: "2022",
    name: "Neymar",
    position: "フォワード",
    age: "30",
    value: "75m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/460px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg",
},
{
    year: "2022",
    name: "Richarlison",
    position: "フォワード",
    age: "25",
    value: "50m€",
    image:
    "https://upload.wikimedia.org/wikipedia/commons/5/5b/07_07_2019_Final_da_Copa_América_2019_%2848226557731%29_%28cropped%29.jpg",
},
];

marketValue
    .append("text")
    .attr("class", "value")
    .attr("text-anchor", "end")
    .attr("x", width[0])
    .attr("y", height[0] - 40)
    .text("Market Value (€)");


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
    .domain([1, 2e8])
    //.range([10, marketvalue_r_max]);
    .range([0, width[0] - 80]);

//var positionAxis = d3.axisBottom(positionScale);
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
.attr("class", "valueAxis")
.attr("fill", "black")
.attr("stroke", "none")
.attr("transform", "translate(50, 0)")
.call(ageAxis);

var valueCircle = marketValue
    .selectAll("circle")
    .data(testData)
    .enter()
    .append("circle")
    .attr("class", "circle")
    //.attr("fill", "lightblue")
    .attr("fill", function(d, i){
        if (d.position === positionName[0]){
            return "red";
        } else if (d.position === positionName[1]){
            return "lightblue";
        } else if (d.position === positionName[2]){
            return "lightgreen";
        } else {
            return "yellow";
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
            d.value +
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

function position(p) {
    p.attr("cx", function (d) {
        return valueScale(valueStrToNum(d.value))+50;
    });
    p.attr("cy", function (d) {
        return ageScale(d.age); //同上
    });
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