const suits = ["Hearts", "Diamonds", "Clubs", "Spades"];
const values = [
  {value: "2", weight: 2},
  {value: "3", weight: 3},
  {value: "4", weight: 4},
  {value: "5", weight: 5},
  {value: "6", weight: 6},
  {value: "7", weight: 7},
  {value: "8", weight: 8},
  {value: "9", weight: 9},
  {value: "10", weight: 10},
  {value: "J", weight: 10},
  {value: "Q", weight: 10},
  {value: "K", weight: 10},
  {value: "A", weight: 11},
]

class Card {
  suit = '';
  value = '';
  weight = 0;

  constructor(suit, value, weight) {
    this.suit = suit;
    this.value = value;
    this.weight = weight;
  }
}

module.exports = { suits, values, Card };
