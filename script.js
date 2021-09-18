// This should be placed inside JSON
const quizData = [
    {
        question: 'What year was my sister born?',
        a: '1999',
        b: '1989',
        c: '1979',
        d: '1969',
        correct: 'c'
    }, {
        question: 'What is the most popular food?',
        a: 'pizza',
        b: 'hambugers',
        c: 'tacos',
        d: 'potato chips',
        correct: 'a'
    }, {
        question: 'How many shoes does Michael have?',
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        correct: 'b'
    }, {
        question: 'What is the biggest state in US?',
        a: 'Montana',
        b: 'Texas',
        c: 'California',
        d: 'New York',
        correct: 'b'
    }, {
        question: 'How many rooms are in most houses?',
        a: '1',
        b: '2',
        c: '3',
        d: '4',
        correct: 'c'
    }    
]

const quiz = document.getElementById("quiz");
const answerElements = document.querySelectorAll(".answer");
const questionElement = document.getElementById("question");
const a_text = document.getElementById("a_text");
const b_text = document.getElementById("b_text");
const c_text = document.getElementById("c_text");
const d_text = document.getElementById("d_text");
const submitButton = document.getElementById("submit");

let currentQuiz = 0;
let score = 0;

loadQuiz();

function loadQuiz() {

    /* Initialize answers */
    answerElements.forEach((answerElement) => {
        answerElement.checked = false;
    });
    
    /* Initialize error message */
    document.getElementById("disp").innerHTML = " ";

    /* 'capture/name' the quiz data as an array */ 
    const currentQuizData = quizData[currentQuiz];

    /* Get the question part of a quizData element */
    questionElement.innerText = currentQuizData.question;

    /* get the assigned a possible answers for current quizData*/
    a_text.innerText = currentQuizData.a;
    b_text.innerText = currentQuizData.b;
    c_text.innerText = currentQuizData.c;
    d_text.innerText = currentQuizData.d;
} /*done*/

/* go get what the user selected */
function getSelected() {
    let answer = undefined;

    answerElements.forEach((answerElement) => {
        if (answerElement.checked){
            answer = answerElement.id;
            //Test: console.log(answer.checked);
        }
    });

    return answer;
} /*done*/

/* Whatever the user selects, find what they are selecting */
submitButton.addEventListener("click", () => {
    
    //User pressed submit, error check then count valid answers     
    const answer = getSelected();

    //ERROR CHECK: was there an answer selected?
    if(answer !== quizData[currentQuiz].a &&
        answer !== quizData[currentQuiz].b &&
        answer !== quizData[currentQuiz].c &&
        answer !== quizData[currentQuiz].d) {
    
            document.getElementById("disp").innerHTML = "Please select answer before pressing select button.";
    }   

    // If answer is correct, accumulate correct score.
    if (answer) {
        /* if user's answer is correct accumulate */
        if(answer === quizData[currentQuiz].correct){
            score++;
        }

        /* increment so that you can get the next question. */
        currentQuiz++;
        
        nextAction();
    }

    function nextAction(){
        // if not at the end of the quiz 
        if(currentQuiz < quizData.length){
            // get the next question
            loadQuiz();
        }else{
            // give the results
            quiz.innerHTML = `<h2> You answered ${score}/${quizData.length} questions correctly.</h2>
                              <button onclick="location.reload()">Reload</button>`;
            //alert("You've Completed Quiz, Thank you!");
        }
    }
});