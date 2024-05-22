class GameService {

  bind = (startHandler, hitHandler, standHandler) => {
    document.getElementById('play').addEventListener('click', startHandler);
    document.getElementById('hit').addEventListener('click', hitHandler);
    document.getElementById('stand').addEventListener('click', standHandler);
  }

  start = (player, dealer) => {
    document.getElementById('blackjack').classList.add('started');
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
    document.getElementById('winner').innerText = '';
    this.renderHands(player, dealer);
  }

  renderCards = (cards, playerType, total) => {
    let output = '';
    cards.forEach((card, index) => {
      const isHoldCard = playerType === "dealer" && index > 0;
      output += `<div class="card ${card.suit} ${isHoldCard ? 'hold' : ''}"><span>${card.value}</span><span class="suit">${card.suit}</span></div>`;
    });
    output += `<div class="total" id="${playerType}-total">${total}</div>`;
    return output;
  }

  renderHands = (player, dealer) => {
    document.getElementById('player-hand').innerHTML = this.renderCards(player.hand, 'player', player.getHandTotal());
    document.getElementById('dealer-hand').innerHTML = this.renderCards(dealer.hand, 'dealer', dealer.getHandTotal());
  }

  end = (player, dealer, winner) => {
    this.renderHands(player, dealer);
    document.getElementById('blackjack').classList.remove('started');
    document.getElementById('blackjack').classList.add('finished');
    document.getElementById('winner').innerText = `Winner: ${winner}`;
  }

}

module.exports = { GameService };
