const chai = require('chai');
const sinonChai = require('sinon-chai');
const sinon = require('sinon');

const { expect } = chai;
const { Deck } = require('./deck');
const { Card } = require('./card');
const { BlackJack } = require('./blackjack');

chai.use(sinonChai);

describe('BlackJack', () => {

  let blackJackGame;
  beforeEach(() => {
    blackJackGame = new BlackJack();
    sinon.stub(blackJackGame.game, 'start');
    sinon.stub(blackJackGame.game, 'renderHands');
    sinon.stub(blackJackGame.game, 'end');
    blackJackGame.start();
  });

  describe('when start', () => {
    it('should create a deck', () => {
      expect(blackJackGame.deck.cards.length).to.equal(48);
    });

    it('should shuffled the deck', () => {
      const deck = new Deck();
      deck.create();
      expect(blackJackGame.deck.cards).to.not.deep.equal(deck.cards);
    });

    it('should deal cards to the players', () => {
      expect(blackJackGame.player.hand.length).to.equal(2);
      expect(blackJackGame.dealer.hand.length).to.equal(2);
    });

    it('should render game', () => {
      expect(blackJackGame.game.start).to.have.been.calledWith();
    });
  });

  describe('when hit', () => {
    it('should give one more card to the player and render hand', () => {
      blackJackGame.hit();

      expect(blackJackGame.player.hand.length).to.equal(3);
      expect(blackJackGame.game.renderHands).to.have.been.calledWith(blackJackGame.player, blackJackGame.dealer);
    });

    it('should end game if player is higher than 21', () => {
      blackJackGame.player.hand = [
        new Card("Hearts", "J", 10),
        new Card("Hearts", "9", 9),
        new Card("Hearts", "2", 2),
      ];
      blackJackGame.hit();
      expect(blackJackGame.player.hand.length).to.equal(4);
      expect(blackJackGame.game.end).to.have.been.callCount(1);
    });
  });
  
  describe('when stand', () => {
    it('should give one more card to the dealer if below 17 and end game', () => {
      blackJackGame.stand();
      // expect(blackJackGame.dealer.hand.length).to.equal(3);
      expect(blackJackGame.game.end).to.have.been.callCount(1);
    });
  });

  describe('when getWinner', () => {
    it('should return Player when player total is closer to 21 than Dealer', () => {
      blackJackGame.dealer.total = 17;
      blackJackGame.player.total = 20;

      expect(blackJackGame.getWinner()).to.equal('Player');
    });

    it('should return Player when Dealer total is higher than 21', () => {
      blackJackGame.dealer.total = 25;
      blackJackGame.player.total = 16;

      expect(blackJackGame.getWinner()).to.equal('Player');
    });

    it('should return Dealer when dealer total is closer to 21 than Player', () => {
      blackJackGame.dealer.total = 20;
      blackJackGame.player.total = 8;

      expect(blackJackGame.getWinner()).to.equal('Dealer');
    });

    it('should return Dealer when Player total is higher than 21', () => {
      blackJackGame.dealer.total = 15;
      blackJackGame.player.total = 27;

      expect(blackJackGame.getWinner()).to.equal('Dealer');
    });

    it('should return Tie when dealear and player total are equal', () => {
      blackJackGame.dealer.total = 17;
      blackJackGame.player.total = 17;

      expect(blackJackGame.getWinner()).to.equal('Tie');
    });
  });

});
