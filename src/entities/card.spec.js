const expect = require('chai').expect;
const { Card } = require('./card');

describe('Card', () => {

  describe('when create', () => {
    it('should have right properties', () => {
      const card = new Card('Diamonds', "2", 2);
      expect(card.suit).to.equal('Diamonds');
      expect(card.value).to.equal("2");
      expect(card.weight).to.equal(2);
    });
  });

});
