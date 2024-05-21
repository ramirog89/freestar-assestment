const { suits, values, Card } = require('./card');

class Deck {
  cards = [];

  create = () => {
    this.cards = [];
    for (let suit of suits) {
      for (let card of values) {
        this.cards.push(new Card(suit, card.value, card.weight));
      }
    }
  }

  shuffle = () => {
    for (let i = 0; i < this.cards.length; i++) {
      let swapIdx = Math.trunc(Math.random() * this.cards.length);
      let tmp = this.cards[swapIdx];
      this.cards[swapIdx] = this.cards[i];
      this.cards[i] = tmp;
    }
  }

  getCard = () => {
    return this.cards.pop();
  }

}

module.exports = { Deck };
