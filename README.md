# rapidd3js
Source code for Rapid D3.js Course

The course was built using D3.js Version 3.x. Some parts will fail with the latest version 4.x.

## Errata/Changes

### Use HTTPS for Shared Libraries

In index.html of each of the subproject, use HTTPS instead of HTTP for accessing the Bootstrap and D3 shared libraries. Encrypt all the things!

### Part 2, Video 2 - Filtering Data in an HTML Table

* Timestamp 1:34

The team name is not being added to the team object in the "Gather Unique Teams" slide. After pushing the d.TeamID into the teams object, set teams[d.TeamID] = d.Team;. This is displayed correctly in the source code from 1:52.

* Timestamp 2:22

Vocal instructions to selectAll("option") tags BEFORE calling redraw() is correct, while the slide shows this selection happening within the redraw function. This is correctly displayed in the source code from 2:53.

### Part 4, Video 4 - Adding a Legend

* Timestamp 4:12

The legend object is being incorrectly translated leftPad + 20 in the slide, whereas it should be margin.left + 20 as shown in the source code at 4:35.

### Part 6, Video 1 - Creating a Word Cloud

The author for the d3-cloud has changed the HTML example page to a JavaScript page (browserify.js) from version 1.2.0.

Reverting to Tag 1.0.5 has the HTML example page as shown in the lesson. You may find the script and HTML page here:

* https://github.com/jasondavies/d3-cloud/tree/v1.0.5

The Tag 1.1.x version will also work, but takes a little more effort on your part.
