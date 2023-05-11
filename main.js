/* All answer options */
const option1 = document.querySelector('.option1'),
      option2 = document.querySelector('.option2'),
      option3 = document.querySelector('.option3'),
      option4 = document.querySelector('.option4');

/* All our options */

const optionElements = document.querySelectorAll('.option');

const question = document.getElementById('question'); //сам вопрос

const numberOfQuestion = document.getElementById('number-of-question'), //номер вопроса
      numberOfAllQuestions = document.getElementById('number-of-all-questions'); //колиичество всех вопросов

let indexOfQuestion, //индекс текущего вопроса
    indexOfPage = 0; //индекс страницы

const answersTracker = document.getElementById('answers-tracker'); //обертка для трекера
const btnNext = document.getElementById('btn-next'); //кнопка далее

let score = 0; // итоговый результат викторины

const correctAnswer = document.getElementById('correct-answer'), //количество правильных ответов
      numberOfAllQuestions2 = document.getElementById('number-of-all-questions-2'), //количество всех вопросов (в модальном окне)
      btnTryAgain = document.getElementById('btn-try-again'); // кнопка "начать викторину заново"

const questions = [
    {
        question: 'Какие значения можно хранить в переменных?',
        options: [
            'Строки, числа с точкой и простые числа',
            'Только числа и строки',
            'Строки, числа с точкой, простые числа и булевые выражения',
            'Нету ответа',
        ],
        rightAnswer: 2
    },
    {
        question: 'Какая переменная записана неверно?',
        options: [
            'var num = "STRING";',
            'var b = false;',
            'var isDone = 0;',
            'var number = 12,5;',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие циклы есть в языке JavaScript?',
        options: [
            'for, forMap, foreach, while',
            'for, forMap, foreach, while, do while',
            'for, while, do while, foreach',
            'for, while, do while',
        ],
        rightAnswer: 3
    },
    {
        question: 'Какие функции выполняет JS?',
        options: [
            'Выполняет работу с сервером',
            'Отвечает за функции на стороне клиента',
            'Отвечает за работу с базами данных',
            'Создает стилевое оформление сайта',
        ],
        rightAnswer: 1
    },
    {
        question: 'В чем отличие между локальной и глобальной переменной?',
        options: [
            'Локальные видны повсюду, глобальные только в функциях',
            'Глобальные можно переопределять, локальные нельзя',
            'Глобальные видны повсюду, локальные только в функциях',
            'Локальные можно переопределять, глобальные нельзя',
        ],
        rightAnswer: 2
    }
];

numberOfAllQuestions.innerHTML = questions.length; // выводим количество вопросов

const load = () => {
    question.innerHTML = questions[indexOfQuestion].question; // сам вопрос

    //мапим ответы

    option1.innerHTML = questions[indexOfQuestion].options[0];
    option2.innerHTML = questions[indexOfQuestion].options[1];
    option3.innerHTML = questions[indexOfQuestion].options[2];
    option4.innerHTML = questions[indexOfQuestion].options[3];

    numberOfQuestion.innerHTML = indexOfPage + 1; //установка номера текущей страницы
    indexOfPage++; // увеличение индекса страницы


};

let completedAnswers = [] // массив для уже заданных вопросов

const randomQuestion = () => {
    let randomNumber = Math.floor(Math.random() * questions.length);
    let hitDublicate = false; // корь для проверки одинаковых вопросов

    if (indexOfPage == questions.length){
        quizOver()
    }else {
        if (completedAnswers.length > 0){
            completedAnswers.forEach(item => {
                if (item == randomNumber){
                    hitDublicate = true;
                }
            });
            if (hitDublicate){
                randomQuestion();
            }else {
                indexOfQuestion = randomNumber;
                load();
            }
        }
        if (completedAnswers.length == 0){
            indexOfQuestion = randomNumber;
            load();
        }
    }
    completedAnswers.push(indexOfQuestion);
};

const checkAnswer = el => {
    if (el.target.dataset.id == questions[indexOfQuestion].rightAnswer){
        el.target.classList.add('correct');
        updateAnswerTracker('correct');
        score++;
    }else {
        el.target.classList.add('wrong');
        updateAnswerTracker('wrong');
    }
    disabledOptions();
}

for (option of optionElements){
    option.addEventListener('click', e => checkAnswer(e));
}

const disabledOptions = () => {
    optionElements.forEach(item => {
        item.classList.add('disabled');
        if (item.dataset.id == questions[indexOfQuestion].rightAnswer){
            item.classList.add('correct');
        }
    })
}

const answerTracker = () => {
    questions.forEach(() => {
        const div = document.createElement('div');
        answersTracker.appendChild(div);
    })
}

const updateAnswerTracker = status => {
    answersTracker.children[indexOfPage - 1].classList.add(`${status}`);
}

const validate = () => {
    if (!optionElements[0].classList.contains('disabled')){
        alert('Вам нужно выбрать один из вариатов ответа');
    }else {
        randomQuestion();
        enableOptions();
    }
}

//удаление всех классов со всех ответов
const enableOptions = () => {
    optionElements.forEach(item => {
        item.classList.remove('disabled', 'correct', 'wrong');
    })
}

const quizOver = () => {
    document.querySelector('.quiz-over-modal').classList.add('active');
    correctAnswer.innerHTML = score;
    numberOfAllQuestions2.innerHTML = questions.length;
};

const tryAgain = () => {
    window.location.reload();
}

btnTryAgain.addEventListener('click', tryAgain);

btnNext.addEventListener('click', () => {
    validate();
})

window.addEventListener('load', () => {
    randomQuestion();
    answerTracker();
})