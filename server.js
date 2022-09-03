const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
require('dotenv').config();

global.Card = require('./api/models/cardModel');
const routes = require('./api/routes/cardRoutes');

mongoose.Promise = global.Promise;
mongoose.connect(`mongodb+srv://user:${ process.env.MONGOPW }@cluster0.qwq6btt.mongodb.net/?retryWrites=true&w=majority`);

const port = process.env.PORT || 6969;
const app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

routes(app);

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs');
const User = require('./api/models/userModel');

app.post('/user/register', async (req, res) => {
	console.log(req.body)
	try {
		const newPassword = await bcrypt.hash(req.body.password, 10)
		await User.create({
			name: req.body.name,
			email: req.body.email,
			password: newPassword,
		})
		res.json({ status: 'ok' })
	} catch (err) {
		res.json({ status: 'error', error: 'Duplicate email' })
	}
})

app.post('/user/login', async (req, res) => {
	console.log(req.body)
	const user = await User.findOne({ 
		email: req.body.email, 
	})

	if (!user) { 
		return {
			status: 'error',
			error: 'Invalid login'
		}
	}	

	const isPasswordValid = await bcrypt.compare(req.body.password, user.password)

	if (isPasswordValid) {
		const token = jwt.sign(
			{
				name: user.name,
				email: user.email,
			}, 
			'secret123'
		)

		return res.json({ status: 'ok', user: token })
	} else {
		return res.json({ status: 'error', user: false })
	}
})

app.get('/user/cards', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		const user = await User.findOne(
			{ email: email }
		)

		return res.json({ status: 'ok', cards: user.cards })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.post('/user/cards', async (req, res) => {
	const token = req.headers['x-access-token']

	try {
		const decoded = jwt.verify(token, 'secret123')
		const email = decoded.email
		await User.updateOne(
			{ email: email },
			{ $set: { cards: req.body.cards } }
		)
		console.log(req.body.cards)

		return res.json({ status: 'ok' })
	} catch (error) {
		console.log(error)
		res.json({ status: 'error', error: 'invalid token' })
	}
})

app.listen(port);

app.use((req, res) => {
	res.status(404).send({ url: `${ req.originalUrl} was not found `});
});

console.log(`Server started on http://localhost:${ port }/`);