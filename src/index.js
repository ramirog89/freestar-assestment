const GameService = require('./modules/services/game').GameService;

const game = new GameService();

document.getElementById('startGame').addEventListener('click', game.start);
document.getElementById('hit').addEventListener('click', game.hit);
document.getElementById('stand').addEventListener('click', game.stand);