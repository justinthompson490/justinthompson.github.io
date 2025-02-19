/* IMPORTANT VALUES

This section contains a list of all variables predefined for you to use (that you will need)

The CSS ids you will work with are:

1. bubbleCounter -- the container for the counter text for bubble sort
2. quickCounter  -- the container for the counter text for quick sort

*/

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES BELOW HERE /////////////////////
///////////////////////////////////////////////////////////////////////

// TODO 2: Implement bubbleSort

async function bubbleSort(array){
    for(let i = 0; i < array.length-1; i++){//pushes through the array
        for(let j = array.length-1; j > 1; j--){//responsible for sorting & starts at the end of the array & goes backwards
            if(array[j].value < array[j - 1].value){//if current index is less than the value of the previous element, it gets swapped
                swap(array, j, j-1);//calls the swap function to swap the values
                updateCounter(bubbleCounter);//updates the move count allowing us to see how many swaps occur
                await sleep();//slows down the update counter allowing us to see the movements
            }
        }
    }
}

// TODO 3: Implement quickSort
async function quickSort(array, left, right){
if(right - left < 0){//base case; checks to see if right is less than left
    return;//base case; returns if right is not less than zero
}

var index = await partition(array, left, right);
if(left < index - 1){//if left is less than index - 1, run the inside of the statement
    await quickSort(array, left, index - 1);//calls the quickSort function to place the left index in the correct place
}

if(right > index){//if right is greater than the index, run the inside of the statement
    await quickSort(array, index, right);// calls the quickSort function to place the right index in the correct place
}

}

// TODOs 4 & 5: Implement partition
async function partition(array, left, right){//function named partition that takes the arguments: array, left, and right
    let pivot = array[Math.floor((right + left) / 2)].value;//creates a variable called pivot and assigns a value using math.floor to it
    while(left < right){//runs whatever is inside of it when left is less than right
        while(array[left].value < pivot){//while the left index of the array's value is less than pivot, run the inside of the statement
            left++;//add 1 to left
        }
        while(array[right].value > pivot){//while the right index of the array's value is greater than pivot, run the inside of the statement
            right--;//subtract 1 from right
        }
        if(left < right){//if left is less than right, run the inside of the statement
            swap(array, left, right);//calls the swap function to switch the left and rights when needed
            updateCounter(quickCounter);//updates the counter to show how many moves happen in the sequence
            await sleep();//slows down the function so we can see the difference in speeds between the two sorting methods
        }


    }
    return left + 1;//returns the value of left + 1
}

// TODO 1: Implement swap
function swap(array, i, j){//sort all of the elements of an array from smallest to largest and update bubble counter
    var tempVar = array[i];//creates a temporary variable to hold array[i]
    array[i] = array[j];//storing j into i
    array[j] = tempVar;//stores original i into j
    drawSwap(array, i, j)//calls drawSwap function and visually draws the swap
}

///////////////////////////////////////////////////////////////////////
/////////////////////// YOUR WORK GOES ABOVE HERE /////////////////////
///////////////////////////////////////////////////////////////////////

//////////////////////////// HELPER FUNCTIONS /////////////////////////

// this function makes the program pause by SLEEP_AMOUNT milliseconds whenever it is called
function sleep(){
    return new Promise(resolve => setTimeout(resolve, SLEEP_AMOUNT));
}

// This function draws the swap on the screen
function drawSwap(array, i, j){
    let element1 = array[i];
    let element2 = array[j];

    let temp = parseFloat($(element1.id).css("top")) + "px";

    $(element1.id).css("top", parseFloat($(element2.id).css("top")) + "px");
    $(element2.id).css("top", temp);
}

// This function updates the specified counter
function updateCounter(counter){
    $(counter).text("Move Count: " + (parseFloat($(counter).text().replace(/^\D+/g, '')) + 1));
}