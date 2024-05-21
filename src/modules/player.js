class Player {
  name = '';
  hand = [];
  total = 0;

  constructor(name) {
    this.name = name;
  }

  getHandTotal = () => {
    this.total = this.hand.reduce((acc, card) => acc + card.weight, 0);
    let aces = this.hand.filter(card => card.value === "A").length;
    while (this.total > 21 && aces > 0) {
        this.total -= 10;
        aces -= 1;
    }
    return this.total;
  }
  
  handToString = () => {
    return this.hand.map(card => `${card.value} of ${card.suit}`).join(', ');
  }
}

module.exports = { Player };
