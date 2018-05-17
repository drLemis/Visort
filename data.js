var arrayData;

var arraySize = 20;

// incremental initialization
function initializeArray() {
    arraySize = document.getElementById("arrayLength").value;

    arrayData = new Array(arraySize);
    for (let i = 0; i < arraySize; i++) {
        arrayData[i] = i + 1;
    }
    shuffleArray();
    drawArray();
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