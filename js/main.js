let startGame = document.getElementById("startGame");
let userName = document.getElementById("username");
let startTab = document.querySelector(".control-buttons");
let overlay =  document.querySelector('.overlay')
let victory =  document.querySelector('.victory')
let time = document.querySelector('.time');
let timeCount;

let originalTimeValue = time.innerHTML;

function startInterval() {
        timeCount = setInterval(() => {
            time.innerHTML -= 1;
            if(parseInt(time.innerHTML) === 0) {
                clearInterval(timeCount);
                overlay.classList.add('show')
                document.querySelector('#game-over').play();
                rePlay()
                StartAgainAfterOverGame()
            } 
        },1000);
}
startGame.addEventListener("click", () => {
    let yourName = prompt("What Is Your Name");
    yourName == "" || yourName == null
        ? (userName.innerHTML = "unknown")
        : (userName.innerHTML = yourName);
        startTab.remove()
        startInterval() 
});

// Effect Duration 
let duration = 1000;

// Select Blocks Container 
let blocksContainer = document.querySelector('.memory-game-blocks');

// Create Array from game blocks 
let blocks = Array.from(blocksContainer.children);

// Create range of keys 
let orderRange = [...Array(blocks.length).keys()];

shuffle(orderRange)

// Add order CSS property to game blocks 
blocks.forEach((block, index) => {
    // Add order CSS property 
    block.style.order = orderRange[index];

    // trigger the flipBlock func 
    block.addEventListener('click', () => {
        flipBlock(block)
    })
})


// Flip Block Func 
function flipBlock(selectedBlock) {
    // add is-flipped class 
    selectedBlock.classList.add('is-flipped');

    // Collect All Flipped Crads 
    let allFlippedBlocks = blocks.filter(flippedBlock => flippedBlock.classList.contains('is-flipped'));

    // Check If there are two flipped bocks 
    if(allFlippedBlocks.length === 2) {

        // trigger Stop Clicking on the blocks func
        stopClicking();

        // trigger checkMatchedBlocks func 
        checkMatchedBlocks(allFlippedBlocks[0], allFlippedBlocks[1])
    }
}

// StopClicking func 
function stopClicking() {
    // Add no-click class on main container 
    blocksContainer.classList.add('no-click');

    setTimeout(() => {

        // Remove no-click class on main container 
        blocksContainer.classList.remove('no-click');

    }, duration);
}

// Check Block match
function checkMatchedBlocks(firstBlock, secondBlock) {

    let triesElement = document.querySelector('.tries span');

    if(firstBlock.dataset.icon === secondBlock.dataset.icon) {

        firstBlock.classList.remove('is-flipped');
        secondBlock.classList.remove('is-flipped');

        firstBlock.classList.add('has-match');
        secondBlock.classList.add('has-match');

        firstBlock.querySelector('.back').classList.add('low-opacity');
        secondBlock.querySelector('.back').classList.add('low-opacity');


        document.getElementById('success').play();

    } else {

        triesElement.innerHTML = parseInt(triesElement.innerHTML) + 1;
        setTimeout(() => {

            firstBlock.classList.remove('is-flipped');
            secondBlock.classList.remove('is-flipped');

        }, duration);
        document.getElementById('fail').play();
    }
    urWon()
}

// random array 
function shuffle(array) {
    let current = array.length,
        random,
        temp;

        while(current > 0) {
            random = Math.floor(Math.random() * current);

            current--;

            temp = array[current];

            array[current] = array[random];

            array[random] = temp;
        }
        return array;
}

// if no reload (victory)
function reTwoPlay()  {
    document.querySelector('.victory .no').onclick = () => {
        victory.classList.remove('show');
        window.location.reload();
    }
}

// If Yes Start the game again  (victory)
function StartAgainAfterVictory()  {
    document.querySelector('.victory .yes').onclick = () => {
        startTab.remove();
        victory.classList.remove('show');
        [...blocks].forEach(child => child.classList.remove('has-match'));
        time.innerHTML = originalTimeValue;
        setTimeout(() => {
            startInterval()
        }, 1000)
    }
}

// If Yes Start the game again  (overlay)
function StartAgainAfterOverGame()  {
    document.querySelector('.overlay .yes').onclick = () => {
        startTab.remove();
        overlay.classList.remove('show');
        [...blocks].forEach(child => child.classList.remove('has-match'));
        time.innerHTML = originalTimeValue;
        setTimeout(() => {
            startInterval()
        }, 1000)
    }
}

// if no reload  (overlay)
function rePlay()  {
    document.querySelector('.overlay .no').onclick = () => {
        overlay.classList.remove('show');
        window.location.reload();
    }
}


// check if all good func 

function urWon() {
    const blocks = document.querySelectorAll('.game-block');
  
    let allBlocksHaveMatch = true;

    const hasMatch = [...blocks].every(child => child.classList.contains('has-match'));
    if (!hasMatch) {
        allBlocksHaveMatch = false;
    }
    if (allBlocksHaveMatch) {
        clearInterval(timeCount);
        document.querySelector('.victory').classList.add('show');
        document.querySelector('#win-game').play();
        reTwoPlay();
        StartAgainAfterVictory()
    }
    
}
