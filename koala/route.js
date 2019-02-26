//Import
const koaRouter = require("koa-router");
const router = new koaRouter();
const str = require("./store.js");
const koaBody = require("koa-body");
const logger = require("./logger.js");

//Request get that give you the way to say hello in any language
router.get("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  logger.info(lg);
  let rep = str.getHello(lg);
  logger.info(rep);
  ctx.response.status = rep.statuscode;
  ctx.body = rep.message;

  return ctx;
});

//Request post to add new language
router.post("koala", "/hello", koaBody(), ctx => {
  let rep = str.addHello(ctx.request.body.langue, ctx.request.body.hello);
  logger.info(rep);
  ctx.response.status = rep.statuscode;
  ctx.response.body = rep.message;
  return ctx;
});

//Request delete to delete one of the language
router.delete("koala", "/hello", ctx => {
  let lg = ctx.request.query.langue;
  logger.info(lg);
  let rep = str.deleteHello(lg);
  logger.info(rep);
  ctx.response.status = rep.statuscode;
  ctx.response.body = rep.message;
  return ctx;
});

module.exports = router;
