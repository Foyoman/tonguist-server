const mongoose = require('mongoose');
const { Schema } = mongoose;

const CardSchema = new Schema(
	{
		targetWord: {
			type: String,
			required: 'Target word cannot be blank'
		},
		
		englishWord: {
			type: String,
			required: 'English word cannot be blank'
		},

		wordClass: {
			type: String,
			required: 'Word class cannot be blank'
		},
		
		phraseStart: {
			type: String,
			required: 'Phrase start cannot be blank'
		},
		
		phraseEnd: {
			type: String,
			required: 'Phrase end cannot be blank'
		},

		englishPhrase: {
			type: String,
			required: 'English phrase cannot be blank'
		}
	},
	{ collection: 'card' }
);

module.exports = mongoose.model('Card', CardSchema);