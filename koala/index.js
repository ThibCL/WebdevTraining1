// index.js

"use strict";

//Import

const Store = require("./store.js");
const koa = require("koa");
const koaBody = require("koa-body");
const koaRouter = require("koa-router");
const { createLogger, format, transports } = require("winston");

//Const variables
const app = new koa();
const router = new koaRouter();

const logger = createLogger({
  level: "debug",
  format: format.combine(format.colorize(), format.simple()),
  // You can also comment out the line above and uncomment the line below for JSON format
  // format: format.json(),
  transports: [new transports.Console()]
});

//list which contains all the language know by the server
let list = [];
let str = new Store();

//Request get that give you the way to say hello in any language
router.get("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  let rep = str.getHello(lg);
  ctx.response.status = rep[0];
  ctx.body = rep[1];

  return ctx;
});

//Request post to add new language
router.post("koala", "/hello", koaBody(), ctx => {
  let rep = str.addHello(ctx.request.body.langue, ctx.request.body.hello);
  ctx.response.status = rep[0];
  ctx.response.body = rep[1];
  return ctx;
});

//Request delete to delete one of the language
router.delete("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  let rep = str.deleteHello(lg);
  ctx.response.status = rep[0];
  ctx.response.body = rep[1];
  return ctx;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234);
