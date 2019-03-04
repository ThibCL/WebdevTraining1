class Store {
  constructor() {
    this.list = {};
  }

  addHello(lang, hello) {
    if (lang in this.list) {
      return {
        statuscode: 400,
        message: "Language already known"
      };
    } else {
      this.list[lang] = hello;
      return { statuscode: 200, message: "Language added" };
    }
  }

  getHello(lang) {
    return { statuscode: 200, message: this.list[lang] };
  }

  deleteHello(lang) {
    delete this.list[lang];
    return { statuscode: 200, message: "Language deleted" };
  }
}

//list which contains all the language know by the server
const str = new Store();

module.exports = str;
