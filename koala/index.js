// index.js

//Import

const koa = require("koa");
const router = require("./route.js").router;

//Const variables
const app = new koa();
app.use(router.routes()).use(router.allowedMethods());
const server = app.listen(1234);

module.exports = server;
