
/* Creating a table
 *
 * This script shall create a table from a tab-separated value text document.
 */

/* Store the data in an array. Starts off empty.
 * This is usually NOT global, but making global here for demonstration purposes.
 */
var data = [];

/* Select the DIV in the document with the ID of "roster".
 * Append a <table class="table"></table> to the selected DIV.
 * The "table" class is a beautification measure via Bootstrap's CSS.
 * The resulting table element is stored in the variable "table."
 */
var table = d3.select('#roster')
  .append('table')
  .classed('table',true);

/* Append <thead><tr></tr></thead> to the above table.
 * The inner tr element is stored in the "thead" variable.
 */
var thead = table.append('thead').append('tr');

/* Append <tbody></tbody> to the table and store it in the "tbody" variable. */
var tbody = table.append('tbody');

/* Function to reload the data from the data file.
 * Call the redraw() function after the data is loaded to drive the drawing of the data.
 * We'll be filling this in during the lesson.
 */
var reload = function() {
  console.log("reload() called.");
  redraw();
};

/* Function to redraw the table.
 * It's good practice to keep the data input and drawing funcitons separate.
 * We'll be filling this in during the lesson.
 */
var redraw = function() {
  console.log("redraw() called.");
};

/* Call reload() once the page and script have loaded to get the controller script started. */
reload();

