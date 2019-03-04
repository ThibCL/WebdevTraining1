//Import
const koaRouter = require("koa-router");
const router = new koaRouter();
const str = require("./store.js");
const koaBody = require("koa-body");
const logger = require("./logger.js");

//Validation function for request
function formating(data) {
  return data.toLowerCase();
}

function schemaValidation(data) {
  if (data.length != 2 || data.toLowerCase() != data) {
    throw new SyntaxError("The langage should be two letter");
  }
}

function dataValidation(data) {
  if (str.list[data] == undefined) {
    throw new Error("The langage does not exist");
  }
}

//Request get that give you the way to say hello in any language
router.get("koala", "/hello", ctx => {
  let lg = formating(ctx.request.query.langue);
  try {
    schemaValidation(lg);
    dataValidation(lg);
    let rep = str.getHello(lg);
    ctx.response.status = rep.statuscode;
    ctx.response.body = rep.message;
  } catch (er) {
    ctx.response.status = 400;
    ctx.response.body = er.message;
  }

  return ctx;
});

//Request post to add new language
router.post("koala", "/hello", koaBody(), ctx => {
  try {
    let lg = formating(ctx.request.body.langue);
    schemaValidation(lg);
    let hello = ctx.request.body.hello;
    let rep = str.addHello(lg, hello);
    ctx.response.status = rep.statuscode;
    ctx.response.body = rep.message;
  } catch (er) {
    ctx.response.status = 400;
    ctx.response.body = er.message;
  }

  return ctx;
});

//Request delete to delete one of the language
router.delete("koala", "/hello", ctx => {
  try {
    let lg = formating(ctx.request.query.langue);
    schemaValidation(lg);
    dataValidation(lg);
    let rep = str.deleteHello(lg);
    ctx.response.status = rep.statuscode;
    ctx.response.body = rep.message;
  } catch (er) {
    ctx.response.status = 400;
    ctx.response.body = er.message;
  }

  return ctx;
});

module.exports = {
  router: router,
  function: {
    formating: formating,
    dataValidation: dataValidation,
    schemaValidation: schemaValidation
  }
};
