'use strict';
const gameCounter = document.querySelector('.gamecount');
const cards = document.querySelectorAll('.card');
const star = document.querySelector('.star');
const starCpu = document.querySelector('.starcpu');
const gameover = document.querySelector('.gameover');
const gameclear = document.querySelector('.gameclear');
const overlay = document.querySelector('.overlay');
const cpuCard = document.querySelector('.cpu');
const myCard = document.querySelector('.mycard');
const displayResult = document.querySelector('.result');
const openCards = document.querySelector('.open_cards');
const refresh = document.querySelectorAll('.refresh');

let janken, currentStar, currentStarCpu, gameCount, result, curentCpu, curentCard;

const init = function () {
    //internal value
    janken = ["✊", "✊", "✊", "✊", "✌️", "✌️", "✌️", "✌️", "🖐", "🖐", "🖐", "🖐"];
    currentStar = 3;
    currentStarCpu = 3;
    gameCount = 1;

    //display
    displayResult.textContent = 'Chose Your Card to Start';
    gameCounter.textContent = '';
    gameclear.classList.add('hidden');
    gameover.classList.add('hidden');
    overlay.classList.add('hidden');
    myCard.textContent = '';
    cpuCard.textContent = '';
    star.textContent = `⭐️${currentStar}`;
    starCpu.textContent = `⭐️${currentStarCpu}`;
    cards.forEach(function (_, i) {
        cards[i].classList.remove('hidden')
    });
};

init();

cards.forEach(function (_, i) {
    //display own cars
    cards[i].addEventListener('click', function () {
        cards[i].classList.add('hidden');
        //set cards display open button
        displayResult.textContent = 'SET';
        const setCard = ` <div class ="setcard">?<br>?</div>`;
        const setCardCpu = ` <div class ="setcard_cpu">?<br>?</div>`;
        myCard.innerHTML = setCard;
        cpuCard.innerHTML = setCardCpu;
        overlay.classList.remove('hidden');
        openCards.classList.remove('hidden');
    });
});

const R_Click = function (me_janken) {
    gameCounter.textContent = `GAME${gameCount++}`;
    const janken2 = Math.trunc(Math.random() * janken.length - 1);

    //win or lose 
    if (janken[janken2] === me_janken) {
        result = 'DRAW';
    } else if (me_janken === "✊" && janken[janken2] === "✌️" || me_janken === "✌️" && janken[janken2] === "🖐" || me_janken === "🖐" && janken[janken2] === "✊") {
        result = 'WIN ⭐️+1';
        currentStar = currentStar += 1;
        currentStarCpu = currentStarCpu -= 1;
    } else {
        result = 'LOSE ⭐️-1'
        currentStar = currentStar -= 1;
        currentStarCpu = currentStarCpu += 1;
    };

    curentCard = me_janken;
    curentCpu = janken[janken2];
    console.log(curentCpu);
    janken.splice(janken2, 1);
};

const opening = function () {
    overlay.classList.add('hidden');
    //remove open button
    openCards.classList.add('hidden');
    //display result
    console.log(currentStar, currentStarCpu);
    let gcp = '';
    if (curentCpu === "✊") gcp = 'G';
    if (curentCpu === "✌️") gcp = 'C';
    if (curentCpu === "🖐") gcp = 'P';
    const displayCpuCard = ` <div class ="display_cpucard">${gcp}<br>${curentCpu}</div>`;

    let mygcp = '';
    if (curentCard === "✊") mygcp = 'G';
    if (curentCard === "✌️") mygcp = 'C';
    if (curentCard === "🖐") mygcp = 'P';

    const displayMyCard = ` <div class ="display_mycard">${mygcp}<br>${curentCard}</div>`;

    myCard.innerHTML = displayMyCard;
    cpuCard.innerHTML = displayCpuCard;
    displayResult.textContent = result;

    star.textContent = `⭐️${currentStar}`;
    starCpu.textContent = `⭐️${currentStarCpu}`;

    if (currentStarCpu <= 0) {
        gameclear.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };
    if (currentStar <= 0) {
        gameover.classList.remove('hidden');
        overlay.classList.remove('hidden');
    };
};

openCards.addEventListener('click', opening);
refresh.forEach(function (_, i) {
    refresh[i].addEventListener('click', init);
});