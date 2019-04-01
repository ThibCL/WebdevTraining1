//Import
const koaRouter = require("koa-router");
const router = new koaRouter();
const str = require("./store.js");
const koaBody = require("koa-body");
const logger = require("./logger.js");
const ISO6391 = require("iso-639-1");

//Validation function for request
function formating(data) {
  return data.toLowerCase();
}

function schemaValidation(data) {
  verif = true;
  if (data.length != 2 || data.toLowerCase() != data) {
    verif = false;
  }
  return verif;
}

function dataValidation(data) {
  verif = true;
  if (str.list[data] == undefined) {
    verif = false;
  }
  return verif;
}

function validateExistence(lang) {
  return ISO6391.validate(`${lang}`);
}
//Maybe validate if the parameter langue in the request existe

//Request get that give you the way to say hello in any language
router.get("koala", "/hello", ctx => {
  let lg = formating(ctx.request.query.langue);
  try {
    //faire plusieurs if pour changer le message?

    if (
      !schemaValidation(lg) ||
      !dataValidation(lg) ||
      !validateExistence(lg)
    ) {
      logger.info("On rendre dans l'errer de validation");
      ctx.response.status = 400;
      ctx.response.body = "The langage request is not allowed";
      return ctx;
    }

    let rep = str.getHello(lg);
    ctx.response.status = rep.statuscode;
    ctx.response.body = rep.message;
  } catch (er) {
    //try et catch erreur pas maitrisé
    ctx.response.status = 500;
    ctx.response.body = er.message;
  }

  return ctx;
});

//Request post to add new language
router.post("koala", "/hello", koaBody(), ctx => {
  try {
    let lg = formating(ctx.request.body.langue);
    if (!schemaValidation(lg) || !validateExistence(lg)) {
      logger.info("On rendre dans l'errer de validation");
      ctx.response.status = 400;
      ctx.response.body = "The langage request is not allowed";
      return ctx;
    }
    let hello = ctx.request.body.hello;
    let rep = str.addHello(lg, hello);
    ctx.response.status = rep.statuscode;
    ctx.response.body = rep.message;
  } catch (er) {
    ctx.response.status = 500;
    ctx.response.body = er.message;
  }

  return ctx;
});
//put diff post mais post générique

//Request delete to delete one of the language
router.delete("koala", "/hello", ctx => {
  try {
    let lg = formating(ctx.request.query.langue);
    if (
      !schemaValidation(lg) ||
      !dataValidation(lg) ||
      !validateExistence(lg)
    ) {
      logger.info("On rendre dans l'errer de validation");
      ctx.response.status = 400;
      ctx.response.body = "The langage request is not allowed";
      return ctx;
    }
    let rep = str.deleteHello(lg);
    ctx.response.status = rep.statuscode;
    ctx.response.body = rep.message;
  } catch (er) {
    ctx.response.status = 500;
    ctx.response.body = er.message;
  }

  return ctx;
});

module.exports = {
  router: router,
  function: {
    formating: formating,
    dataValidation: dataValidation,
    schemaValidation: schemaValidation,
    validateExistence: validateExistence
  }
};
