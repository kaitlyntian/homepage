var data = [
  { language: "Python", skill_level: 8 },
  { language: "SQL", skill_level: 9 },
  { language: "Java", skill_level: 7 },
  { language: "JavaScript", skill_level: 6 },
  { language: "HTML/CSS", skill_level: 7 },
  { language: "TABLEAU", skill_level: 9 },
  { language: "AWS Services", skill_level: 5 },
];

//sort bars based on value
data = data.sort(function (a, b) {
  return d3.ascending(a.skill_level, b.skill_level);
});

// margin for the graph
var margin = {
  top: 15,
  right: 25,
  bottom: 15,
  left: 200,
};

//width and height variable
var width = 900 - margin.left - margin.right,
  height = 500 - margin.top - margin.bottom;

var svg = d3
  .select("#graphic")
  .append("svg")
  .attr("width", width + margin.left + margin.right)
  .attr("height", height + margin.top + margin.bottom)
  .append("g")
  .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

var x = d3
  .scaleLinear()
  .range([0, width])
  .domain([
    0,
    d3.max(data, function (d) {
      return d.skill_level;
    }),
  ]);

var y = d3
  .scaleBand()
  .range([height, 0])
  .padding(0.1)
  .domain(
    data.map(function (d) {
      return d.language;
    })
  );

var bars = svg
  .selectAll(".bar")
  .data(data)
  .enter()
  .append("g")
  .attr("fill", "#AE989A")
  .append("g");

//append rects
bars
  .append("rect")
  .attr("class", "bar")
  .attr("y", function (d) {
    return y(d.language);
  })
  .attr("height", y.bandwidth())
  .attr("x", 0)
  .attr("width", function (d) {
    return x(d.skill_level);
  });

//add a value label to the right of each bar
bars
  .append("text")
  .attr("class", "label")
  .attr("y", function (d) {
    return y(d.language) + 30;
  })
  .attr("x", function (d) {
    return x(d.skill_level) + 15;
  })
  .text(function (d) {
    return d.skill_level;
  });

svg
  .append("g")
  // .attr("transform", "translate(-70," + 0 + ")")
  .call(d3.axisLeft(y));
