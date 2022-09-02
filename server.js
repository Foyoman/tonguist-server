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
app.listen(port);

app.use((req, res) => {
	res.status(404).send({ url: `${ req.originalUrl} was not found `});
});

console.log(`Server started on http://localhost:${ port }/`);