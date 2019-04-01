const logger = require("./logger.js");
const countries = require("countryjs");
const moment = require("moment");
const str = require("./store.js");

//function to validate the format
function validateOrigin(origin) {
  verif = false;
  if (
    Array.isArray(origin) &&
    origin.length == 2 &&
    typeof origin[0] == "string" &&
    typeof origin[1] == "string"
  ) {
    verif = true;
  }

  return verif;
}

//function to validate the region of the destination
function validateDestinationRegion(region) {
  verif = false;
  if (region.length == 2) {
    verif = true;
  }

  return verif;
}

//function to validate the country of the destination
function validateDestinationCountry(country) {
  verif = false;
  if (countries.ISOcodes(country.toUpperCase(), "ISO3") != undefined) {
    verif = true;
  }
  return verif;
}

//function to validate the number of the warehouse
function validateDestinationWarehouse(warehouse) {
  verif = false;

  if (warehouse.length == 3 && !isNaN(parseInt(warehouse))) {
    verif = true;
  }
  return verif;
}

//function to validate the name of the warehouse of destination
function validateSchemaDestination(destination) {
  verif = false;
  if (typeof destination == "string") {
    let dest = destination.split("-");
    if (dest.length == 3) {
      if (
        validateDestinationRegion(dest[0]) &&
        validateDestinationCountry(dest[1]) &&
        validateDestinationWarehouse(dest[2])
      ) {
        verif = true;
      }
    }
  }
  return verif;
}

//function to verify if the warehouse is existing
function validateDataDestination(destination) {
  verif = false;
  if (str.warehouses[destination] != undefined) {
    verif = true;
  }
  return verif;
}

//function to validate the format of derpature time
function validateSchemaDepartureTime(time) {
  verif = false;
  if (moment(time, moment.ISO_8601).isValid()) {
    verif = true;
  }
  return verif;
}

module.exports = {
  fonction: {
    validateOrigin: validateOrigin,
    validateSchemaDestination: validateSchemaDestination,
    validateDataDestination: validateDataDestination,
    validateSchemaDepartureTime: validateSchemaDepartureTime
  }
};
