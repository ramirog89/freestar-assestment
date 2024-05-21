const expect = require('chai').expect;
const { Deck } = require('./deck');
const { Card } = require('./card');

describe('Deck', () => {

  describe('when create', () => {
    it('should have 52 cards', () => {
      const deck = new Deck();
      deck.create();
      expect(deck.cards.length).to.equal(52);
    });

    it('should have 13 cards of each suit', () => {
      const deck = new Deck();
      deck.create();

      expect(deck.cards.filter((c) => c.suit === "Hearts").length).to.equal(13);
      expect(deck.cards.filter((c) => c.suit === "Diamonds").length).to.equal(13);
      expect(deck.cards.filter((c) => c.suit === "Clubs").length).to.equal(13);
      expect(deck.cards.filter((c) => c.suit === "Spades").length).to.equal(13);
    });
  });

  describe('when shuffle', () => {
    it('should mix and sort cards within deck', () => {
      const shuffledDeck = new Deck();
      const noShuffleDeck = new Deck();

      shuffledDeck.create();
      noShuffleDeck.create();

      // Check both are equal before shuffle
      expect(shuffledDeck.cards).to.deep.equal(noShuffleDeck.cards);

      shuffledDeck.shuffle();
      expect(shuffledDeck.cards).to.not.deep.equal(noShuffleDeck.cards);
    });
  });

  describe('when getCard', () => {
    it('should return a card and decrease deck in 1', () => {
      const deck = new Deck();
      deck.create();
      const card = deck.getCard();
      
      expect(deck.cards.length).to.equal(51);
      expect(card).to.be.an.instanceof(Card);
    });
  });

});
