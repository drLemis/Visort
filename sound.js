var playing = false;
var playIndex = 0;
var audioCtx;
var oscillator;

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
		if (playIndex >= array.length) {
			stopSound();
			return;
		}
		
		console.log(playIndex);
		
		var frequency = 440 / array.length * array[playIndex] + 440;
		beep(5, frequency);
		
		playIndex++;
		
		setTimeout(playArray(array), 50);
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