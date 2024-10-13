// Array of basic arithmetic operations
const operations = ['+', '-', '*', '/'];

// Function to generate a random integer between 1 and 19
function getRandomNumber() {
    return Math.floor(Math.random() * 19) + 1;
}

// Function to generate a random arithmetic operation
function getRandomOperation() {
    const randomIndex = Math.floor(Math.random() * operations.length);
    return operations[randomIndex];
}

// Function to generate a random question
function generateQuestion() {
    const num1 = getRandomNumber();
    const num2 = getRandomNumber();
    const operation = getRandomOperation();

    // Ensure no division by zero and whole number results for division
    if (operation === '/' && num1 % num2 !== 0) {
        return generateQuestion(); // Generate another question if division is not exact
    }

    return {
        question: `${num1} ${operation} ${num2}`,
        answer: eval(`${num1} ${operation} ${num2}`) // Evaluate the expression
    };
}

// Function to generate three incorrect answers close to the correct answer
function generateIncorrectAnswers(correctAnswer) {
    const incorrectAnswers = new Set();

    while (incorrectAnswers.size < 3) {
        const wrongAnswer = correctAnswer + Math.floor(Math.random() * 10) - 5; // Generate answers near the correct one
        if (wrongAnswer !== correctAnswer && wrongAnswer > 0) { // Ensure wrong answers are different and positive
            incorrectAnswers.add(wrongAnswer);
        }
    }

    return [...incorrectAnswers];
}

// Function to shuffle the answer options
function shuffleOptions(options) {
    for (let i = options.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [options[i], options[j]] = [options[j], options[i]];
    }
    return options;
}

// Function to display the new question and answers
function displayQuestion() {
    const questionData = generateQuestion();
    document.querySelector('.question').innerText = questionData.question;

    // Store the correct answer for future validation
    currentAnswer = questionData.answer;

    // Get three incorrect answers and combine them with the correct answer
    const allAnswers = [currentAnswer, ...generateIncorrectAnswers(currentAnswer)];

    // Shuffle the combined array of answers
    const shuffledAnswers = shuffleOptions(allAnswers);
    const buttons = document.querySelectorAll('.options button');

    // Assign the shuffled answers to the buttons
    buttons.forEach((button, index) => {
        button.innerText = shuffledAnswers[index];
    });
}

// Initial call to display a question when the page loads
displayQuestion();

// Event listener for the "Next" button to generate new question
document.querySelector('.next-button').addEventListener('click', displayQuestion);

// Handle click events on answer buttons to check if the answer is correct
let currentAnswer = 0;
document.querySelectorAll('.options button').forEach(button => {
    button.addEventListener('click', function () {
        const selectedAnswer = Number(this.innerText);
        if (selectedAnswer === currentAnswer) {
            alert('Correct!');
        } else {
            alert('Incorrect! Try again.');
        }
    });
});
