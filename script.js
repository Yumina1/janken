
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
const setCard = ` <div class ="setcard">?<br>?</div>`;
const setCardCpu = ` <div class ="setcard_cpu">?<br>?</div>`;

let currentStar = 3;
let currentStarCpu = 3;
let gameCount = 1;
let result = '';
const janken = ["✊", "✊", "✊", "✊", "✌️", "✌️", "✌️", "✌️", "🖐", "🖐", "🖐", "🖐"];



cards.forEach(function (_, i) {
    //display own cars
    cards[i].addEventListener('click', function () {
        cards[i].classList.add('hidden');
        //set cards veiw open button
        displayResult.textContent = 'SET';
        myCard.innerHTML = setCard;
        cpuCard.innerHTML = setCardCpu;
        overlay.classList.remove('hidden');
        openCards.classList.remove('hidden');
        console.log(_.textContent, i);

    });
});



let R_Click = function (me_janken) {
    console.log(me_janken);

    openCards.addEventListener('click', function () {
        // const me_janken = '✊';
        gameCounter.textContent = `GAME${gameCount++}`;
        overlay.classList.add('hidden');
        //remove open button
        openCards.classList.add('hidden');
        // debugger;
        //decide cpu card
        const janken2 = Math.trunc(Math.random() * janken.length - 1);
        //win or lose 
        if (janken[janken2] === me_janken) {
            result = 'DRAW';
        } else if (me_janken === "✊" && janken[janken2] === "✌️" || me_janken === "✌️" && janken[janken2] === "🖐" || me_janken === "🖐" && janken[janken2] === "✊") {
            result = 'WIN ⭐️+1';
            currentStar = currentStar += 1;
            currentStarCpu = currentStarCpu -= 1;
            if (currentStarCpu <= 0) {
                gameclear.classList.remove('hidden');
                overlay.classList.remove('hidden');
            };
            console.log('win', currentStar, currentStarCpu);
            star.textContent = `⭐️${currentStar}`;
            starCpu.textContent = `⭐️${currentStarCpu}`;
        } else {
            result = 'LOSE ⭐️-1'
            currentStar = currentStar -= 1;
            if (currentStar <= 0) {
                gameover.classList.remove('hidden');
                overlay.classList.remove('hidden');
            };
            currentStarCpu = currentStarCpu += 1;
            console.log('lose', currentStar, currentStarCpu);
            star.textContent = `⭐️${currentStar}`;
            starCpu.textContent = `⭐️${currentStarCpu}`;
        };
        //display result
        console.log(currentStar, currentStarCpu);
        let gcp = '';
        if (janken[janken2] === "✊") gcp = 'G';
        if (janken[janken2] === "✌️") gcp = 'C';
        if (janken[janken2] === "🖐") gcp = 'P';

        const displayCpuCard = ` <div class ="display_cpucard">
          ${gcp}<br>${janken[janken2]}
        </div>`;

        let mygcp = '';
        if (me_janken === "✊") mygcp = 'G';
        if (me_janken === "✌️") mygcp = 'C';
        if (me_janken === "🖐") mygcp = 'P';

        const displayMyCard = ` <div class ="display_mycard">
        ${mygcp}<br>${me_janken}
      </div>`;

        myCard.innerHTML = displayMyCard;
        cpuCard.innerHTML = displayCpuCard;
        displayResult.textContent = result;
        //teke out array value
        janken.splice(janken2, 1);
    });
};











