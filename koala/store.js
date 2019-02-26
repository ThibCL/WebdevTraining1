class Store {
  constructor() {
    this.list = {};
  }

  addHello(lang, hello) {
    if (lang in this.list) {
      return { statuscode: 500, message: "Language already known" };
    } else {
      this.list.lang = hello;
      return { statuscode: 200, message: "Language added" };
    }
  }

  getHello(lang) {
    if (this.list.lang == undefined) {
      return { statuscode: 501, message: "Unknown language" };
    } else {
      return { statuscode: 200, message: this.list.lang };
    }
  }

  deleteHello(lang) {
    if (lang in this.list) {
      delete this.list.lang;
      return { statuscode: 200, message: "Language deleted" };
    } else {
      return { statuscode: 500, message: "Language unknown, can't delete it " };
    }
  }
}

//list which contains all the language know by the server
const str = new Store();

module.exports = str;
