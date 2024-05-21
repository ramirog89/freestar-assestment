const { expect } = require('chai');
const { JSDOM } = require('jsdom');
const { Game } = require('./game');
const { Player } = require('./player');
const { Card } = require('./card');

describe('Game', () => {
  let dom;
  let player;
  let dealer;

  beforeEach(() => {
    player = new Player('player');
    dealer = new Player('dealer');
    dom = new JSDOM(`
      <!DOCTYPE html>
      <html lang="en">
      <head>
          <meta charset="UTF-8">
          <title>Blackjack Game</title>
      </head>
      <body>
          <h2>Blackjack Game</h2>
          <button id="startGame">Start Game</button>
          <h3>Player's Hand</h3>
          <div id="playerHand"></div>
          <div id="playerTotal"></div>
          <button id="hit" disabled>Hit</button>
          <button id="stand" disabled>Stand</button>
          <h3>Dealer's Hand</h3>
          <div id="dealerHand"></div>
          <div id="dealerTotal"></div>
          <div id="winnerAnnouncement"></div>
      </body>
      </html>
    `);
    global.document = dom.window.document;
  });

  describe('when start', () => {
    it('should enable hit and stand buttons and render player and dealer hands', () => {
      const game = new Game();
      player.hand = [
        new Card("Hearts", "2", 2),
        new Card("Hearts", "3", 3),
      ];
      dealer.hand = [
        new Card("Hearts", "J", 10),
        new Card("Hearts", "2", 2)
      ];

      expect(global.document.getElementById('hit').disabled).to.equal(true);
      expect(global.document.getElementById('stand').disabled).to.equal(true);
      expect(global.document.getElementById('winnerAnnouncement').innerText).to.equal(undefined);
      expect(global.document.getElementById('playerHand').innerText).to.equal(undefined);
      expect(global.document.getElementById('playerTotal').innerText).to.equal(undefined);
      expect(global.document.getElementById('dealerHand').innerText).to.equal(undefined);
      expect(global.document.getElementById('dealerTotal').innerText).to.equal(undefined);

      game.start(player, dealer);

      expect(global.document.getElementById('hit').disabled).to.equal(false);
      expect(global.document.getElementById('stand').disabled).to.equal(false);
      expect(global.document.getElementById('winnerAnnouncement').innerText).to.equal('');
      expect(global.document.getElementById('playerHand').innerText).to.equal('2 of Hearts, 3 of Hearts');
      expect(global.document.getElementById('playerTotal').innerText).to.equal('Total: 5');
      expect(global.document.getElementById('dealerHand').innerText).to.equal('Hidden, J of Hearts, 2 of Hearts');
      expect(global.document.getElementById('dealerTotal').innerText).to.equal('Total: ??');
    });
  });

  describe('when end', () => {
    it('should disable hit and stand buttons update winnerAnnouncement and totals', () => {
      const game = new Game();
      player.hand = [
        new Card("Hearts", "2", 2),
        new Card("Hearts", "3", 3),
      ];
      dealer.hand = [
        new Card("Hearts", "J", 10),
        new Card("Hearts", "2", 2)
      ];

      game.start(player, dealer);

      expect(global.document.getElementById('hit').disabled).to.equal(false);
      expect(global.document.getElementById('stand').disabled).to.equal(false);
      expect(global.document.getElementById('winnerAnnouncement').innerText).to.equal('');
      expect(global.document.getElementById('playerHand').innerText).to.equal('2 of Hearts, 3 of Hearts');
      expect(global.document.getElementById('playerTotal').innerText).to.equal('Total: 5');
      expect(global.document.getElementById('dealerHand').innerText).to.equal('Hidden, J of Hearts, 2 of Hearts');
      expect(global.document.getElementById('dealerTotal').innerText).to.equal('Total: ??');

      game.end(player, dealer, 'Dealer');

      expect(global.document.getElementById('hit').disabled).to.equal(true);
      expect(global.document.getElementById('stand').disabled).to.equal(true);
      expect(global.document.getElementById('winnerAnnouncement').innerText).to.equal('Winner: Dealer');
      expect(global.document.getElementById('playerHand').innerText).to.equal('2 of Hearts, 3 of Hearts');
      expect(global.document.getElementById('playerTotal').innerText).to.equal('Total: 5');
      expect(global.document.getElementById('dealerHand').innerText).to.equal('J of Hearts, 2 of Hearts');
      expect(global.document.getElementById('dealerTotal').innerText).to.equal('Total: 12');
    });
  });

});
