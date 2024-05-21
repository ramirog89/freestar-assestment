const { suits, cards } = require('../../models/card');
const { Player } = require('../../models/player');

class GameService {
  deck = [];
  player = new Player('Player');
  dealer = new Player('Dealer');

  createDeck = () => {
    this.deck = [];
    for (let suit of suits) {
        for (let value of cards) {
            let weight = parseInt(value);
            if (value === "J" || value === "Q" || value === "K")
                weight = 10;
            if (value === "A")
                weight = 11;
            let card = { Value: value, Suit: suit, Weight: weight };
            this.deck.push(card);
        }
    }
  }

  shuffleDeck = () => {
      for (let i = 0; i < this.deck.length; i++) {
          let swapIdx = Math.trunc(Math.random() * this.deck.length);
          let tmp = this.deck[swapIdx];
          this.deck[swapIdx] = this.deck[i];
          this.deck[i] = tmp;
      }
  }

  start = () => {
    this.createDeck();
    this.shuffleDeck();
    this.player.hand = [this.deck.pop(), this.deck.pop()];
    this.dealer.hand = [this.deck.pop(), this.deck.pop()];
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
    this.updateHandsDisplay();
}

  hit = () => {
    this.player.hand.push(this.deck.pop());
    this.updateHandsDisplay();
    if (this.getHandTotal(this.player.hand) > 21) {
        this.endGame();
    }
  }

  stand = () => {
    while (this.dealer.getHandTotal() < 17) {
        this.dealer.hand.push(this.deck.pop());
        this.dealer.getHandTotal();
    }
    this.endGame();
  }

  updateHandsDisplay = () => {
    this.dealer.getHandTotal();

    document.getElementById('playerHand').innerText = this.player.handToString();
    document.getElementById('playerTotal').innerText = `Total: ${this.player.getHandTotal()}`;
    document.getElementById('dealerHand').innerText = `Hidden, ${this.dealer.hand[1].Value} of ${this.dealer.hand[1].Suit}`;
    document.getElementById('dealerTotal').innerText = `Total: ??`;
  }

  endGame = () => {
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;

    let winner = this.determineWinner(this.player.getHandTotal(), this.dealer.getHandTotal());

    document.getElementById('dealerHand').innerText = this.dealer.handToString();
    document.getElementById('dealerTotal').innerText = `Total: ${this.dealer.dealerTotal}`;
    document.getElementById('winnerAnnouncement').innerText = `Winner: ${winner}`;
  }

  determineWinner = (playerTotal, dealerTotal) => {
    if (playerTotal > 21) {
        return 'Dealer';
    } else if (dealerTotal > 21) {
        return 'Player';
    } else if (playerTotal > dealerTotal) {
        return 'Player';
    } else if (dealerTotal > playerTotal) {
        return 'Dealer';
    } else {
        return 'Tie';
    }
  }

}

export { GameService };
