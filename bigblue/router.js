const KoaRouter = require("koa-router");
const router = new KoaRouter();
const koaBody = require("koa-body");
const logger = require("./logger.js");
//Object that store data
const str = require("./store.js");
//All validation function
const funct = require("./validation.js");
//Function from map API
const mbxDirections = require("@mapbox/mapbox-sdk/services/directions");

//KEY to use the API
const directionsService = mbxDirections({
  accessToken: process.env.MYAPIKEY
});
const crypto = require("crypto");

//Post request to add a inbound-shipments, require in the data send : origin, destination,time
router.post("bigblue", "/inbound-shipments", koaBody(), async ctx => {
  //get the parameters of the request
  let origin = ctx.request.body.origin;
  logger.info(origin);
  let destination = ctx.request.body.destination;
  logger.info(destination);
  let departure_time = ctx.request.body.departure_time;
  logger.info(departure_time);
  let coordi = str.warehouses[destination];
  logger.info(coordi);

  //validate schema and data of the parameters
  if (!funct.fonction.validateOrigin(origin)) {
    ctx.response.status = 400;
    logger.info(origin);
    return ctx;
  }

  if (!funct.fonction.validateSchemaDepartureTime(departure_time)) {
    ctx.response.status = 400;
    logger.info(departure_time);
    return ctx;
  }

  if (!funct.fonction.validateSchemaDestination(destination)) {
    ctx.response.status = 400;
    logger.info(destination);
    return ctx;
  }

  if (!funct.fonction.validateDataDestination(destination)) {
    ctx.response.status = 400;
    logger.info(destination);
    return ctx;
  }

  //Use map API to get the distance and duration between the origin and destination
  let response = await directionsService
    .getDirections({
      profile: "driving",
      waypoints: [
        {
          coordinates: [Number(origin[0]), Number(origin[1])]
        },
        {
          coordinates: [Number(coordi[0]), Number(coordi[1])]
        }
      ]
    })
    .send();

  //calculate of the date of delivery
  let routes = response.body.routes[0];
  let date = new Date(departure_time);
  date.getSeconds(date.getSeconds() + routes.duration);

  //Create the inbound, send to the response request and add it to the store
  const directions = {
    id: crypto
      .createHash("md5")
      .update(origin + destination)
      .digest("hex"),
    distance: routes.distance,
    expected_delivery_time: date.toISOString()
  };
  str.addInbound(directions);
  ctx.body = directions;

  return ctx;
});

//Get request to have the list of inbound-shipments
router.get("bigblue", "/inbound-shipments", koaBody(), async ctx => {
  ctx.body = str.list_inbound;
  return ctx;
});

module.exports = router;
