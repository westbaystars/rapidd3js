
var data = [];
var dates = [];
var teamLines = [];
var venues = [];
var width = 900,
    height = 350,
    pad = 20,
    leftPad = 100,
    bottomPad = 70,
    maxPoints = 0;

var x = d3.scale.ordinal().rangeRoundBands([leftPad - pad, width - pad], 0.1);
var y = d3.scale.linear().range([height - bottomPad, pad]);

var parseDate = d3.time.format("%Y-%m-%d").parse;
var dateFormatter = d3.time.format("%b %d");

var xAxis = d3.svg.axis().scale(x).orient("bottom")
  .tickFormat(function(d, i) {
    return dateFormatter(data[i].Date);
  });
var yAxis = d3.svg.axis().scale(y).orient("left");

var svg = d3.select("#results").append("svg")
  .attr("width", width)
  .attr("height", height);

var pointLine = d3.svg.line()
  .x(function(d) { return x(d.date); })
  .y(function(d) { return y(d.points); });

var reload = function() {
  d3.json('eng2-2013-14.json', function (results) {
    data = results;
    results.forEach(function(d) {
      d.Date = parseDate(d.Date)

      // For each game on the date, set both teams' accumulative points and game info
      d.Games.forEach(function(dd) {
        var awayPoints = (dd.AwayScore === dd.HomeScore)? 1:(dd.AwayScore < dd.HomeScore)? 0:3;
        var homePoints = (dd.AwayScore === dd.HomeScore)? 1:(dd.AwayScore < dd.HomeScore)? 3:0;
        if (teamLines.indexOf(dd.Away) < 0) {
          teamLines.push(dd.Away);
          teamLines[dd.Away] = {
            line: pointLine
           ,games: [{date: d.Date, points: awayPoints, team: dd.Away, opp: dd.Home, goals: dd.AwayScore, allowed: dd.HomeScore, align: 'away', venue: dd.Venue}]
          };
          maxPoints = (maxPoints > awayPoints)? maxPoints:awayPoints;
        } else {
          last = teamLines[dd.Away].games.length -1;
          newPoints = awayPoints + teamLines[dd.Away].games[last].points;
          teamLines[dd.Away].games.push({date: d.Date, points: newPoints, team: dd.Away, opp: dd.Home, goals: dd.AwayScore, allowed: dd.HomeScore, align: 'away', venue: dd.Venue});
          maxPoints = (maxPoints > newPoints)? maxPoints:newPoints;
        }
        if (teamLines.indexOf(dd.Home) < 0) {
          teamLines.push(dd.Home);
          teamLines[dd.Home] = {
            line: pointLine
           ,games: [{date: d.Date, points: homePoints, team: dd.Home, opp: dd.Away, goals: dd.HomeScore, allowed: dd.AwayScore, align: 'home', venue: dd.Venue}]
          };
          maxPoints = (maxPoints > homePoints)? maxPoints:homePoints;
        } else {
          last = teamLines[dd.Home].games.length -1;
          newPoints = homePoints + teamLines[dd.Home].games[last].points;
          teamLines[dd.Home].games.push({date: d.Date, points: newPoints, team: dd.Home, opp: dd.Away, goals: dd.HomeScore, allowed: dd.AwayScore, align: 'home', venue: dd.Venue});
          maxPoints = (maxPoints > newPoints)? maxPoints:newPoints;
        }
      });
    });

    /* Initialize x and y domains */
    x.domain(data.map(function (d) { return d.Date; }));
    y.domain([0, maxPoints]);

    /* Draw the x and y axis */
    svg.append("g")
      .attr("class", "x axis")
      .attr("transform", "translate("+(-pad)+", "+(height -bottomPad)+")")
      .call(xAxis)  // Leave drawing to d3
      .selectAll("text")
        .style("text-anchor","end")
        .attr({dx: "-0.8em",
               dy: "0.15em",
               transform: function(d) {return "rotate(-65)"}
        });
    svg.append("g")
      .attr("class", "y axis")
      .attr("transform", "translate("+(leftPad -pad)+", 0)")
      .call(yAxis); // Leave drawing to d3

    redraw();
  });
};

reload();

var redraw = function() {
  var paths = svg.selectAll("path.line-graph")
    .data(teamLines)
    .enter()
    .append("path")
    .attr("class","line-graph")
    .attr("d",function(d) {
      team = teamLines[d];
      return team.line(team.games);
    })
    ;

  paths[0].forEach(function (path){
    console.log(path);
    var totalLength = path.node().getTotalLength();
    path.attr("stroke-dasharray", totalLength + " " + totalLength)
      .attr("stroke-dashoffset", totalLength)
      .transition()
      .duration(1500)
      .ease("linear")
      .attr("stroke-dashoffset", 0);
  })
};
