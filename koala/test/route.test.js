const fonct = require("../route.js").function;

describe("route test", () => {
  test("test of formating function", () => {
    let upper = "LaNg";
    let lower = fonct.formating(upper);
    expect(lower).toEqual("lang");
  });
  test("test of datavalidation function", () => {});

  test("test of schemavalidation function", () => {
    let lang = "eng";
    expect(fonct.schemaValidation(lang)).toEqual(false);
  });

  test("test of validateExistence function", () => {
    let lang = "en";
    expect(fonct.validateExistence(lang)).toEqual(true);
  });

  test("test of error validateExistence function", () => {
    let lang = "xx";
    expect(fonct.validateExistence(lang)).toEqual(false);
  });
});

//faker pour les tests!
