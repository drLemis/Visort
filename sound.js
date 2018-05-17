var playing = false;
var playIndex = 0;
var audioCtx;
var oscillator;
var gainNode;
var context;
var soundLength = 100;

var timerId;

// --- sound stuff ---

function playSound() {
	if (!playing) {
		document.getElementById("button").innerHTML = 'STOP';
		audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);
		
		playing = true;
		playIndex = 0;
		playNextElement();
	} else {
		document.getElementById("button").innerHTML = 'PLAY';
		playing = false;
		playIndex = 0;
		stopSound();
	}
}

function stopSound() {
	if (oscillator){
		oscillator.stop();
		audioCtx.close();
	}
	document.getElementById("button").innerHTML = 'PLAY';
}

function playNextElement(){
		oscillator = audioCtx.createOscillator();
		gainNode = audioCtx.createGain();
		
		context = new AudioContext();

		oscillator.connect(gainNode);
		gainNode.connect(audioCtx.destination);
				
		oscillator.frequency.value = (880 / graphLines.length) * graphLines[playIndex] + 440;
		
		oscillator.start(playIndex*soundLength / 1000);
		oscillator.stop((playIndex*soundLength+soundLength) / 1000);
		
		playIndex++;
		
		
		if (playIndex >= graphLines.length) {
			return;
		} else {
			playNextElement();
		}
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
		

		oscillator.start();
		
		setTimeout(function() {
			// Important! Setting a scheduled parameter value
			console.log("fade out");
			gainNode.gain.setValueAtTime(gainNode.gain.value, context.currentTime); 
			gainNode.gain.exponentialRampToValueAtTime(0.0001, context.currentTime + 0.03);
			//oscillator.stop()
		}, (duration ? duration : 500));
	}
};