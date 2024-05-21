class Player {
  name = '';
  hand = [];
  total = 0;

  constructor(name) {
    this.name = name;
  }

  getHandTotal = () => {
    let total = this.hand.reduce((acc, card) => acc + card.Weight, 0);
    let aces = this.hand.filter(card => card.Value === "A").length;
    while (total > 21 && aces > 0) {
        total -= 10;
        aces -= 1;
    }
    return total;
  }
  
  handToString = () => {
    return this.hand.map(card => `${card.Value} of ${card.Suit}`).join(', ');
  }
}

export { Player };
