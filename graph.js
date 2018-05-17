var canvas = document.getElementById("graphCanvas");
var canvasGraphic = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var graphLines;

createGraphArray(50)


function createGraphArray(graphs) {
	graphLines = new Array(canvas.width / (canvas.width / graphs));
	initializeArray(graphLines);

	for (let i = 0; i < graphLines.length; i++) {
		var lineWidth = (canvasWidth / graphLines.length);
		var lineHeight = graphLines[i] * (canvasHeight / graphLines.length);
		var offset = i * lineWidth;
		canvasGraphic.strokeRect(offset, canvasHeight - lineHeight, lineWidth, lineHeight);
	}
}



// ---array stuff---

function getRandomInt(min, max) {
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// incremental initialization
function initializeArray(array) {
	for (let i = 0; i < array.length; i++) {
		array[i] = i + 1;
	}
	shuffleArray(array);
}

// Fisher-Yates algorithm
function shuffleArray(array) {
	let counter = array.length;
	while (counter > 0) {
		let index = Math.floor(Math.random() * counter);
		counter--;
		let temp = array[counter];
		array[counter] = array[index];
		array[index] = temp;
	}
	return array;
}