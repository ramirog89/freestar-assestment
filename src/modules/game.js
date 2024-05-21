class Game {

  start = (player, dealer) => {
    document.getElementById('hit').disabled = false;
    document.getElementById('stand').disabled = false;
    document.getElementById('winnerAnnouncement').innerText = '';
    this.renderHands(player, dealer);
  }

  renderHands = (player, dealer) => {
    document.getElementById('playerHand').innerText = player.handToString();
    document.getElementById('playerTotal').innerText = `Total: ${player.getHandTotal()}`;
    document.getElementById('dealerHand').innerText = `Hidden, ${dealer.handToString()}`;
    document.getElementById('dealerTotal').innerText = `Total: ??`;
  }

  end = (player, dealer, winner) => {
    document.getElementById('hit').disabled = true;
    document.getElementById('stand').disabled = true;
    document.getElementById('dealerHand').innerText = dealer.handToString();
    document.getElementById('dealerTotal').innerText = `Total: ${dealer.getHandTotal()}`;
    document.getElementById('winnerAnnouncement').innerText = `Winner: ${winner}`;
  }

}

module.exports = { Game };
