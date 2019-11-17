import * as express from "express";
import * as swp from "@swp/swipe-sdk";
import { Swipe, ErrorCode, ActionType, ActionDTO, AccountDTO, transferAction, ActionBatchMaxSize, newAccountAction, issueAssetAction } from "@swp/ledger-sdk"
import { types } from "util";

var http = require("http");
const os = require('os');

require('dotenv').config()

const { API_KEY, API_SECRET } = process.env;

const { Ledger } = new Swipe({
	apiKey: API_KEY,
	secret: API_SECRET,
	debug: true,
	sandbox: true,
	//customHost: "https://api-sandbox.swipetech.io/accounts"
	customHost: "http://localhost:3000"
});

// (async () => {

//   let hello = await Ledger.hello();

//   let accountDTO = Ledger.getMyAccount();
//   console.log(accountDTO);

// })().then();


// const Ledger = swp.init({
//   apiKey: "889af77ee493741779411ce49cdef990de70809bdd53a08966080dbbbc064bd2",
//   secret: "2ed3b3798913aeb4ad9e403fa4d2912313d22503a3dffe055e1978e0b0b594e9",
//   debug: true,
//   sandbox: true,
//   //customHost: "https://api-sandbox.swipetech.io/accounts"
//   customHost: "http://localhost:3000"
// });

//create a server object:
http.createServer(async (req, res) => {

	res.write("Hello World, from Swipe Team" + os.EOL);
	// let hello = await Promise.all([new Promise(()=>{ throw new Error("teste erro criado aqui") })]).catch(console.log);

	// testing the connection
	let hello = await Ledger.hello().catch(e => console.log);
	res.write(JSON.stringify(hello));

	// getting own account
	// const {data: accountDTO} = (await Ledger.getMyAccount())
	// OR 
	let accountDTO: AccountDTO = (await Ledger.getMyAccount()).data;
	console.log("accountDTO", accountDTO);

	let accounts: AccountDTO[] = (await Ledger.getAllChildAccounts()).data;
	console.log(accounts);

	// creating child accounts (for PSPs for example)
	// await Ledger.newActionBatch({ actions: [{ type: ActionType.NEW_ACCOUNT, fields: { "memo": "psp1" } }] });

	// await Ledger.newActionBatch({ actions: [{ type: ActionType.NEW_ACCOUNT, fields: { "memo": "psp1" } }] });
	await Ledger.newActionBatch({
		actions: [
			newAccountAction({ "memo": "psp1" })
		]
	});

	// await Ledger.newActionBatch({ actions: [{ type: ActionType.NEW_ACCOUNT, fields: { "memo": "psp2" } }] });

	accounts = (await Ledger.getAllChildAccounts()).data;
	console.log(accounts);

	// await Ledger.newActionBatch({ actions: [transferAction("", to)] });

	await Ledger.newActionBatch({ actions: [{ type: ActionType.ISSUE_ASSET, code: "BRL", fields: { "memo": "real" } }] });
	// await Ledger.newActionBatch({ actions: [{ type: ActionType.ISSUE_ASSET, code: "BRL", fields: { "memo": "real" } }] });

	accounts.forEach(async (accountDTO: AccountDTO) => {
		console.log(accountDTO.id);

		if (accountDTO.id == "642d3785af4a3bb2724382ab8157520e998a16291bf3f911d21d1b73cec9ee18") {
			let newCredential = await Ledger.createCredential(accountDTO.id);
			console.log(newCredential);
		}

		// await Ledger.newActionBatch({ actions: [{ type: ActionType.ISSUE_ASSET, code: "BRL", fields: { "memo": "real" } }] });
		// ActionType.DESTROY_ACCOUNT

	});


	await Ledger.newActionBatch({
		actions: [
			{
				type: ActionType.ISSUE_ASSET,
				code: "BRL",
				fields: {
					"memo": "real"
				}
			}
		]
	});

	await Ledger.newActionBatch({
		actions: [
			issueAssetAction("USD", { memo: "dollar" }),
			issueAssetAction("ARS", { memo: "peso" })
		]
	});


	await Ledger.newActionBatch({ actions: [{ type: ActionType.ISSUE_ASSET, code: "BRL", fields: { "memo": "real" } }] });


	// ActionType.DESTROY_ACCOUNT

	// res.write(JSON.stringify(Ledger));
	// res.write("Hello World! Swipe");
	debugger;
	res.end();
}).listen(8080); //the server object listens on port 8080

