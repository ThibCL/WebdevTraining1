const Koa = require("koa");
const app = new Koa();
const router = require("./router.js");
const logger = require("./logger.js");

app.use(router.routes());
app.use(router.allowedMethods());
const server = app.listen(1234);

module.exports = server;
