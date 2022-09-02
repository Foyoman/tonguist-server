const mongoose = require('mongoose');
const Card = mongoose.model('Card');

exports.listAllCards = (req, res) => {
	Card.find({}, (err, cards) => {
		if (err) res.send(err);
		res.json(cards);
	});
};

exports.createCard = (req, res) => {
	const newCard = new Card(req.body);
	newCard.save((err, card) => {
		if (err) res.send(err);
		res.json(card);
	});
};

exports.readCard = (req, res) => {
	Card.findById(req.params.cardId, (err, card) => {
		if (err) res.send(err);
		res.json(card);
	});
};

exports.updateCard = (req, res) => {
	Card.findOneAndUpdate(
		{ _id: req.params.cardId },
		req.body,
		{ new: true },
		(err, card) => {
			if (err) res.send(err);
			res.json(card)
		}
	);
};

exports.deleteCard = (req, res) => {
	Card.deleteOne({_id: req.params.cardId}, (err) => {
		if (err) res.send(res);
		res.json({
			message: 'Card deleted successfully',
			_id: req.params.wordId
		});
	})
};