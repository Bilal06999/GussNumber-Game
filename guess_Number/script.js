let randomNumber = parseInt(Math.random() * 100 + 1)

const SubmitBtn = document.querySelector('.sbt')
const userInput = document.querySelector('#inputField')
const realNumber = document.querySelector('#realNumber')
const guessedNumBox = document.querySelector('.guessedNums')
const guessScore = document.querySelector('.guessScore span')
const remaingGuess = document.querySelector('.remainingGuess span')
const displayMessage = document.querySelector('.displayMessage')
const newGameBtn = document.querySelector('.newGame')
const resetBtn = document.querySelector('.reset')

const p = document.createElement('p');

let guessedNumbers = [];
let totalGuess = 3
let remaingGuessNumbers = 3;

let playGame = true;

if(playGame){
    SubmitBtn.addEventListener('click', () => {
        const guess = parseInt(userInput.value)
        validateGuess(guess)
    })
    userInput.addEventListener('keydown', (event) => {
        if (event.key === 'Enter') {
            const guess = parseInt(userInput.value)
            validateGuess(guess)
        }
    })
    reset();
}

function validateGuess(guess){
    if (isNaN(guess)) {
        message('Please enter a valid number')
    } else if (guess < 1 || guess > 100) {
        message('Please enter a number btw 1 to 100')
    } else {
        checkGuess(guess);
        addingGuesses(guess)
        guessCalculation(guess)
        guessScoreInPercentage(guess,randomNumber)
    }
    if (remaingGuessNumbers === 0) {
        message(`Game Over`)
        realNumber.innerHTML = randomNumber;
        endGame();
    }
}
function checkGuess(guess){
    if (guess === randomNumber) {
        message(`You guessed it right`);
        realNumber.innerHTML = randomNumber;
        endGame();
    } else if (guess < randomNumber) {
        message(`Choose Higher`);
    } else if (guess > randomNumber) {
        message(`Choose lower`);
    }
}
function guessCalculation(){
    userInput.value = '';
    remaingGuessNumbers--;
    remaingGuess.innerHTML = `${remaingGuessNumbers}/${totalGuess} `;
}
function addingGuesses(guess){
    guessedNumbers.push(guess);
    guessedVal = guessedNumbers[guessedNumbers.length - 1];
    guessedNumBox.innerHTML += `<span class="guessedNum">${guessedVal}</span>`;

}

function message(message){
    userInput.value = '';
    displayMessage.innerHTML = message;
}

function endGame() {
    userInput.value = '';
    userInput.setAttribute('disabled', '');
    newGameBtn.classList.remove('hide');
    resetBtn.classList.add('hide');
    playGame = false;
    newGame();
}
function newGame(){
    newGameBtn.addEventListener('click', function (e) {
        refresh()
    })
}
function reset(){
    resetBtn.addEventListener('click', () => {
        let userResponse = confirm("Do you want to Reset Game?");
        if (userResponse) {
            refresh()
        }
    })
}
function refresh(){
    userInput.value = '';
    realNumber.innerHTML = '?';
    randomNumber = parseInt(Math.random() * 100 + 1);
    guessedNumbers = [];
    guessedNumBox.innerHTML = '';
    displayMessage.innerHTML = '';
    remaingGuessNumbers = totalGuess;
    remaingGuess.innerHTML = `${remaingGuessNumbers}/${totalGuess}`;
    userInput.removeAttribute('disabled');
    newGameBtn.classList.add('hide');
    resetBtn.classList.remove('hide');
    guessScore.innerHTML = '';
    playGame = true;
}
function guessScoreInPercentage(guess,randomNumber){
    let difference = Math.abs(guess - randomNumber);
    let accuracyPercentage = (1 - (difference / 99)) * 100;
    guessScore.innerHTML = `${accuracyPercentage.toFixed(2)}%`;
}

