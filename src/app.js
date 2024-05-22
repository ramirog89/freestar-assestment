const Deck = require('./entities/deck').Deck;
const Player = require('./entities/player').Player;
const GameService = require('./services/game').GameService;
const BlackJackService = require('./services/blackjack').BlackJackService;

const blackJack = new BlackJackService(
  new GameService(),
  new Deck(),
  new Player('Player'),
  new Player('Dealer'),
);

blackJack.bind();