const question=document.getElementById("question");
const choices=Array.from(document.getElementsByClassName("choice-text"));
const questionCounterText=document.getElementById('questionCounter');
const scoreText=document.getElementById('score');


let currentQuestion={};
let acceptingAnswers=true;
let score=0;
let questionCounter=0;
let availableQuestions=[];

let questions=[
    {
        question:"Inside which HTML element do we put the JavaScript?",
        choice1:"<script>",
        choice2:"<javascript>",
        choice3:"<js>",
        choice4:"<scripting>",
        answer:1
    },
    {
        question:"what is the correct syntax for reffering to an external script called 'myscript.js'?",
        choice1:"<script href='myscript.js'>",
        choice2:"<script name='myscript.js'>",
        choice3:"<script src='myscript.js'>",
        choice4:"<script file='myscript.js'>",
        answer:3

    },
    {
        question:"How do you write 'Hellow world' in an alert box",
        choice1:"msgBox('Hellow world');",
        choice2:"alertBox('Hellow world');",
        choice3:"msg('Hellow world');",
        choice4:"alert('Hellow world');",
        answer:1
    }
];

const CORRECT_BONUS = 10;
const MAX_QUESTIONS=3;

startGame=() => {
    questionCounter=0;
    score=0;
    availableQuestions=[...questions];
    getNewQuestion();
};

getNewQuestion=() =>{

    if(availableQuestions.length==0 ||questionCounter>=MAX_QUESTIONS)
    {
        localStorage.setItem("mostRecentScore",score);
        return window.location.assign("/end.html");
    }
    questionCounter++;
    questionCounterText.innerText= `${questionCounter} / ${+MAX_QUESTIONS}`;
    
    const questionIndex=Math.floor(Math.random()* availableQuestions.length);
    currentQuestion=availableQuestions[questionIndex];
    question.innerText=currentQuestion.question;

    choices.forEach(choice=>{
        const number=choice.dataset["number"];
        choice.innerText=currentQuestion["choice" + number];
    });

    availableQuestions.splice(questionIndex, 1);
    acceptingAnswers=true;
};

choices.forEach(choice=>{
    choice.addEventListener("click",e =>{
        if(!acceptingAnswers) return;

        acceptingAnswers=false;
        const selectedChoice =e.target;
        const selectedAnswer =selectedChoice.dataset["number"];

        const classToApply= selectedAnswer==currentQuestion.answer?"correct" :"incorrect";

        if(classToApply=="correct"){
            incrementScore(CORRECT_BONUS);
        }

        selectedChoice.parentElement.classList.add(classToApply);

        setTimeout(()=>{
            selectedChoice.parentElement.classList.remove(classToApply);
            getNewQuestion();
        },1000);

    });
});

incrementScore=num=>{
    score+=num;
    scoreText.innerText=score;
};

startGame();







