// index.js

"use strict";

//Import

const Store = require("./store.js");
const koa = require("koa");
const koaBody = require("koa-body");
const koaRouter = require("koa-router");
const logger = require("./logger.js");

//Const variables
const app = new koa();
const router = new koaRouter();

//list which contains all the language know by the server
let list = [];
let str = new Store();

//Request get that give you the way to say hello in any language
router.get("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  logger.info(lg);
  let rep = str.getHello(lg);
  logger.info(rep);
  ctx.response.status = rep[0];
  ctx.body = rep[1];

  return ctx;
});

//Request post to add new language
router.post("koala", "/hello", koaBody(), ctx => {
  let rep = str.addHello(ctx.request.body.langue, ctx.request.body.hello);
  logger.info(rep);
  ctx.response.status = rep[0];
  ctx.response.body = rep[1];
  return ctx;
});

//Request delete to delete one of the language
router.delete("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  logger.info(lg);
  let rep = str.deleteHello(lg);
  logger.info(rep);
  ctx.response.status = rep[0];
  ctx.response.body = rep[1];
  return ctx;
});

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234);
