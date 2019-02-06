// index.js

"use strict";

//Import

const Store = require("./store.js");
const koa = require("koa");
const koaBody = require("koa-body");
const koaRouter = require("koa-router");

//const render = require("koa-ejs");
const path = require("path");
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

//That was the part for the views but I think we don't have to use it
/*render(app, {
  root: path.join(__dirname, "views"),
  layout: false,
  viewExt: "html",
  cache: false,
  debug: true
});*/

//Methode get qui permet de dire bonjour dans la langue voulue
router.get("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  let rep = str.getHello(lg);
  ctx.response.status = rep[0];
  ctx.body = rep[1];

  return ctx;
});

//Méthode get pour récupérer la page d'ajout d'une langue
/*router.get("koala", "/formulaire", ctx => {
  return ctx.render("formulaire");
});*/

//Méthode get pour récupérer la page de suppression d'une langue
/*router.get("koala", "/suppression", ctx => {
  return ctx.render("suppression");
});*/

//Méthode post qui permet d'apprendre une nouvelle langue
router.post("koala", "/hello", koaBody(), ctx => {
  let rep = str.addHello(ctx.request.body.langue, ctx.request.body.hello);
  ctx.response.status = rep[0];
  ctx.response.body = rep[1];
  return ctx;
});

//Méthode post qui permet de supprimer une langue
router.delete("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  let rep = str.deleteHello(lg);
  ctx.response.status = rep[0];
  ctx.response.body = rep[1];
  return ctx;
});

app.use(router.routes()).use(router.allowedMethods());

app.listen(1234);
