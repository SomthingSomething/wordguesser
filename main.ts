function updateCurrenGuess (letter: string) {
    count = 0
    for (let index = 0; index <= currentGuess.length - 1; index++) {
        if (secretWord.charAt(index) == letter) {
            currentGuess[index] = letter
            count += 1
        }
    }
    return count
}
function initCurrentGuess () {
    for (let index = 0; index < secretWord.length; index++) {
        currentGuess.unshift("_")
    }
}
function makeAGuess () {
    guess = game.askForString("Guess a letter", 1)
    while (guessedLetters.indexOf(guess) >= 0) {
        guess = game.askForString("Please guess a letter you didn't already guess", 1)
    }
    if (secretWord.includes(guess)) {
        guessedLetters.push(guess)
        info.changeScoreBy(updateCurrenGuess(guess))
    } else {
        guessedLetters.push(guess)
        info.changeLifeBy(-1)
        game.showLongText("The secret word does not contain the letter " + guess, DialogLayout.Bottom)
    }
}
function getCurrentGuess () {
    currentGuessString = ""
    for (let index = 0; index <= currentGuess.length - 1; index++) {
        currentGuessString = "" + currentGuessString + ("" + currentGuess[index] + " ")
    }
    return currentGuessString
}
let currentGuessString = ""
let count = 0
let guess = ""
let secretWord = ""
let guessedLetters: string[] = []
let currentGuess: string[] = []
currentGuess = []
guessedLetters = []
info.setScore(0)
info.setLife(5)
secretWord = "again"
initCurrentGuess()
while (true) {
    game.showLongText(getCurrentGuess(), DialogLayout.Bottom)
    if (game.ask("Guess a letter", "Guess whole word")) {
        makeAGuess()
        if (info.score() == secretWord.length) {
            game.over(true)
        }
    } else {
        guess = game.askForString("Guess whole word", secretWord.length)
        if (secretWord == guess) {
            info.setScore(secretWord.length)
            game.over(true)
        } else {
            info.changeLifeBy(-1)
        }
    }
}
