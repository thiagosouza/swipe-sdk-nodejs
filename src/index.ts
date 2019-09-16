import * as express from "express";

var http = require("http");

const swp = require("@swp/swipe-sdk");

swp.init({
  apiKey: "",
  secret: "",
  debug: true,
  sandbox: true
});


//create a server object:
http
  .createServer(function(req, res) {
    // console.log(swp);
    res.write(JSON.stringify(swp));
    res.write("Hello World! Swipe"); //write a response to the client
    res.end(); //end the response
  })
  .listen(8080); //the server object listens on port 8080

console.log(swp, "foo=>bar", "Local Host");
