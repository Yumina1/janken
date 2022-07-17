'use strict';
const cards = document.querySelectorAll('.card');
const gameCounter = document.querySelector('.gamecount');
const star = document.querySelector('.star');
const starCpu = document.querySelector('.starcpu');
const gameover = document.querySelector('.gameover');
const gameclear = document.querySelector('.gameclear');
const reset = document.querySelector('.reset');
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
    reset.classList.add('hidden');
    overlay.classList.add('hidden');
    myCard.textContent = '';
    cpuCard.textContent = '';
    star.innerHTML = `<span>⭐️</span><span>⭐️</span><span>⭐️</span>`;
    starCpu.innerHTML = `<span>⭐️</span><span>⭐️</span><span>⭐️</span>`;
    cards.forEach(function (_, i, arr) {
        arr[i].classList.remove('hidden')
    });
};

init();

cards.forEach(function (_, i, arr) {
    const setCard = ` <div class ="setcard">?<br>?</div>`;
    const setCardCpu = ` <div class ="setcard_cpu">?<br>?</div>`;
    //hiding used cards
    arr[i].addEventListener('click', function () {
        arr[i].classList.add('hidden');
        //set cards display open button
        displayResult.textContent = 'SET';
        myCard.innerHTML = setCard;
        cpuCard.innerHTML = setCardCpu;
        overlay.classList.remove('hidden');
        openCards.classList.remove('hidden');
    });
});

const R_Click = function (me_janken) {
    gameCounter.textContent = `GAME${gameCount++}`;
    const janken2 = Math.trunc(Math.random() * janken.length - 1);
    //win or lose draw=1 win=2 lose=3
    if (janken[janken2] === me_janken) {
        result = 1;
    } else if (me_janken === "✊" && janken[janken2] === "✌️" || me_janken === "✌️" && janken[janken2] === "🖐" || me_janken === "🖐" && janken[janken2] === "✊") {
        result = 2;
        currentStar += 1;
        currentStarCpu -= 1;
    } else {
        result = 3;
        currentStar -= 1;
        currentStarCpu += 1;
    };
    curentCard = me_janken;
    curentCpu = janken[janken2];
    janken.splice(janken2, 1);
};

const opening = function () {
    overlay.classList.add('hidden');
    //remove open button
    openCards.classList.add('hidden');
    //display result
    let gcp, mygcp;
    if (curentCpu === "✊") gcp = 'G';
    if (curentCpu === "✌️") gcp = 'C';
    if (curentCpu === "🖐") gcp = 'P';
    const displayCpuCard = ` <div class ="display_cpucard">${gcp}<br>${curentCpu}</div>`;

    if (curentCard === "✊") mygcp = 'G';
    if (curentCard === "✌️") mygcp = 'C';
    if (curentCard === "🖐") mygcp = 'P';
    const displayMyCard = ` <div class ="display_mycard">${mygcp}<br>${curentCard}</div>`;

    myCard.innerHTML = displayMyCard;
    cpuCard.innerHTML = displayCpuCard;
    const starHtml = `<span>⭐️</span>`;

    const resetModal = function () {
        if (!janken.length) {
            reset.classList.remove('hidden');
            overlay.classList.remove('hidden');
        };
    };

    if (result === 1) {
        displayResult.textContent = 'DRAW';
        setTimeout(resetModal, 800);
    } else if (result === 2) {
        displayResult.textContent = 'WIN ⭐️+1';
        star.insertAdjacentHTML('beforeend', starHtml)
        starCpu.lastElementChild.remove();
        if (!currentStarCpu) {
            const crearModal = function () {
                gameclear.classList.remove('hidden');
                overlay.classList.remove('hidden');
            };
            setTimeout(crearModal, 800);
        } else if (currentStarCpu) {
            setTimeout(resetModal, 800);
        };
    } else if (result === 3) {
        displayResult.textContent = 'LOSE ⭐️-1';
        starCpu.insertAdjacentHTML('beforeend', starHtml)
        star.lastElementChild.remove();
        if (!currentStar) {
            const overModal = function () {
                gameover.classList.remove('hidden');
                overlay.classList.remove('hidden');
            };
            setTimeout(overModal, 800);
        } else if (currentStar) {
            setTimeout(resetModal, 800);
        };
    };

};

openCards.addEventListener('click', opening);

refresh.forEach(function (_, i) {
    refresh[i].addEventListener('click', init);
});