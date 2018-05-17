var arrayData;

initializeArray(50);

// incremental initialization
function initializeArray(length) {
    arrayData = new Array(length);
    for (let i = 0; i < length; i++) {
        arrayData[i] = i + 1;
    }
    shuffleArray();
}

// Fisher-Yates algorithm
function shuffleArray() {
    let counter = arrayData.length;
    while (counter > 0) {
        let index = Math.floor(Math.random() * counter);
        counter--;
        let temp = arrayData[counter];
        arrayData[counter] = arrayData[index];
        arrayData[index] = temp;
    }
}