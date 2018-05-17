var playing = false;
var playIndex = 0;
var audioCtx;
var oscillator;

var timerId;

// --- sound stuff ---

function playSound() {
	if (!playing) {
		stopSound();
		document.getElementById("button").innerHTML = 'STOP';
		audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);
		
		playing = true;
		playIndex = 0;
		timerId = setInterval('playNextElement()', 50);
	} else {
		document.getElementById("button").innerHTML = 'PLAY';
		stopSound();
	}
}

function stopSound() {
	playing = false;
	playIndex = 0;
	clearInterval(timerId);
	document.getElementById("button").innerHTML = 'PLAY';
}

function playNextElement(){
		if (playIndex >= graphLines.length) {
			stopSound();
			return;
		}
		
		var frequency = (440 / graphLines.length) * graphLines[playIndex] + 440;
		
		beep(50, frequency);
		
		console.log(frequency);
		playIndex++;
}

function beep(duration, frequency, volume, type, callback) {
	if (playing) {
		var oscillator = audioCtx.createOscillator();
		var gainNode = audioCtx.createGain();
		
		var context = new AudioContext();

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
		
		gainNode.gain.setTargetAtTime(1, context.currentTime, 0.01);
		gainNode.gain.setTargetAtTime(0, context.currentTime + .05, .01);

		oscillator.start();
		
		setTimeout(function() {
			oscillator.stop()
		}, (duration ? duration : 500));
	}
};