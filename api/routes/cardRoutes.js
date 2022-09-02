const cardBuilder = require('../controllers/cardController');

module.exports = (app) => {
	app.route('/cards')
		.get(cardBuilder.listAllCards)
		.post(cardBuilder.createCard);
	
	app.route('/cards/:cardId')
		.get(cardBuilder.readCard)
		.put(cardBuilder.updateCard)
		.delete(cardBuilder.deleteCard);
};