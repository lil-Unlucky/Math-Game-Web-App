const app = document.querySelector('.math-game-app');
if(app) {
    let difficult = 'Easy';
    const mathOperators = ['+', '-', '*', '/',];
    const firstNum = document.querySelector('.firstNum');
    const mathOperator = document.querySelector('.mathOperator');
    const secondNum = document.querySelector('.secondNum');

    const mathCounters = {
        global: {
            everyAnsw: parseInt(localStorage.getItem('everyAnsw')) || 0,
            skipedAnsw: parseInt(localStorage.getItem('skipedAnsw')) || 0,
            correctAnsw: parseInt(localStorage.getItem('correctAnsw')) || 0,
            wrongAnsw: parseInt(localStorage.getItem('wrongAnsw')) || 0,
        },
        session: {
            everyAnsw: 0,
            skipedAnsw: 0,
            correctAnsw: 0,
            wrongAnsw: 0,
        }
    }

    // mathCounters.global
    const globalStatEvery = document.querySelector('.everyAnsw.global');
    const globalStatSkiped = document.querySelector('.skipedAnsw.global');
    const globalStatCorrect = document.querySelector('.correctAnsw.global');
    const globalStatWrong = document.querySelector('.wrongAnsw.global');
    // mathCounters.session
    const sessionStatEvery = document.querySelector('.sessionEveryAnsw');
    const sessionStatSkiped = document.querySelector('.sessionSkipedAnsw');
    const sessionStatCorrect = document.querySelector('.sessionCorrectAnsw');
    const sessionStatWrong = document.querySelector('.sessionWrongAnsw');
    // updating value every 200ms
    setInterval(() => {
        globalStatEvery.innerHTML = localStorage.getItem('everyAnsw');
        globalStatSkiped.innerHTML = localStorage.getItem('skipedAnsw');
        globalStatCorrect.innerHTML  = localStorage.getItem('correctAnsw');
        globalStatWrong.innerHTML = localStorage.getItem('wrongAnsw');

        sessionStatEvery.innerHTML = mathCounters.session.everyAnsw;
        sessionStatSkiped.innerHTML = mathCounters.session.skipedAnsw;
        sessionStatCorrect.innerHTML  = mathCounters.session.correctAnsw;
        sessionStatWrong.innerHTML = mathCounters.session.wrongAnsw; 
    }, 200);

    setRandomMath(mathOperator, mathOperators, firstNum, secondNum, difficult);

    const main = document.querySelector('.main');
    const inputAnswer = document.querySelector('.answer-text-input');
    const enterAnswerBtn = document.querySelector('.enter-answer-button');

    enterAnswerBtn.addEventListener('click', event => {
        event.preventDefault();
        const num1 = parseInt(firstNum.innerHTML);
        const op = mathOperator.innerHTML;
        const num2 = parseInt(secondNum.innerHTML);
        let mathAnswer;

        switch (op) {
            case '+':
                mathAnswer = num1 + num2;
                break;
            case '-':
                mathAnswer = num1 - num2;
                break;
            case '*':
                mathAnswer = num1 * num2;
                break;
            case '/':
                mathAnswer = (num1 / num2).toFixed(2);
                break;
            default:
                break;
        }

        const text = document.querySelector('.text');

        if(inputAnswer.value == mathAnswer) {
            mathCounters.global.everyAnsw++, mathCounters.global.correctAnsw++;
            mathCounters.session.everyAnsw++, mathCounters.session.correctAnsw++;

            localStorage.setItem('everyAnsw', mathCounters.global.everyAnsw.toString());
            localStorage.setItem('correctAnsw', mathCounters.global.correctAnsw.toString());

            setRandomMath(mathOperator, mathOperators, firstNum, secondNum, difficult);

            // Show correct tab
            correctAnswerTab(main);

        } else if (inputAnswer.value == '') {
            inputAnswer.style.border = '1px solid red';
            text.style.display = 'flex';
        } else {
            mathCounters.global.everyAnsw++, mathCounters.global.wrongAnsw++;
            mathCounters.session.everyAnsw++, mathCounters.session.wrongAnsw++;

            localStorage.setItem('everyAnsw', mathCounters.global.everyAnsw.toString());
            localStorage.setItem('wrongAnsw', mathCounters.global.wrongAnsw.toString());

            setRandomMath(mathOperator, mathOperators, firstNum, secondNum, difficult);

            // Show wrong tab
            wrongAnswerTab(main);
        }

        inputAnswer.addEventListener('keydown', () => {
            inputAnswer.style.border = 'none';
            text.style.display = 'none';
        });

        inputAnswer.value = '';
    });

    const newMathBtn = document.querySelector('.change-math-btn');
    newMathBtn.onclick = () => {
        inputAnswer.value = '';
        mathCounters.global.everyAnsw++, mathCounters.global.skipedAnsw++;
        mathCounters.session.everyAnsw++, mathCounters.session.skipedAnsw++;

        localStorage.setItem('everyAnsw', mathCounters.global.everyAnsw.toString());
        localStorage.setItem('skipedAnsw', mathCounters.global.skipedAnsw.toString());

        setRandomMath(mathOperator, mathOperators, firstNum, secondNum, difficult);

        // Show skip tab
        skipAnswerTab(main);
    };

    const showStatsBtn = document.querySelector('.show-stats');
    const statsPanel = document.querySelector('.game-stats-info');
    showStatsBtn.addEventListener('click', () => {
        statsPanel.classList.toggle('active');
        (statsPanel.classList.contains('active')) ? showStatsBtn.innerHTML = 'Hide stats' : showStatsBtn.innerHTML = 'Show stats';
    });

    const diffSelector = document.querySelector('#diff');
    diffSelector.addEventListener('change', () => {
        difficult = diffSelector.value;
    });
}

function setRandomMath(mathOperator, mathOperators, num1, num2, difficult) {
    const randomMathOperator = mathOperators[Math.floor(Math.random() * mathOperators.length)];
    mathOperator.innerHTML = randomMathOperator;

    let min, max;
    switch (difficult) {
        case 'Easy':
            min = 10;
            max = 100;
            break;
        case 'Medium':
            min = 30;
            max = 500;
            break;
        case 'Hard':
            min = 100;
            max = 1000;
            break;
        default:
            min = 10;
            max = 100;
            break;
    }

    let randValue1 = Math.floor(Math.random() * (max - min + 1) + min);
    let randValue2 = Math.floor(Math.random() * (max - min + 1) + min);
    num1.innerHTML = randValue1;
    num2.innerHTML = randValue2;
}

function correctAnswerTab(mainBlock) {
    const correctAnswerMiniTab = document.createElement('div');
    correctAnswerMiniTab.className = ('correctAnswer miniTab');

    correctAnswerMiniTab.innerHTML = 
    `
    <div class="correctAnswTab miniTab">
        <i class="ri-thumb-up-line firstSym"></i>
        <h3 class="innerText">Correct <i class="ri-emotion-happy-fill"></i></h3>
    </div>
    `;
    mainBlock.appendChild(correctAnswerMiniTab);
    setTimeout(() => {
        correctAnswerMiniTab.remove();
    }, 2750);
}

function wrongAnswerTab(mainBlock) {
    const wrongAnswerMiniTab = document.createElement('div');
    wrongAnswerMiniTab.className = ('wrongAnswer miniTab');

    wrongAnswerMiniTab.innerHTML = 
    `
    <div class="wrongAnswTab miniTab">
        <i class="ri-thumb-down-line firstSym"></i>
        <h3 class="innerText">Wrong <i class="ri-emotion-sad-fill"></i></h3>
    </div>
    `;
    mainBlock.appendChild(wrongAnswerMiniTab);
    setTimeout(() => {
        wrongAnswerMiniTab.remove();
    }, 2750);
}

function skipAnswerTab(mainBlock) {
    const skipAnswerMiniTab = document.createElement('div');
    skipAnswerMiniTab.className = ('skipAnswer miniTab');

    skipAnswerMiniTab.innerHTML = 
    `
    <div class="skipAnswTab miniTab">
        <i class="ri-arrow-go-forward-line firstSym"></i>
        <h3 class="innerText">Skip <i class="ri-time-fill"></i></h3>
    </div>
    `;
    mainBlock.appendChild(skipAnswerMiniTab);
    setTimeout(() => {
        skipAnswerMiniTab.remove();
    }, 2750);
}