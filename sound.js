var playIndex = 0;

var audioCtx;
var oscillator;
var gainNode;


var timerId;

// --- sound stuff ---
function stopSound() {
    if (oscillator) {
        oscillator.stop();
        active = false;
    }
}


function initializeAudio() {
    audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);

    oscillator = audioCtx.createOscillator();
    gainNode = audioCtx.createGain();
    oscillator.connect(gainNode);
    oscillator.connect(audioCtx.destination);
    oscillator.type = 'triangle';
    oscillator.start();
}

function playElement(index, length) {

    if (arrayData[index]) {
        oscillator.frequency.value = (880 / arrayData.length) * arrayData[index] + 440;
        gainNode.gain.setValueAtTime(gainNode.gain.value, audioCtx.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.0001, audioCtx.currentTime + 0.03);
    }
}