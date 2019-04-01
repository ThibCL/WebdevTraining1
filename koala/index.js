// index.js

//Import

const Koa = require("koa");
const router = require("./route.js").router;

//Const variables
const app = new Koa();
app.use(router.routes()).use(router.allowedMethods());
const server = app.listen(1234);

module.exports = server;
