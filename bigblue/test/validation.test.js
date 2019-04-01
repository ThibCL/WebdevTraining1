const fonct = require("../validation.js").fonction;

describe("test validateorigin function", () => {
  test("Test of sucess", () => {
    let origin = ["123", "345"];
    expect(fonct.validateOrigin(origin)).toEqual(true);
  });

  test("Test of length error", () => {
    let origin = ["12", "34", "57"];
    expect(fonct.validateOrigin(origin)).toEqual(false);
  });

  test("Test of string error", () => {
    let origin = [12, 23];
    expect(fonct.validateOrigin(origin)).toEqual(false);
  });

  test("Test of type array error", () => {
    let origin = "123";
    expect(fonct.validateOrigin(origin)).toEqual(false);
  });
});

describe("test validateSchemeDestination", () => {
  test("Test of sucess", () => {
    let destination = "Eu-USA-015";
    expect(fonct.validateSchemaDestination(destination)).toEqual(true);
  });

  test("Test of region error", () => {
    let destination = "Eur-USA-015";
    expect(fonct.validateSchemaDestination(destination)).toEqual(false);
  });

  test("Test of iso3code error", () => {
    let destination = "Eu-Uxx-015";
    expect(fonct.validateSchemaDestination(destination)).toEqual(false);
  });

  test("Test of warehouse length error", () => {
    let destination = "Eu-USA-15";
    expect(fonct.validateSchemaDestination(destination)).toEqual(false);
  });

  test("Test of warehouse type error", () => {
    let destination = "Eu-USA-aze";
    expect(fonct.validateSchemaDestination(destination)).toEqual(false);
  });
});

describe("Test of validateDataDestination", () => {
  test("Test of sucess", () => {
    let destination = "EU-FRA-001";
    expect(fonct.validateDataDestination(destination)).toEqual(true);
  });
  test("Test of data destination error", () => {
    let destination = "EU-FRA-002";
    expect(fonct.validateDataDestination(destination)).toEqual(false);
  });
});

describe("Test of validateSchemaDepartureTime", () => {
  test("test of sucess", () => {
    let time = "2019-03-15T10:02:43.705Z";
    expect(fonct.validateSchemaDepartureTime(time)).toEqual(true);
  });

  test("test of schema time error", () => {
    let time = "15-03-2019T10:02:43.705Z";
    expect(fonct.validateSchemaDepartureTime(time)).toEqual(false);
  });
});
