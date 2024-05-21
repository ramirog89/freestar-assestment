const expect = require('chai').expect;
const { Player } = require('./player');
const { Deck } = require('./deck');
const { Card } = require('./card');

describe('Player', () => {

  describe('when getHandTotal', () => {
    it('should hand is empty total should be 0', () => {
      const player = new Player('test');
      expect(player.getHandTotal()).to.equal(0);
    });

    it('should hand is not empty total should be equal to the sum of each cards', () => {
      const deck = new Deck();
      const player = new Player('test');

      deck.create();
      player.hand = [deck.getCard(), deck.getCard()];

      expect(player.getHandTotal()).to.equal(21);
    });

    it('should A is in hand and the total is over 11 A should be 1', () => {
      const player = new Player('test');

      player.hand = [
        new Card("Hearts", "J", 10),
        new Card("Hearts", "Q", 10),
        new Card("Hearts", "A", 11),
      ];

      expect(player.getHandTotal()).to.equal(21);
    });

    it('should A is in hand and the total is less 11 A should be 11', () => {
      const player = new Player('test');

      player.hand = [
        new Card("Hearts", "2", 2),
        new Card("Hearts", "4", 4),
        new Card("Hearts", "A", 11),
      ];

      expect(player.getHandTotal()).to.equal(17);
    });

  });

  describe('when handToString', () => {
    it('should return string the value and suit of the hand', () => {
      const player = new Player('test');
  
      player.hand = [
        new Card("Hearts", "2", 2),
        new Card("Diamonds", "4", 4),
        new Card("Hearts", "A", 11),
      ];
  
      expect(player.handToString()).to.equal('2 of Hearts, 4 of Diamonds, A of Hearts');
    });
  });

});
