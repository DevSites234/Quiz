const quizContainer = document.getElementById('quiz');
const nextButton = document.getElementById('next');
const resultsContainer = document.getElementById('results');
const correctCountSpan = document.getElementById('correctCount');
const incorrectCountSpan = document.getElementById('incorrectCount');
const lifeElements = [document.getElementById('life1'), document.getElementById('life2'), document.getElementById('life3')];

let currentQuestionIndex = 0;
let correctCount = 0;
let incorrectCount = 0;
let lives = 3;

const myQuestions = [
    {
        question: "Qual a velocidade do som?",
        answers: {
            a: "3000 km/h",
            b: "1500 km/h",
            c: "250 M/s",
            d: "340 M/s"
        },
        correctAnswer: "d"
    },
    {
        question: "Quantas placas tectônicas existem?",
        answers: {
            a: "65",
            b: "45",
            c: "52",
            d: "50"
        },
        correctAnswer: "c"
    },
    {
        question: "Quem criou a tecnologia Touch Screen?",
        answers: {
            a: "Federico Faggin",
            b: "Charles Babbage",
            c: "Eric A. Johnson",
            d: "Steve Jobs"
        },
        correctAnswer: "c"
    },
    {
        question: "Qual é a função de uma linguagem de programação?",
        answers: {
            a: "Criar Códigos",
            b: "Se comunicar com o computador",
            c: "Traduzir o código escrito para linguagem binária",
            d: "Permitir o entendimento entre o programador e a máquina"
        },
        correctAnswer: "d"
    },
    {
        question: "Quem foi o primeiro homem a ir ao espaço?",
        answers: {
            a: "Buzz Aldrin",
            b: "Yuri Gagarin",
            c: "Neil Armstrong",
            d: "Michael Collins"
        },
        correctAnswer: "b"
    },
    {
        question: "Qual a porcentagem de água no corpo humano?",
        answers: {
            a: "100%",
            b: "30%",
            c: "15%",
            d: "70%"
        },
        correctAnswer: "d"
    },
    {
        question: "Como surgiu a Internet?",
        answers: {
            a: "Por meio de um programa do exército americano para comunicação",
            b: "Surgiu como uma tentativa de melhorar a rede de telefone",
            c: "Foi criada por Isaac Newton",
            d: "A Apple criou"
        },
        correctAnswer: "a"
    },
    {
        question: "Qual foi o primeiro videogame doméstico da história?",
        answers: {
            a: "Atari 2600",
            b: "Magnavox Odyssey",
            c: "Gameboy",
            d: "Master System"
        },
        correctAnswer: "b"
    },
    {
        question: "Quantas vezes o planeta Terra já passou por uma extinção em massa?",
        answers: {
            a: "5 vezes",
            b: "6 vezes",
            c: "1 vez",
            d: "Nenhuma vez"
        },
        correctAnswer: "b"
    },
    {
        question: "De onde é a invenção do chuveiro elétrico?",
        answers: {
            a: "França",
            b: "Inglaterra",
            c: "Brasil",
            d: "Austrália"
        },
        correctAnswer: "c"
    },
    {
        question: "Quantos bits cabem em um byte?",
        answers: {
            a: "12 bits",
            b: "4 bits",
            c: "10 bits",
            d: "8 bits"
        },
        correctAnswer: "d"
    },
    {
        question: "O que USB corresponde?",
        answers: {
            a: "Universal Series Bite",
            b: "Universal Serial Bus",
            c: "Universal Surround Bestow",
            d: "Universal Send Byte"
        },
        correctAnswer: "b"
    },
    {
        question: "Qual é o jogo mais vendido do mundo?",
        answers: {
            a: "Minecraft",
            b: "Gta 5",
            c: "Tetris",
            d: "PlayerUnknown's Battlegrounds"
        },
        correctAnswer: "a"
    },
    {
        question: "Quem criou os gráficos 3D?",
        answers: {
            a: "Jay Forrester e Robert Everett",
            b: "Bill Gates e Steve Jobs",
            c: "Timothy John Berners-Lee e Ray Tomlinson",
            d: "Ken Kutaragi"
        },
        correctAnswer: "d"
    },
    {
        question: "Dentre as linguagens de programação, qual é conhecida pelo slogan 'Escreva uma vez, execute em qualquer lugar'?",
        answers: {
            a: "PHP",
            b: "Java",
            c: "C#",
            d: "Python"
        },
        correctAnswer: "b"
    }


];

function buildQuestion() {
    const currentQuestion = myQuestions[currentQuestionIndex];
    const answers = [];

    for (letter in currentQuestion.answers) {
        answers.push(
            `<li>
                <button name="question${currentQuestionIndex}" value="${letter}">
                    ${currentQuestion.answers[letter]}
                </button>
            </li>`
        );
    }

    quizContainer.innerHTML = `
        <div class="question">${currentQuestion.question}</div>
        <ul class="answers">${answers.join('')}</ul>
    `;

    nextButton.disabled = true;
    nextButton.style.backgroundColor = '#666'; // Cor cinza
}

function showNextQuestion() {
    currentQuestionIndex++;
    if (currentQuestionIndex < myQuestions.length) {
        buildQuestion();
    } else {
        showResults();
    }
}

function showResults() {
    quizContainer.innerHTML = '';
    resultsContainer.innerHTML = `
        <h2>Fim do Quiz!</h2>
        <img src="acertou.png" alt="Imagem de Acertou"style="width: 200px; height: 160;">
        <br>
        <p>Você acertou ${correctCount} de ${myQuestions.length} perguntas.</p>
        <button id="retry">Refazer</button>
        <button id="exit">Sair</button>
    `;
    resultsContainer.classList.add('active');

    document.getElementById('retry').addEventListener('click', resetQuiz);
    document.getElementById('exit').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    nextButton.style.display = 'none';
}


function showGameOver() {
    quizContainer.innerHTML = '';
    resultsContainer.innerHTML = `
        <h2>Você perdeu todas as suas vidas!</h2>
        <img src="perdeu.png" alt="Imagem de Game Over" style="width: 200px; height: 160;">
        <br>
        <button id="retry">Refazer</button>
        <button id="exit">Sair</button>
    `;
    resultsContainer.classList.add('active');

    document.getElementById('retry').addEventListener('click', resetQuiz);
    document.getElementById('exit').addEventListener('click', () => {
        window.location.href = 'index.html';
    });

    nextButton.style.display = 'none';
}




function resetQuiz() {
    currentQuestionIndex = 0;
    correctCount = 0;
    incorrectCount = 0;
    lives = 3;
    correctCountSpan.textContent = correctCount;
    incorrectCountSpan.textContent = incorrectCount;
    lifeElements.forEach(life => life.style.display = 'inline');
    resultsContainer.classList.remove('active');
    nextButton.style.display = 'inline';
    buildQuestion();
}

quizContainer.addEventListener('click', function (e) {
    if (e.target.tagName === 'BUTTON') {
        const answerContainer = quizContainer.querySelector('.answers');
        const userAnswer = e.target.value;
        const correctAnswer = myQuestions[currentQuestionIndex].correctAnswer;

        if (userAnswer === correctAnswer) {
            correctCount++;
            e.target.classList.add('correct');
        } else {
            incorrectCount++;
            lives--;
            e.target.classList.add('incorrect');
            answerContainer.querySelector(`[value=${correctAnswer}]`).classList.add('correct-answer');
            lifeElements[lives].style.display = 'none';

            if (lives === 0) {
                showGameOver();
                return;
            }
        }

        correctCountSpan.textContent = correctCount;
        incorrectCountSpan.textContent = incorrectCount;

        answerContainer.querySelectorAll('button').forEach(button => {
            button.disabled = true;
        });

        nextButton.disabled = false;
        nextButton.style.backgroundColor = '#00ff00'; // Cor verde
    }
});

nextButton.addEventListener('click', showNextQuestion);

buildQuestion();
