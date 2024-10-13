
// var currentQuestionIndex = 0;
// var mathQuestionListLength =0
// var correctAnswerCount=0
// var gameMode = ''
// var gameSubMode = ''
// var selectedQuestionCount = 10
// var mathQuestionList = []
// var selectedPlayer = localStorage.getItem('SELECTED_PLAYER') || 'GUEST'




// function getRandomElements(originalArray, m) {
// 	let  shuffledArray = originalArray
// 	for(let i=0;i<3;i++){
// 		const randomFactor = Math.random()
// 		shuffledArray = shuffledArray.slice().sort(() => Math.random() - randomFactor);
// 	}
	
// 	const selectedWords = shuffledArray.slice(0, m);
	
// 	const mathQuestionList = []
// 	selectedWords.map(selectedWord=>{
		
// 		let otherAnswers = []
// 		for(let i=1;i<5;i++){
// 			otherAnswers.push(selectedWord.a+i)
// 		}
// 		for(let i=1;i<5;i++){
// 			if(selectedWord.a-i>=0){
// 				otherAnswers.push(selectedWord.a-i)
// 			}
// 		}
// 		otherAnswers = otherAnswers.slice().sort(() => Math.random() - Math.random()).slice(0, 3)
		
// 		const questionObject = {
// 			mathsQuestion:selectedWord.q,
// 			otherOptions:[selectedWord.a].concat(otherAnswers),
// 			answer: selectedWord.a
// 		}
// 		mathQuestionList.push(questionObject)
// 	})
	
// 	return mathQuestionList
	
// }

// function getRandomQuestionAndAnswer(mode='easy'){
	
// 	const newArray = [];
	
// 	if(mode=='easy'){
// 		for (let i = 2; i <= 12; i++) {
// 			for (let j = 1; j <= 12; j++) {
// 				newArray.push({'q': `${i} * ${j}`, 'a': i * j});
// 				newArray.push({'q': `${i} + ${j}`, 'a': i + j});
// 				if(i>j){
// 					newArray.push({'q': `${i} - ${j}`, 'a': i - j});
// 				}
// 				if(i%j==0){
// 					newArray.push({'q': `${i} / ${j}`, 'a': i / j});
// 				}
				
// 			}
// 		}
// 	}
// 	else if(mode=='medium'){
// 		for (let i = 2; i <= 20; i++) {
// 			for (let j = 1; j <= 12; j++) {
// 				newArray.push({'q': `${i} * ${j}`, 'a': i * j});
// 				newArray.push({'q': `${i} + ${j}`, 'a': i + j});
// 				if(i>j){
// 					newArray.push({'q': `${i} - ${j}`, 'a': i - j});
// 				}
// 				if(i%j==0){
// 					newArray.push({'q': `${i} / ${j}`, 'a': i / j});
// 				}
// 			}
// 		}
// 	}
	
// 	return  newArray;
// }




// Array of basic arithmetic operations
const operations = ['+', '-', '*', '/'];
let 

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
        answer: Math.floor(eval(`${num1} ${operation} ${num2}`)) // Evaluate the expression and floor the result
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

// Function to display the new question and dynamically create buttons
function displayQuestion() {
    const questionData = generateQuestion();
    document.querySelector('.question').innerText = questionData.question;

    // Store the correct answer for future validation
    currentAnswer = questionData.answer;

    // Get three incorrect answers and combine them with the correct answer
    const allAnswers = [currentAnswer, ...generateIncorrectAnswers(currentAnswer)];

    // Shuffle the combined array of answers
    const shuffledAnswers = shuffleOptions(allAnswers);

    // Get the container for the options and clear previous buttons
    const optionsContainer = document.getElementById('options-container');
    optionsContainer.innerHTML = ''; // Clear any previous options

    // Create option buttons dynamically
    shuffledAnswers.forEach(answer => {
        const button = document.createElement('button');
        button.innerText = answer;
        button.style.padding = '10px';
        button.style.fontSize = '18px';
        button.style.border = '1px solid #ccc';
        button.style.borderRadius = '5px';
        button.style.backgroundColor = '#f5f5f5';
        button.style.cursor = 'pointer';
        button.style.margin = '5px';
        button.style.color = 'black';


        // Add event listener for the answer button
        button.addEventListener('click', () => {
            if (answer === currentAnswer) {
                button.style.backgroundColor = 'green'; 
            } else {
                button.style.backgroundColor = 'red'; 
            }
            disableOptions(); // Disable buttons after an answer is selected
        });

        optionsContainer.appendChild(button); // Append each button to the container
    });

    // Create the "Next" button dynamically
    const nextBtnContainer = document.getElementById('next-btn-container');
    nextBtnContainer.innerHTML = ''; // Clear any previous button

    const nextButton = document.createElement('button');
    nextButton.innerText = 'Next';
    nextButton.classList.add('next-button');

    nextButton.addEventListener('click', () => {
        displayQuestion(); // Display the next question when clicked
    });

    nextBtnContainer.appendChild(nextButton); // Append the next button to the container
}

// Function to disable all option buttons after selecting an answer
function disableOptions() {
    const buttons = document.querySelectorAll('#options-container button');
    buttons.forEach(button => button.disabled = true);
}

// Initial call to display a question when the page loads
let currentAnswer = 0;
displayQuestion();
