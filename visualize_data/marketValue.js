// var width = 630;
// var height = 690;
var marketvalue_r_max = 70;

var tooltip = d3.select("body").append("div").attr("class", "tooltip");

var positionName = ["GK", "DF", "MF", "FW"];
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

display_marketValue(year, nation);
function display_marketValue(year, nation){
    var testData = [
    {
        year: "2022",
        name: "Alisson",
        position: "GK",
        age: "30",
        value: "50m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/4/4f/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_850_1625.jpg/460px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_850_1625.jpg",
    },
    {
        year: "2022",
        name: "Ederson",
        position: "GK",
        age: "29",
        value: "45m€",
        image:"https://upload.wikimedia.org/wikipedia/commons/thumb/0/0a/Ederson.png/400px-Ederson.png",
    },
    {
        year: "2022",
        name: "Weverton",
        position: "GK",
        age: "34",
        value: "3.5m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/1/1e/Brasil_estreia_contra_a_África_do_Sul_no_Mané_Garrincha_—_копия_%285%29.jpg",
    },
    {
        year: "2022",
        name: "Marquinhos",
        position: "DF",
        age: "28",
        value: "70m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/8/8c/Brasil_conquista_primeiro_ouro_ol%C3%ADmpico_nos_penaltis_1039278-20082016-_mg_4916_%28cropped%29.jpg/400px-Brasil_conquista_primeiro_ouro_ol%C3%ADmpico_nos_penaltis_1039278-20082016-_mg_4916_%28cropped%29.jpg",
    },
    {
        year: "2022",
        name: "Éder Militão",
        position: "DF",
        age: "24",
        value: "60m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Eder_Militao_2021.jpg/400px-Eder_Militao_2021.jpg",
    },
    {
        year: "2022",
        name: "Fabinho",
        position: "MF",
        age: "29",
        value: "55m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/d/dc/Fabinho_%2843934382122%29_%28cropped%29.jpg/400px-Fabinho_%2843934382122%29_%28cropped%29.jpg",
    },
    {
        year: "2022",
        name: "Fred",
        position: "MF",
        age: "29",
        value: "20m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/3/38/Fred_Brazil.jpg/500px-Fred_Brazil.jpg",
    },
    {
        year: "2022",
        name: "Vinicius Junior",
        position: "FW",
        age: "22",
        value: "120m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/f/f3/Vinicius_Jr_2021.jpg/400px-Vinicius_Jr_2021.jpg",
    },
    {
        year: "2022",
        name: "Neymar",
        position: "FW",
        age: "30",
        value: "75m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/thumb/6/65/20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg/460px-20180610_FIFA_Friendly_Match_Austria_vs._Brazil_Neymar_850_1705.jpg",
    },
    {
        year: "2022",
        name: "Richarlison",
        position: "FW",
        age: "25",
        value: "50m€",
        image:
        "https://upload.wikimedia.org/wikipedia/commons/5/5b/07_07_2019_Final_da_Copa_América_2019_%2848226557731%29_%28cropped%29.jpg",
    },
    ];

    marketValue
    .append("text")
    .attr("class", "position")
    .attr("text-anchor", "end")
    .attr("x", width[0])
    .attr("y", height[0] - 40)
    .text("Position");

    marketValue
    .append("text")
    .attr("class", "Age")
    .attr("text-anchor", "end")
    .attr("y", 25)
    .attr("transform", "rotate(-90)")
    .text("Age (years)");

    var positionScale = d3
    .scaleBand()
    .domain(positionName)
    .range([0, width[0] - 80]);

    var ageScale = d3
    .scaleLinear()
    .domain([10, 45])
    .range([height[0] - 30, 20]);

    var valueScale = d3.scaleLinear().domain([1, 2e8]).range([10, marketvalue_r_max]);

    var positionAxis = d3.axisBottom(positionScale);
    var ageAxis = d3.axisLeft(ageScale);

    marketValue
    .append("g")
    .attr("class", "positionAxis")
    .attr("fill", "black")
    .attr("stroke", "none")
    .attr("transform", "translate(50," + (height[0] - 30) + ")")
    .call(positionAxis);
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
    .attr("fill", "lightblue")
    .attr("stroke", "black")
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
    .call(position)
    .sort(order);

    marketValue.call(
    d3
        .drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended)
    );
    

    var drag_delta;
    var drag_threshold = 0.01;
    function dragstarted() {
    drag_delta = 0;
    }
    function dragged(event){
    drag_delta += event.dx;
    if(drag_delta != 0){
        var next_circle_r = marketvalue_r_max + drag_delta * drag_threshold;
        if(next_circle_r < 70) next_circle_r = 70;
        else if(next_circle_r > 200) next_circle_r = 200;
        marketvalue_r_max = next_circle_r;
        valueScale = d3.scaleLinear().domain([1, 2e8]).range([10, marketvalue_r_max]);
        valueCircle.call(position);
    }
    }
    function dragended() {}

    function position(p) {
    p.attr("cx", function (d) {
        //console.log(positionScale(d.position));
        return positionScale(d.position) + 120; //データのポジション名が違うなら、それに合わせて辞書型を作る
    });
    p.attr("cy", function (d) {
        return ageScale(d.age); //同上
    });
    p.attr("r", function (d) {
        //console.log(valueStrToNum(d.value));
        return valueScale(valueStrToNum(d.value));
    });
    }

    function order(a, b) {
    return valueStrToNum(b.value) - valueStrToNum(a.value);
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
}