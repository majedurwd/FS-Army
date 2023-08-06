require('dotenv').config();
const http = require('http');
const app = require('./app');
const { connectDB } = require('./db');

const server = http.createServer(app);

const PORT = process.env.PORT || 4000;

const main = async () => {
	try {
		await connectDB();
		server.listen(PORT, async () => {
			console.log('Server is listening on port 4000');
		});
	} catch (e) {
		console.log('Database Error');
		console.log(e);
	}
};

main();
