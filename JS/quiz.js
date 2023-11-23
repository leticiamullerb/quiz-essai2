window.onload = init;



let currentQuestion = 0;
let scoreGlobal = 0;
let shuffledQuestions;
var delayInMilliseconds = 2000;
let selectedAnswerIndices = [];
let selectedAnswerIndex = [];


let tableauQuestions = [ 
    {
        question: "In Jurassic Parc, what does John Hammond have in the top of his walking stick?",
        answers: ["A mosquito", "An ant", "A bacteria"],
        correctAnswer: [0],
        image : "./Libs/jurassic.jpg",
        largeurImage: "500px",
        score:1,
        type: 'singleChoice'
        },
    {
        question: "Jack and Rose could have both fitted on the “door” and survived together.",
        answers: ["True", "False"],
        correctAnswer: [1],
        image: "./Libs/titanic.jpg.webp",
        largeurImage: "500px",
        score:1,
        type: 'singleChoice'
    },
    {
        question: "No Star Wars was released in the 90’s :",
        answers: ["True", "False"],
        correctAnswer: [1],
        image: "./Libs/starwars1.gif",
        largeurImage: "450px",
        score:1,
        type: 'singleChoice'
    },
    {
        question: "What are the Fight Club’s rules ?",
        answers: ["You do not talk about Fight Club.", "I know it because Tyler knows it.", "Only two guys to a fight."],
        correctAnswer: [0, 2],
        image: "./Libs/fightclub1.gif",
        largeurImage: "450px",
        score:2,
        type: 'multipleChoice'
    },
    {
        question: "Peg Boggs brought Edward Scissorhands home, and presented him her husband Bill. <br> Who played Bill Boggs? ",
        answers: ["Alan Parsons", "Alan Arkin", "Alan Adams", "Alan Parker"],
        correctAnswer: [1],
        video : "./Libs/Edward.mp4",
        largeurImage: "500px",
        score:1,
        type: 'singleChoice'
    },
    {
        question: "Which movie won the Academy Award for Best Picture in 1994?",
        answers: ["Pulp Fiction", "Matrix", "Schindler's List"],
        correctAnswer: [2],
        image: "./Libs/oscars.jpg",
        largeurImage: "300px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "Who played the role of Neo in the 1999 science fiction film 'The Matrix'?",
        answers: ["Keanu Reeves", "Will Smith", "Tom Cruise", "Brad Pitt"],
        correctAnswer: [0],
        image: "./Libs/matrix1.gif",
        largeurImage: "450px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "What animated movie was released in 1995 and became a huge success?",
        answers: ["Aladdin", "The Lion King", "Cinderella", "Toy Story"],
        correctAnswer: [3],
        image: "./Libs/toystory.png",
        largeurImage: "300px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "In which 1998 film did Jim Carrey play the character Truman Burbank?",
        answers: ["The Truman Show", "Liar Liar", "Ace Ventura"],
        correctAnswer: [0],
        image: "./Libs/jimcarrey1.gif",
        largeurImage: "250px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "Did Quentin Tarantino direct 'Pulp Fiction' and 'Reservoir Dogs'?",
        answers: ["Yes", "No"],
        correctAnswer: [0],
        image: "./Libs/tarantino.jpg",
        largeurImage: "280px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "Did the McCallister's order 10 pizzas for their tea?",
        answers: ["Yes", "No"],
        correctAnswer: [0],
        image: "./Libs/homealone3.gif",
        largeurImage: "450px",
        score: 1,
        type: 'singleChoice'
    },
     {
        question: "Which of those Travolta's movies was NOT released in the 90’s ? ",
        answers: ["Grease", "Staying Alive ", "Pulp fiction"],
        correctAnswer: [0, 1],
        image: "./Libs/travolta.gif",
        largeurImage: "450px",
        score:2,
        type: 'multipleChoice'
    },
];



function init() {
    console.log("Page is ready, elements displayed, and resources that can take time ready too (videos)")
    const startButton = document.querySelector('#startQuizz');
    startButton.onclick = startQuizz;
}

document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("submitAnswer").addEventListener("click", submitAnswer);
});

function startQuizz() {
    console.log("startQuizz");
    shuffledQuestions = tableauQuestions.sort(() => Math.random() - .5)
    currentQuestion = 0;
    scoreGlobal = 0;
    let scoreDiv = document.querySelector('#divScore');
    scoreDiv.innerHTML = "Score : " + scoreGlobal;
    displayQuestion(currentQuestion);
    document.getElementById("startQuizz").style.visibility= 'hidden'; 
    document.getElementById("submitAnswer").style.display = 'block';
}


function displayQuestion(currentQuestion) {
    // TODO : check the type of question....


    let questionDiv = document.querySelector('#questionDiv');
    questionDiv.innerHTML = "";
    
     if (tableauQuestions[currentQuestion].video) {
        // Create a video element
        let videoElement = document.createElement('video');
        videoElement.src = tableauQuestions[currentQuestion].video;
        videoElement.style.width = tableauQuestions[currentQuestion].largeurImage;
        videoElement.style.margin = 'auto';
        videoElement.style.display = 'block';
        videoElement.style.border = '10px solid white';
        videoElement.controls = true; 
        questionDiv.append(videoElement);
    } else {
        // Create an image element
        let imgElement = document.createElement('img');
        imgElement.src = tableauQuestions[currentQuestion].image;
        imgElement.style.width = tableauQuestions[currentQuestion].largeurImage;
        imgElement.style.margin = 'auto';
        imgElement.style.display = 'block';
        imgElement.style.border = '10px solid white';
        imgElement.style.borderRadius = '150px';
        imgElement.style.maxHeight = '450px';
        questionDiv.append(imgElement);
    }

    // we display the title of the question
    let questionTitle = document.createElement('h2');
    questionTitle.innerHTML = tableauQuestions[currentQuestion].question;
    questionDiv.append(questionTitle);

    // add a button for each possible answer
    let answerDiv = document.createElement('div');
    answerDiv.id = "answerDiv";
    questionDiv.append(answerDiv);
    
    answerDiv.innerHTML = "";
    /* we could have written the for loop below like that 
    tableauQuestions.forEach((question, index) => {
    });
    */
     if (tableauQuestions[currentQuestion].type === 'multipleChoice') {
        let messageDiv = document.createElement('div');
        messageDiv.innerHTML = "Select two or more answers:";
        answerDiv.insertBefore(messageDiv, answerDiv.firstChild);
    } 

    for (let i = 0; i < tableauQuestions[currentQuestion].answers.length; i++) {
        let answerButton = document.createElement('button');
        answerButton.id = i;
        // on ajoute la classe CSS answerButton
        answerButton.classList.add("answerButton");

        // For multiple-choice questions, allow multiple selections
        if (tableauQuestions[currentQuestion].type === 'multipleChoice') {
            answerButton.setAttribute('data-selected', 'false'); // Add a data attribute to track selection
        }

        answerButton.innerHTML = tableauQuestions[currentQuestion].answers[i];
        answerDiv.append(answerButton);

        answerButton.onclick = (evt) => {
            let button = evt.target;
            let selectedAnswerIndex = parseInt(button.id); 

            // For multiple-choice questions, toggle the selection
            if (tableauQuestions[currentQuestion].type === 'multipleChoice') {
                let isSelected = button.getAttribute('data-selected') === 'true';
                button.setAttribute('data-selected', isSelected ? 'false' : 'true');

                // Update the array of selected indices
                if (isSelected) {
                    selectedAnswerIndices = selectedAnswerIndices.filter(index => index !== selectedAnswerIndex);
                } else {
                    selectedAnswerIndices.push(selectedAnswerIndex);
                }
            } else {
                // Highlight the selected answer for both single-choice and multiple-choice questions
                let isSelected = button.classList.contains('selected');
                button.classList.toggle('selected', !isSelected);

            }
        };
    }
}

function submitAnswer() {
    // Disable the submit button to prevent multiple submissions
    document.getElementById("submitAnswer").disabled = true;

    let selectedAnswerButtons;

    // Get the selected answer button
    selectedAnswerButtons = document.querySelectorAll('.answerButton[data-selected="true"]');
    selectedAnswerButtons = Array.from(selectedAnswerButtons);
    

 // Check if at least two answers are selected for multiple-choice questions
    if (tableauQuestions[currentQuestion].type === 'multipleChoice' && selectedAnswerIndices.length < 2) {
        alert('Please select at least two answers for this question.');
        // Re-enable the submit button
        document.getElementById("submitAnswer").disabled = false;
        return;
    }

     // Check if any answer is selected
    if (tableauQuestions[currentQuestion].type === 'singleChoice' && selectedAnswerButtons.length > 0) {
            let selectedAnswerIndex = parseInt(selectedAnswerButtons[0].id);
            let isCorrect = tableauQuestions[currentQuestion].correctAnswer === selectedAnswerIndex;
            handleAnswerFeedback(selectedAnswerButtons, isCorrect);
            
            } else if (tableauQuestions[currentQuestion].type === 'multipleChoice' && selectedAnswerIndices.length > 0) {
            let isCorrect = selectedAnswerIndices.every(index => tableauQuestions[currentQuestion].correctAnswer.includes(index));
            handleAnswerFeedback(selectedAnswerButtons, isCorrect);
           
            } else {
            // If no answer is selected, re-enable the submit button
            alert('No answer selected');
            document.getElementById("submitAnswer").disabled = false;
        }

            
               
            currentQuestion++;

    setTimeout(function () {
            if (shuffledQuestions.length > currentQuestion) {
                displayQuestion(currentQuestion);
            } else {
                gameOver();
                document.getElementById("submitAnswer").style.display = 'none';
                document.getElementById("startQuizz").style.visibility = 'visible';
            }

            if (selectedAnswerButtons) {
                selectedAnswerButtons.forEach(button => {
                    button.style.background = '';
                    button.setAttribute('data-selected', 'false');
                });
            }
          
            selectedAnswerIndices = [];

            // Enable the submit button for the next question
            document.getElementById("submitAnswer").disabled = false;

        }, delayInMilliseconds);
    }; 


function handleAnswerFeedback(selectedAnswerButtons, isCorrect) {
    if (isCorrect) {
        scoreGlobal++;
    }

    let scoreDiv = document.querySelector('#divScore');
    scoreDiv.innerHTML = "Score : " + scoreGlobal;

    selectedAnswerButtons.forEach(button => {
        button.style.background = isCorrect ? 'green' : 'red';
    });

    console.log(isCorrect ? "correct answer" : "wrong answer");
        
     }


function gameOver() {
    let questionDiv = document.querySelector('#questionDiv');
    questionDiv.innerHTML = "";
    questionDiv.innerHTML = "You are done ! Your final score is : " + scoreGlobal;
    document.querySelector('#startQuizz').innerText = "Play Again";
}

