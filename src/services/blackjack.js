class BlackJackService {

  constructor(game, deck, player, dealer) {
    this.game = game;
    this.deck = deck;
    this.player = player;
    this.dealer = dealer;
  }
  
  bind = () => {
    this.game.setup(this.start, this.hit, this.stand);
  }

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
    if (this.player.getHandTotal() > 21) {
      return this.dealer.name;
    } else if (this.dealer.getHandTotal() > 21) {
      return this.player.name;
    } else if (this.player.getHandTotal() > this.dealer.getHandTotal()) {
      return this.player.name;
    } else if (this.dealer.getHandTotal() > this.player.getHandTotal()) {
      return this.dealer.name;
    }

    return 'Tie';
  }
}

module.exports = { BlackJackService };
