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
    expect(fonct.schemaValidation(lang)).toThrow(
      "The langage should be two letter"
    );
  });
});
