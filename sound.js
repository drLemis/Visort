var audioCtx;
var oscillator;
var gainNode;
var volume = 0.5;
var waveform = "triangle";

function stopSound() {
    if (oscillator) {
        gainNode.gain.setValueAtTime(0, audioCtx.currentTime)
        oscillator.stop();
    }
}


function initializeAudio() {
    audioCtx = new(window.AudioContext || window.webkitAudioContext || window.audioContext);

    gainNode = audioCtx.createGain();
    gainNode.connect(audioCtx.destination);
    gainNode.gain.setValueAtTime(0, audioCtx.currentTime)

    oscillator = audioCtx.createOscillator();
    oscillator.connect(gainNode);
    oscillator.type = waveform;

    oscillator.start();
}

function oscillatorWaveForm(newWaveform) {
    if (newWaveform) {
        waveform = newWaveform;
    } else {
        waveform = document.getElementById("dropdownWaveForm").value;
    }

    if (oscillator) {
        oscillator.type = waveform;
    }
}

function oscillatorVolume(newVolume) {
    volume = newVolume / 100;
    // document.getElementById('sliderVolume').innerHTML = newVolume;

}

function playElement(index, length) {
    if (arrayData[index]) {
        gainNode.gain.setValueAtTime(volume, audioCtx.currentTime);
        oscillator.frequency.value = (880 / arrayData.length) * arrayData[index] + 440;
    }
}