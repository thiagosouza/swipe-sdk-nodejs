import * as express from "express";
import * as swp from "@swp/swipe-sdk";
import { Swipe, ErrorCode, ActionType, ActionDTO } from "@swp/ledger-sdk"

var http = require("http");

const { Ledger } = new Swipe({
  apiKey: "889af77ee493741779411ce49cdef990de70809bdd53a08966080dbbbc064bd2",
  secret: "2ed3b3798913aeb4ad9e403fa4d2912313d22503a3dffe055e1978e0b0b594e9",
  debug: true,
  sandbox: true,
  //customHost: "https://api-sandbox.swipetech.io/accounts"
  customHost: "http://localhost:3000"
});

Ledger.getMyAccount().then(accountDTO=>{
  console.log(accountDTO);
})

// const Ledger = swp.init({
//   apiKey: "889af77ee493741779411ce49cdef990de70809bdd53a08966080dbbbc064bd2",
//   secret: "2ed3b3798913aeb4ad9e403fa4d2912313d22503a3dffe055e1978e0b0b594e9",
//   debug: true,
//   sandbox: true,
//   //customHost: "https://api-sandbox.swipetech.io/accounts"
//   customHost: "http://localhost:3000"
// });


//create a server object:
http
  .createServer(function (req, res) {
    // console.log(swp);
    res.write(JSON.stringify(swp));
    res.write("Hello World! Swipe"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080

console.log(swp, "foo=>bar", "Local Host");

