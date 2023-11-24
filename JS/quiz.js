window.onload = init;



let currentQuestion = 0;
let scoreGlobal = 0;
let shuffledQuestions;
var delayInMilliseconds = 2000;
let selectedAnswerIndices = [];
let selectedAnswerIndex = [];
let submitButton;


let tableauQuestions = [
    {
        question: "In Jurassic Parc, what does John Hammond have in the top of his walking stick?",
        answers: ["A mosquito", "An ant", "A bacteria"],
        correctAnswer: [0],
        image: "./Libs/jurassic.jpg",
        largeurImage: "500px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "Jack and Rose could have both fitted on the “door” and survived together.",
        answers: ["True", "False"],
        correctAnswer: [1],
        image: "./Libs/titanic.jpg.webp",
        largeurImage: "500px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "No Star Wars was released in the 90’s :",
        answers: ["True", "False"],
        correctAnswer: [1],
        image: "./Libs/starwars1.gif",
        largeurImage: "450px",
        score: 1,
        type: 'singleChoice'
    },
    {
        question: "What are the Fight Club’s rules ?",
        answers: ["You do not talk about Fight Club.", "I know it because Tyler knows it.", "Only two guys to a fight."],
        correctAnswer: [0, 2],
        image: "./Libs/fightclub1.gif",
        largeurImage: "450px",
        score: 2,
        type: 'multipleChoice'
    },
    {
        question: "Peg Boggs brought Edward Scissorhands home, and presented him her husband Bill. <br> Who played Bill Boggs? ",
        answers: ["Alan Parsons", "Alan Arkin", "Alan Adams", "Alan Parker"],
        correctAnswer: [1],
        video: "./Libs/Edward.mp4",
        largeurImage: "500px",
        score: 1,
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
        score: 2,
        type: 'multipleChoice'
    },
];



function init() {
    console.log("Page is ready, elements displayed, and resources that can take time ready too (videos)")
    const startButton = document.querySelector('#startQuizz');
    startButton.onclick = startQuizz;

    // MB : on récupère le bouton submitAnswer et on le met en variable globale,
    // pour pouvoir le désactiver / activer depuis d'autres fonctions
    submitButton = document.getElementById("submitAnswer");
    submitButton.disabled = true;
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
    document.getElementById("startQuizz").style.visibility = 'hidden';
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
            let question = tableauQuestions[currentQuestion];

            // MB : quel que soit le type de question (choix simple ou multiple), comme maintenant
            // on a un bouton submit, on peut cliquer sur une réponse (choix simple) ou plusieurs (choix multiple)
            // mais du coup on peut faire un toggle sur les réponses. Il faut qu'au moins une
            // réponse soit sélectionnée pour que le bouton submit soit activé (enabled)


            // MB: On montre qu'on a selectionné le bouton qu'on vient de cliquer comme réponse possible. 
            // On fait un toggle on/off sur une classe que j'ai créée dans le quizz.css qui change bordure
            // et couleur de fond...
            // J'ai créé une classe CSS pour cela
            button.classList.toggle("selectedAsPossibleAnswer");

            // MB :on positionne le data attribute du bouton à true ou false selon qu'il est sélectionné ou pas
            button.setAttribute('data-selected', button.classList.contains("selectedAsPossibleAnswer"));

            // MB : si on a une question à choix simple, on désélectionne tous les boutons
            // sauf celui qu'on vient de sélectionner
            if (question.type === 'singleChoice') {
                let answerButtons = document.querySelectorAll('.answerButton');
                answerButtons.forEach(button => {
                    if (button.id !== evt.target.id) {
                        // on ne traite que les boutons différents du bouton qu'on vient de cliquer
                        button.classList.remove("selectedAsPossibleAnswer");
                        button.setAttribute('data-selected', 'false');
                    }
                });
            }

            // MB : Arrivé ici on a donc un seul bouton potentiellement sélectionné (choix simple) et 
            // un ou plusieurs boutons sélectionnés (choix multiple )

            // MB : on peut maintenant activer le bouton submit si au moins une réponse est sélectionnée
            // et le désactiver si aucune réponse n'est sélectionnée
            submitButton.disabled = document.querySelectorAll('.selectedAsPossibleAnswer').length === 0;


            // On vérifiera les bonnes réponses quand on cliquera sur le bouton submit, pas ici...

            /*
            let selectedAnswerIndex = parseInt(button.id); 

            

            if (tableauQuestions[currentQuestion].type === 'multipleChoice') {
                 

                if(button.classList.contains("selectedAsPossibleAnswer")) {
                    // MB cette réponse figure dans les réponses sélectionnées par le joueur

                    //let isSelected = button.getAttribute('data-selected') === 'true';
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
            */
        };
    }
}

function submitAnswer() {
    let question = tableauQuestions[currentQuestion];

    // Disable the submit button to prevent multiple submissions
    submitButton.disabled = true;

    // MB : on récupère les boutons qui ont été sélectionnés
    let selectedAnswerButtons;

    // Get the selected answered button(s)
    selectedAnswerButtons = document.querySelectorAll('.answerButton[data-selected="true"]');
    selectedAnswerButtons = Array.from(selectedAnswerButtons);
    // MB : on stocje ici le nombre de réponses sélectionnées
    const nbSelectedAnswers = selectedAnswerButtons.length;


    // Check if at least two answers are selected for multiple-choice questions
    if (question.type === 'multipleChoice' && nbSelectedAnswers < 2) {
        alert('Please select at least two answers for this question.');
        // Re-enable the submit button
        document.getElementById("submitAnswer").disabled = false;
        return;
    }

    // Check if any answer is selected 
    // MB : c'est mieux un switch que deux if imbriqués
    let isCorrect = false;
    switch (question.type) {
        case 'singleChoice':
            let button = selectedAnswerButtons[0];
            let selectedAnswerIndex = parseInt(button.id);
            // MB : tu avais un bug ici, correctAnswer est un tableau, pas un entier
            // tu avais question.correctAnswer === selectedAnswerIndex, j'ai rajoute [0] !
            isCorrect = question.correctAnswer[0] === selectedAnswerIndex;
            // useful for feedback, we mark each button with a data attribute indicating if it is correct or not
            button.dataset.correctAnswer = isCorrect;

            handleAnswerFeedback(selectedAnswerButtons, isCorrect);
            break;
        case 'multipleChoice':
            // 1 : a-t-on le bon nombre de réponses sélectionnées ? Si le nombre de boutons sélectionnés
            // est différent du nombre de réponses correctes, on a forcément une mauvaise réponse
            isCorrect = (nbSelectedAnswers === question.correctAnswer.length);
            if (isCorrect) {
                // si oui, on va quand même vérifier que chaque réponse sélectionnée est bien une réponse correcte
                // on va donc parcourir les réponses sélectionnées et vérifier qu'elles sont bien dans les réponses correctes
                // si on trouve une réponse sélectionnée qui n'est pas dans les réponses correctes, on a une mauvaise réponse
                selectedAnswerButtons.forEach(button => {
                    let selectedAnswerIndex = parseInt(button.id);
                    let correctAnswerForThisButton = question.correctAnswer.includes(selectedAnswerIndex);
                    // useful for feedback, we mark each button with a data attribute indicating if it is correct or not
                    button.dataset.correctAnswer = correctAnswerForThisButton;

                    // answer to the question is correct only if all selected answers are correct
                    isCorrect = (isCorrect && correctAnswerForThisButton);
                });
            }
            // On peut maintenant afficher le feedback
            handleAnswerFeedback(selectedAnswerButtons, isCorrect);
            break;
    }



            // MB : ce cas ne peut pas arriver, le bouton submit aurait été disabled cf plus haut
            /*
            else {
            // If no answer is selected, re-enable the submit button
            alert('No answer selected');
            document.getElementById("submitAnswer").disabled = false;
        }
            */

    // on passe à la question suivante
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

        // Enable the submit button for the next question
        document.getElementById("submitAnswer").disabled = false;

    }, delayInMilliseconds);
};


function handleAnswerFeedback(selectedAnswerButtons, isCorrect) {
    // augmenter le score si la réponse est correcte
    if (isCorrect) {
        scoreGlobal++;
    }

    let scoreDiv = document.querySelector('#divScore');
    scoreDiv.innerHTML = "Score : " + scoreGlobal;

    // Afficher les bonnes réponses en vert et les mauvaises en rouge
    selectedAnswerButtons.forEach(button => {
        // MB : on récupère le data attribute qui indique si la réponse est correcte ou pas
        // ca permet en cas de choix multiple de mettre plusieurs boutons en rouge ou en vert
        let isCorrectAnswer = (button.dataset.correctAnswer === 'true');
        //let isCorrectAnswer = button.getAttribute('data-correctAnswer') === 'true';

        button.style.background = isCorrectAnswer ? 'green' : 'red';
    });

    //console.log(isCorrect ? "correct answer" : "wrong answer");
}


function gameOver() {
    let questionDiv = document.querySelector('#questionDiv');
    questionDiv.innerHTML = "";
    questionDiv.innerHTML = "You are done ! Your final score is : " + scoreGlobal;
    document.querySelector('#startQuizz').innerText = "Play Again";
}

