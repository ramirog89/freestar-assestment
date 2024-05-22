const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const { expect } = chai;
const { JSDOM } = require('jsdom');
const { GameService } = require('./game');
const { Player } = require('../entities/player');
const { Card } = require('../entities/card');

chai.use(sinonChai);

describe('GameService', () => {
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
      </head>
      <body>
          <div class="title">
              <h1>BlackJack Game</h1>
          </div>
          <div class="game" id="blackjack">
              <div class="board">
                  <div class="box dealer" id="dealer-hand"></div>
                  <div class="winner" id="winner"></div>
                  <div class="box player" id="player-hand"></div>
              </div>
              <div class="controls">
                  <button id="hit" disabled>Hit</button>
                  <button id="stand" disabled>Stand</button>
                  <button id="play">Start</button>
              </div>
          </div>
      </body>
      </html>
    `, { url: 'http://localhost:8080' });
    global.document = dom.window.document;
  });

  describe('when bind', () => {
    it('should bind event handlers to dom components', () => {
      const game = new GameService();
      const startMock = sinon.mock();
      const hitMock = sinon.mock();
      const standMock = sinon.mock();
      game.bind(startMock, hitMock, standMock);

      global.document.getElementById('play').click();
      expect(startMock).to.have.been.callCount(1);
    });
  });

  describe('when start', () => {
    it('should start game and render player and dealer hands', () => {
      const game = new GameService();
      player.hand = [
        new Card("Hearts", "2", 2),
        new Card("Hearts", "3", 3),
      ];
      dealer.hand = [
        new Card("Hearts", "J", 10),
        new Card("Hearts", "2", 2)
      ];

      expect(global.document.getElementById('blackjack').className).to.equal('game');
      expect(global.document.getElementById('winner').innerText).to.equal(undefined);
      expect(global.document.getElementById('player-hand').innerHTML).to.equal('');
      expect(global.document.getElementById('dealer-hand').innerHTML).to.equal('');

      game.start(player, dealer);

      expect(global.document.getElementById('blackjack').className).to.equal('game started');

      expect(global.document.getElementById('winner').innerText).to.equal('');
      expect(global.document.getElementById('player-hand').innerHTML).to.equal('<div class="card Hearts "><span>2</span><span class="suit">Hearts</span></div><div class="card Hearts "><span>3</span><span class="suit">Hearts</span></div><div class="total" id="player-total">5</div>');
      expect(global.document.getElementById('player-total').innerHTML).to.equal('5');
      expect(global.document.getElementById('dealer-hand').innerHTML).to.equal('<div class="card Hearts "><span>J</span><span class="suit">Hearts</span></div><div class="card Hearts hold"><span>2</span><span class="suit">Hearts</span></div><div class="total" id="dealer-total">12</div>');
      expect(global.document.getElementById('dealer-total').innerHTML).to.equal('12');
    });
  });

  describe('when end', () => {
    it('should disable hit and stand buttons update winner and totals', () => {
      const game = new GameService();
      player.hand = [
        new Card("Hearts", "2", 2),
        new Card("Hearts", "3", 3),
      ];
      dealer.hand = [
        new Card("Hearts", "J", 10),
        new Card("Hearts", "2", 2)
      ];

      game.start(player, dealer);

      expect(global.document.getElementById('blackjack').className).to.equal('game started');

      expect(global.document.getElementById('winner').innerText).to.equal('');
      expect(global.document.getElementById('player-hand').innerHTML).to.equal('<div class="card Hearts "><span>2</span><span class="suit">Hearts</span></div><div class="card Hearts "><span>3</span><span class="suit">Hearts</span></div><div class="total" id="player-total">5</div>');
      expect(global.document.getElementById('player-total').innerHTML).to.equal('5');
      expect(global.document.getElementById('dealer-hand').innerHTML).to.equal('<div class="card Hearts "><span>J</span><span class="suit">Hearts</span></div><div class="card Hearts hold"><span>2</span><span class="suit">Hearts</span></div><div class="total" id="dealer-total">12</div>');
      expect(global.document.getElementById('dealer-total').innerHTML).to.equal('12');

      game.end(player, dealer, 'Dealer');

      expect(global.document.getElementById('winner').innerText).to.equal('Winner: Dealer');
      expect(global.document.getElementById('player-hand').innerHTML).to.equal('<div class="card Hearts "><span>2</span><span class="suit">Hearts</span></div><div class="card Hearts "><span>3</span><span class="suit">Hearts</span></div><div class="total" id="player-total">5</div>');
      expect(global.document.getElementById('player-total').innerHTML).to.equal('5');
      expect(global.document.getElementById('dealer-hand').innerHTML).to.equal('<div class="card Hearts "><span>J</span><span class="suit">Hearts</span></div><div class="card Hearts hold"><span>2</span><span class="suit">Hearts</span></div><div class="total" id="dealer-total">12</div>');
      expect(global.document.getElementById('dealer-total').innerHTML).to.equal('12');
    });
  });

});
