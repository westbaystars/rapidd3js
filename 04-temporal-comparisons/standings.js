
/* Constants for our drawing area */
var width = 750,
    height = 500,
    margin = { top: 20, right: 20, bottom: 20, left:70 };

/* The drawing area */
var svg = d3.select("#standings-chart")
  .append("svg")
  .attr("width", width)
  .attr("height", height);

/* Our standard data reloading function */
var reload = function() {
  var data = [];
  // Fill in here
  redraw(data);
};

/* Our standard graph drawing function */
var redraw = function(data) {
  // Fill in here
};

reload();

