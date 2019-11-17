const { Swipe, createAccountAction, issueAssetAction, transferAction } = require("@swp/ledger-sdk");
require('dotenv').config()

const { SWIPE_API_KEY, SWIPE_API_SECRET } = process.env;

const { Ledger } = new Swipe({
	apiKey: SWIPE_API_KEY,
	secret: SWIPE_API_SECRET,
	debug: true,
	sandbox: true,
	customHost: "http://localhost:3000"
});

// testing the connection
(async () => {
	let response = await Ledger.hello().catch(e => console.log);
	console.log("response:", response);

	let account = (await Ledger.getMyAccount().catch(e => console.log)).data;
	let { id: accountId } = account;
	console.log("account", account);

	// await Ledger.newActionBatch({
	// 	actions: [
	// 		{
	// 			type: ActionType.NEW_ACCOUNT,
	// 			fields: { "memo": "psp1" }
	// 		}
	// 	]
	// });

	//adicionando uma moeda BRLeu acredito
	// let assetReal = await Ledger.newActionBatch({
	// 	actions: [
	// 		{
	// 			type: ActionType.ISSUE_ASSET,
	// 			code: "BRL",
	// 			fields: {
	// 				"memo": "real"
	// 			}
	// 		}
	// 	]
	// });

	// console.log("novo asset adicionado:");
	// console.log("id: ", assetReal.data.id);
	// console.log("memo: ", assetReal.data.fields.memo);


	//adicionando uma moeda, usando a versão simplificada
	// let assetReal2 = await Ledger.newActionBatch({
	// 	actions: [
	// 		issueAssetAction("BRL", { memo: "real" }),
	// 	]
	// });

	
	//adicionando 3 moedas, usando a versão simplificada
	// let assets = await Ledger.newActionBatch({
	// 	actions: [
	// 		issueAssetAction("BRL", { memo: "real" }),
	// 		issueAssetAction("USD", { memo: "dollar" }),
	// 		issueAssetAction("ARS", { memo: "peso" })
	// 	]
	// });

	// assets.data.actions.forEach(actionDTO=>{
	// 	console.log(actionDTO)
	// })


	// Ledger.newActionBatch({
	// 	actions: [
	// 		transferAction(
	// 			"44d351a02f2307153be74984a59675f2733ad5deb1fa9fb08b0a36fe3d15fd6d",
	// 			"55c86a9027f2ff8c5d6ed1e2dbda01886b8b33f461341533d7391c14abe7aa40",
	// 			"07773f06becd47385d1e8d1e9bad3bd588ccd880fe746819257a6246e33551d3",
	// 			"1000"
	// 		)
	// 	],
	// 	fields: { "memo": "transfer" }
	// })


	let childAccounts = await Ledger.getAllChildAccounts();
	console.log(childAccounts);


})();