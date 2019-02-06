//this function checks if a language is already in the list
function dansListe(lister, lgs) {
  let res = true;
  for (let k = 0; k < lister.length; k++) {
    if (lister[k].langue == lgs) {
      res = false;
    }
  }
  return res;
}

class Store {
  constructor() {
    this.list = [];
  }

  addHello(lang, hello) {
    if (dansListe(this.list, lang)) {
      this.list.push({
        langue: lang,
        hello: hello
      });
      return [200, "language added"];
    } else {
      return [500, "language already known"];
    }
  }

  getHello(lang) {
    let i = 0;
    let s = -1;
    while (i < this.list.length) {
      if (this.list[i].langue == lang) {
        s = i;
      }
      i++;
    }
    if (s == -1) {
      return [501, "Unknown language"];
    } else {
      return [200, this.list[s].hello];
    }
  }

  deleteHello(lang) {
    let j = 0;
    let indice = 0;
    let sup = false;
    while (j < this.list.length) {
      if (this.list[j].langue == lang) {
        indice = j;
        sup = true;
      }
      j++;
    }
    if (sup == true) {
      this.list.splice(indice, 1);
      return [200, "language deleted"];
    } else {
      return [500, "Language unknown, can't delete it"];
    }
  }
}

module.exports = Store;
