class Player {
  name = '';
  hand = [];

  constructor(name) {
    this.name = name;
  }

  getHandTotal = () => {
    let total = this.hand.reduce((acc, card) => acc + card.weight, 0);
    let aces = this.hand.filter(card => card.value === "A").length;
    while (this.total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
  }
}

module.exports = { Player };
