var canvas = document.getElementById("graphCanvas");
var canvasGraphic = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

function drawArray(master, slave) {
    canvasGraphic.clearRect(0, 0, canvasWidth, canvasHeight);
    for (let i = 0; i < arrayData.length; i++) {
        var lineWidth = (canvasWidth / arrayData.length);
        var lineHeight = arrayData[i] * (canvasHeight / arrayData.length);
        var offset = i * lineWidth;

        var color = "#AAAAAAFF";
        switch (i) {
            case master:
                color = "#FF5555"
                break;
            case slave:
                color = "#5555FF"
                break;
            default:
                color = "#AAAAAAFF";
                break;
        }

        canvasGraphic.fillStyle = color;
        canvasGraphic.fillRect(offset, canvasHeight - lineHeight, lineWidth, lineHeight);

        canvasGraphic.strokeStyle = "#000000FF";
        canvasGraphic.strokeRect(offset, canvasHeight - lineHeight, lineWidth, lineHeight);

    }
}