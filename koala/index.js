// index.js

//Import

const koa = require("koa");
const router = require("./route.js");

//Const variables
const app = new koa();

app.use(router.routes()).use(router.allowedMethods());
app.listen(1234);
