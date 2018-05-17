var rate = 50; // every X ms
var active = false;

function orchestrateSorting() {
    if (!active) {
        document.getElementById("button").innerHTML = 'STOP';
        active = true;
        initializeAudio();
        bubbleSort();
    } else {
        document.getElementById("button").innerHTML = 'BUBBLE SORT';
        active = false;
        stopSound();
    }
}

function stopSorting(intervalId) {
    clearInterval(intervalId);
    stopSound();
    drawArray();
}

function isOrdered(a) {
    var m = 0; // counter for loop.
    var current_num;
    var next_num;
    var result = a;
    var test;
    if (a !== undefined) {
        result = true;
        while (m < a.length) {
            current_num = a[m];
            next_num = a[m + 1];
            if (typeof current_num === "number" &&
                typeof next_num === "number") {
                test = current_num >= next_num;
                if (test) {
                    result = false;
                    break;
                }
            }
            m += 1;
        }
    }
    return result;
}


function bubbleSort() {
    var intervalId = setInterval(function() {
        if (active) {
            for (var i = 0; i < arrayData.length - 1; i++) {
                if (arrayData[i] > arrayData[i + 1]) {
                    var temp = arrayData[i];
                    arrayData[i] = arrayData[i + 1];
                    arrayData[i + 1] = temp;
                    drawArray(i, i - 1);
                    playElement(i - 1, rate);
                    break;
                }
            }
            if (isOrdered(arrayData)) {
                stopSorting(intervalId);
            };
        } else {
            stopSorting(intervalId);
        }
    }, rate);

}