var canvas = document.getElementById("myCanvas");
var canvasGraphic = canvas.getContext("2d");

var canvasWidth = canvas.width;
var canvasHeight = canvas.height;

var graphLines;

var playing = false;
var playIndex = 0;
var audioCtx;
var oscillator;

createGraphArray(3)


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


// --- sound stuff ---

function playSound() {
	if (!playing) {
		document.getElementById("button").innerHTML = 'STOP';
		audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);
		playing = true;
		playArray(graphLines);
	} else {
		document.getElementById("button").innerHTML = 'PLAY';
		stopSound();
	}
}

function stopSound() {
	playing = false;
	playIndex = 0;
	document.getElementById("button").innerHTML = 'PLAY';
}



function playArray(array) {
	if (playing) {
		var frequency = 440 / array.length * array[playIndex] + 440;
		beep(50, frequency);
		playIndex++;
		if (playIndex <= array.length) {
			console.log(playIndex);
			setTimeout(playArray(array), 50);
		} else {
			stopSound();
			return;
		}
	}
}

// remove kebab
function wait(ms) {
	var start = new Date().getTime();
	var end = start;
	while (end < start + ms) {
		end = new Date().getTime();
	}
}


function beep(duration, frequency, volume, type, callback) {
	if (playing) {
		if (oscillator) {
			oscillator.stop();
		}

		oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();

		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);

		if (volume) {
			gainNode.gain.value = volume;
		};
		if (frequency) {
			oscillator.frequency.value = frequency;
		}
		if (type) {
			oscillator.type = type;
		}
		if (callback) {
			oscillator.onended = callback;
		}

		oscillator.start();
		setTimeout(function() {
			oscillator.stop()
		}, (duration ? duration : 500));
	}
};