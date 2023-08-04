require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');

const applyMiddleware = require('./middleware');

const app = express();

applyMiddleware(app, express);

app.get('/health', (req, res) => {
	res.status(200).json({
		health: 'OK',
		user: req.user,
	});
});

app.use((err, req, res, next) => {
	res.status(err.status || 500).json({
		message: err.message,
		errors: err.errors,
	});
});

let connectionURL = process.env.DB_CONNECTION_URL;
connectionURL = connectionURL.replace('<username>', process.env.DB_USERNAME);
connectionURL = connectionURL.replace('<password>', process.env.DB_PASSWORD);
// connectionURL = `${connectionURL}/${process.env.DB_NAME}?${process.env.DB_URL_QUERY}`

mongoose
	.connect(connectionURL, {
		connectTimeoutMS: 1000,
		dbName: process.env.DB_NAME,
	})
	.then(() => {
		console.log('Database Connected');
		app.listen(4000, async () => {
			console.log('Server is listening on port 4000');
		});
	})
	.catch((e) => {
		console.log('Database connection faild!');
		console.log(e.message);
	});
