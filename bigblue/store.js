const logger = require("./logger");

class Store {
  constructor() {
    //all the warehouse existing
    this.warehouses = {};
    //all the actual inbound
    this.list_inbound = [];
  }

  addWarehouse(warehouse, position) {
    this.warehouses[warehouse] = position;
  }

  addInbound(inbound) {
    this.list_inbound.push(inbound);
  }
}

const str = new Store();
str.addWarehouse("EU-FRA-001", ["48.123", "2.579"]);
module.exports = str;
