var rate = 50; // every X ms
var active = false;

function setRate(newRate) {
    rate = newRate;
}

function orchestrateSorting() {
    if (!active && !isOrdered()) {
        document.getElementById("button").innerHTML = 'STOP';
        active = true;
        initializeAudio();
        setSort();
    } else {
        document.getElementById("button").innerHTML = 'SORT';
        active = false;
        stopSorting();
        stopSound();
        drawArray();
    }
}

function stopSorting(intervalId) {
    if (intervalId) {
        clearInterval(intervalId);
    }
    document.getElementById("button").innerHTML = 'SORT';
    active = false;
    stopSound();
    drawArray();
}

function setSort() {
    switch (document.getElementById("dropdownSort").value) {
        case "bubble":
            bubbleSort();
            break;
        case "incertion":
            insertionSort();
            break;
        case "selection":
            selectionSort();
            break;
        default:
            break;
    }
}

function isOrdered() {
    var m = 0;
    var current_num;
    var next_num;
    var result = arrayData;
    var test;
    if (arrayData !== undefined) {
        result = true;
        while (m < arrayData.length) {
            current_num = arrayData[m];
            next_num = arrayData[m + 1];
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
        var isSorted = isOrdered();
        if (active && !isSorted) {
            for (var i = 0; i < arrayData.length - 1; i++) {
                if (arrayData[i] > arrayData[i + 1]) {
                    var temp = arrayData[i];
                    arrayData[i] = arrayData[i + 1];
                    arrayData[i + 1] = temp;
                    drawArray(i, i - 1);
                    playElement(i - 1, rate);
                    console.log(rate);
                    break;
                } else {

                }
            }
            if (isSorted) {
                stopSorting(intervalId);
            };
        } else {
            stopSorting(intervalId);
        }
    }, rate);
}

function selectionSort() {
    var minIdx;
    var temp;
    var len = arrayData.length;
    var i = 0;


    var intervalId = setInterval(function() {
        var isSorted = isOrdered();
        if (active && !isSorted) {
            minIdx = i;
            for (var j = i + 1; j < len; j++) {
                if (arrayData[j] < arrayData[minIdx]) {
                    drawArray(j, minIdx);
                    playElement(j, rate);
                    minIdx = j;
                }
            }
            temp = arrayData[i];
            arrayData[i] = arrayData[minIdx];
            arrayData[minIdx] = temp;
            i++

            if (isSorted) {
                stopSorting(intervalId);
            };
        } else {
            stopSorting(intervalId);
        }
    }, rate);
}