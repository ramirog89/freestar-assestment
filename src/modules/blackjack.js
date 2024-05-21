const { Deck } = require('./deck');
const { Player } = require('./player');
const { Game } = require('./game');

class BlackJack {
  game   = new Game();
  deck   = new Deck();
  player = new Player('Player');
  dealer = new Player('Dealer');

  start = () => {
    this.deck.create();
    this.deck.shuffle();
    this.player.hand = [this.deck.getCard(), this.deck.getCard()];
    this.dealer.hand = [this.deck.getCard(), this.deck.getCard()];
    this.game.start(this.player, this.dealer);
  }

  hit = () => {
    this.player.hand.push(this.deck.getCard());
    this.game.renderHands(this.player, this.dealer);
    if (this.player.getHandTotal() > 21) {
      this.game.end(this.player, this.dealer, this.getWinner());
    }
  }

  stand = () => {
    while (this.dealer.getHandTotal() < 17) {
      this.dealer.hand.push(this.deck.getCard());
    }
    this.game.end(this.player, this.dealer, this.getWinner());
  }

  getWinner = () => {
    if (this.player.total > 21) {
      return this.player.name;
    } else if (this.dealer.total > 21) {
      return this.player.name;
    } else if (this.player.total > this.dealer.total) {
      return this.player.name;
    } else if (this.dealer.total > this.player.total) {
      return this.dealer.name;
    } else {
      return 'Tie';
    }
  }
}

module.exports = { BlackJack };
