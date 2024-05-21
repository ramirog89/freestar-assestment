const BlackJack = require('./modules/blackjack').BlackJack;

const blackJack = new BlackJack();

document.getElementById('startGame').addEventListener('click', blackJack.start);
document.getElementById('hit').addEventListener('click', blackJack.hit);
document.getElementById('stand').addEventListener('click', blackJack.stand);
