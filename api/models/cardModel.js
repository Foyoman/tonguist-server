const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema(
	{
		language: {
			type: String,
			required: 'Language required'
		},
		level: {
			type: Number,
			required: 'Level required'
		},
		targetWord: {
			type: String,
			required: 'Target word required'
		},
		
		englishWord: {
			type: String,
			required: 'English word required'
		},

		wordClass: {
			type: String,
			required: 'Word class required'
		},
		
		phraseStart: {
			type: String,
			required: 'Phrase start required'
		},
		
		phraseEnd: {
			type: String,
			required: 'Phrase end required'
		},

		englishPhrase: {
			type: String,
			required: 'English phrase required'
		}
	},
	{ collection: 'card' }
);

module.exports = mongoose.model('Card', CardSchema);