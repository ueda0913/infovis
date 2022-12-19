var toolbox = d3.select("body").append("div").attr("class", "toolbox");
var nodesData = [];
var linksData = [];
var region_dist = [{ sum: 0.0, num: 0 }, { sum: 0.0, num: 0 }, { sum: 0.0, num: 0 }, { sum: 0.0, num: 0 }, { sum: 0.0, num: 0 }, { sum: 0.0, num: 0 }];

d3.csv(`../dataset/nations_data/distance${year}.csv`/*`distance${year}.csv`*/).then(function (data) {
  data.forEach(function (d) {
    region_dist[parseInt(d.region_num)].sum += parseFloat(d.distance);
    region_dist[parseInt(d.region_num)].num += 1;
    nodesData.push({
      "index": i,
      "group": parseInt(d.region_num),
      "name": d.nation,
      "distance": parseFloat(d.distance),
      "national_flag": d.national_flag,
      "surporter": parseFloat(d.surporter),
      "x": width[2] / 4 + width[2] / 2 * Math.random(),
      "y": height[2] / 4 + width[2] / 2 * Math.random(),
      "r": parseFloat(d.surporter)
    });
  });
  console.log(nodesData);

  var i = 0;  // 中心ノード
  for (var j = i + 1; j < nodesData.length; j++) {
    linksData.push({
      "source": i,
      "target": j,
      "l": nodesData[j].distance / 113 + 5 + nodesData[i].r + nodesData[j].r
    });
  }
  console.log(linksData);


  // 2. svg要素を配置
  var link = d3.select("svg")
    .selectAll("line")
    .data(linksData)
    .enter()
    .append("line")
    .attr("stroke-width", 1)
    .attr("stroke", "black");

  var color = d3.scaleOrdinal()
    .domain([0, 1, 2, 3, 4, 5])
    .range(["white", "green", "black", "red", "blue", "yellow"])

  var tooltip2 = d3.select("body").append("div").attr("class", "tooltip2");
  var node = d3.select("svg")
    .selectAll("circle")
    .data(nodesData)
    .enter()
    .append("circle")
    .attr("r", function (d) { return d.r })
    .attr("opacity", function (d) { if (d.name != nation) return 0.5 })
    .attr("fill", function (d) { return color(d.group) })
    .attr("stroke", "black")
    .on("mouseover", function (event, d, i) {
      tooltip2
        .style("visibility", "visible")
        .html(function () {
          if (d.name == "スイス") {
            return d.name + "<br>" + `<img src=${d.national_flag}  width="40" height="40" >`;
          }
          else {
            return d.name + "<br>" + `<img src=${d.national_flag}  width="65" height="40" >`
          }
        })
    })
    .on("mousemove", function (event, d, i) {
      tooltip2
        .style("top", (event.pageY - 20) + "px")
        .style("left", (event.pageX + 10) + "px");
    })
    .on("mouseout", function (event, d, i) {
      tooltip2.style("visibility", "hidden");
    });

  var x = d3.scaleOrdinal()
    .domain([0, 1, 2, 3, 4, 5])
    .range([0, 1.0 * region_dist[1].sum / region_dist[1].num, 0.31 * region_dist[2].sum / region_dist[2].num, -0.81 * region_dist[3].sum / region_dist[3].num, -0.81 * region_dist[4].sum / region_dist[4].num, 0.31 * region_dist[5].sum / region_dist[5].num])

  var y = d3.scaleOrdinal()
    .domain([0, 1, 2, 3, 4, 5])
    .range([0, 0.0 * region_dist[1].sum / region_dist[1].num, 0.95 * region_dist[2].sum / region_dist[2].num, 0.58 * region_dist[3].sum / region_dist[3].num, -0.58 * region_dist[4].sum / region_dist[4].num, -0.95 * region_dist[5].sum / region_dist[5].num])

  var guide

  // 3. forceSimulation設定
  var simulation = d3.forceSimulation()
    .force("link",
      d3.forceLink()
        .distance(function (d) { return d.l; })
        .strength(1.5)
        .iterations(16))
    .force("collide",
      d3.forceCollide()
        .radius(function (d) { return d.r; })
        .strength(0.7)
        .iterations(16))
    .force("charge", d3.forceManyBody().strength(-250))
    .force("x", d3.forceX().strength(0.1).x(function (d) { return width[2] / 2 }))
    .force("y", d3.forceY().strength(0.1).y(function (d) { return height[2] / 2 }));

  simulation
    .nodes(nodesData)
    .on("tick", ticked);

  simulation.force("link")
    .links(linksData)
    .id(function (d) { return d.index; });

  // 4. forceSimulation 描画更新用関数
  function ticked() {
    link
      .attr("x1", function (d) { return d.source.x; })
      .attr("y1", function (d) { return d.source.y; })
      .attr("x2", function (d) { return d.target.x; })
      .attr("y2", function (d) { return d.target.y; });
    node
      .attr("cx", function (d) { return d.x; })
      .attr("cy", function (d) { return d.y; });
  }

  //一番最初に出てくる境界円表示

  var def_border_circle;

  function Create_border_circle() {
    toolbox
      .style("visibility", "hidden");
    const d = nodesData.find((tar) => tar.name === nation);
    //console.log(event.target.className.baseVal);
    var centerNode = nodesData.find((e) => e.index === 0);  //中心のNode
    var circle_r = Math.sqrt(((d.x - centerNode.x) ** 2) + (d.y - centerNode.y) ** 2);
    def_border_circle = d3
      .select("svg")
      .append("circle")
      .attr("class", "selected")
      .attr("cx", centerNode.x)
      .attr("cy", centerNode.y)
      .attr("stroke", "black")
      .attr("opacity", 0.1)
      .attr("stroke-width", 1)
      .attr("r", circle_r);
    def_border_circle
      .style("visibility", "visible")
    // .style("pointer-events", "none")
    if (d.index !== 0) {
      toolbox
        .style("visibility", "visible")
        .html(
          "国名 : " +
          d.name +
          "<br>開催国との距離 : " +
          d.distance + "(km)"
        );

    }
  }


  //安定するまで待機させる関数
  function sleep(waitSec, callbackFunc) {

    var spanedSec = 0;

    var waitFunc = function () {

      spanedSec++;

      if (spanedSec >= waitSec) {
        if (callbackFunc) callbackFunc();
        return;
      }

      clearTimeout(id);
      id = setTimeout(waitFunc, 1000);

    };

    var id = setTimeout(waitFunc, 1000);

  }
  sleep(1.5, function () {
    Create_border_circle()
  });

  d3.select("svg").selectAll("circle").on("click", function (event, d) {
    window.location.href = `./subpage.html?nation=${d.name}&year=${year}`;
  })

  var legand = nationMap.append("rect")
    .attr("x", 310)
    .attr("height", 130)
    .attr("width", 90)
    .attr("fill", "none")
    .attr("stroke-width", 1)
    .attr("stroke", "black")

  var region = d3.scaleOrdinal()
    .domain([0, 1, 2, 3, 4, 5])
    .range(["開催国", "ヨーロッパ", "アジア", "南米", "アフリカ", "北中米カリブ海"])

  for (var i = 0; i < 6; i++) {
    nationMap.append("circle")
      .attr("fill", color(i))
      .attr("cx", 320)
      .attr("cy", 15 + i * 20)
      .attr("r", 4)
      .attr("stroke-width", 1)
      .attr("stroke", "black");

    nationMap.append("text")
      .attr("x", 340)
      .attr("y", 15 + i * 20)
      .attr("font-size", 8)
      .text(region(i));
  }
})
