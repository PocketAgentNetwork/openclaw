const fs = require('fs');

const code = `function drawChart(data) {
    var canvas = document.getElementById("barChart");
    var ctx = canvas.getContext("2d");

    ctx.clearRect(0, 0, canvas.width, canvas.height);

    var maxDataValue = 0;
    for (var i = 0; i < data.length; i++) {
        if (data[i].value > maxDataValue) {
            maxDataValue = data[i].value;
        }
    }
    if (maxDataValue === 0) maxDataValue = 1;

    var marginTop = 50;
    var marginBottom = 50;
    var marginLeft = 60;
    var marginRight = 20;

    var chartHeight = canvas.height - marginTop - marginBottom;
    var chartWidth = canvas.width - marginLeft - marginRight;

    // draw Y axis
    ctx.beginPath();
    ctx.moveTo(marginLeft, marginTop);
    ctx.lineTo(marginLeft, canvas.height - marginBottom);
    ctx.stroke();

    // draw X axis
    ctx.beginPath();
    ctx.moveTo(marginLeft, canvas.height - marginBottom);
    ctx.lineTo(canvas.width - marginRight, canvas.height - marginBottom);
    ctx.stroke();

    var numTicks = 5;
    for (var i = 0; i <= numTicks; i++) {
        var yVal = maxDataValue * (i / numTicks);
        var yText = Math.round(yVal);
        var y = canvas.height - marginBottom - (i / numTicks) * chartHeight;

        ctx.fillStyle = "black";
        ctx.textAlign = "right";
        ctx.textBaseline = "middle";
        ctx.fillText(yText, marginLeft - 10, y);
    }

    var numBars = data.length;
    if (numBars === 0) return;
    var barTotalSpace = chartWidth / numBars;
    var barWidth = barTotalSpace * 0.6;
    var barGap = barTotalSpace * 0.4;

    for (var j = 0; j < numBars; j++) {
        var val = data[j].value;
        var barHeight = (val / maxDataValue) * chartHeight;

        var x = marginLeft + (j * barTotalSpace) + (barGap / 2);
        var y = canvas.height - marginBottom - barHeight;

        ctx.fillStyle = "blue";
        ctx.fillRect(x, y, barWidth, barHeight);

        ctx.fillStyle = "black";
        ctx.textAlign = "center";
        ctx.textBaseline = "top";
        ctx.fillText(data[j].label, x + (barWidth / 2), canvas.height - marginBottom + 10);
    }
}

// Example data
var data = [
    { label: "Jan", value: 10 },
    { label: "Feb", value: 20 },
    { label: "Mar", value: 15 },
    { label: "Apr", value: 25 },
    { label: "May", value: 30 },
    { label: "Jun", value: 18 }
];

drawChart(data);
`;

fs.writeFileSync('src/index.js', code);
