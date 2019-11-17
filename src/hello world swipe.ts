const { Swipe, ActionType, AccountDTO } = require("@swp/ledger-sdk");
require('dotenv').config()

const { API_KEY, API_SECRET } = process.env;

const { Ledger } = new Swipe({
	apiKey: API_KEY,
	secret: API_SECRET,
	debug: true,
	sandbox: true,
	customHost: "http://localhost:3000"
});

console.log("Hello World! Swipe")

// testing the connection
Ledger.hello().then(hello => {
	console.log(hello);
}).catch(e => console.log);