// require the Koa server;
const server = require("../index.js");
// require supertest
const request = require("supertest");

// close the server after each test
afterEach(() => {
  server.close();
});

describe("routes: index", () => {
  test("test of the post", async () => {
    eng = {
      langue: "en",
      hello: "hello"
    };
    const resp2 = await request(server)
      .post("/hello")
      .send(eng);
    expect(resp2.status).toEqual(200);
    expect(resp2.text).toEqual("Language added");
  });

  test("test of the post with langage already added", async () => {
    eng = {
      langue: "en",
      hello: "hello"
    };
    const resp2 = await request(server)
      .post("/hello")
      .send(eng);
    expect(resp2.status).toEqual(400);
    expect(resp2.text).toEqual("Language already known");
  });

  test("Get request ", async () => {
    const response = await request(server).get("/hello?langue=en");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("hello");
  });

  test("Delete request", async () => {
    const response = await request(server).delete("/hello?langue=en");
    expect(response.status).toEqual(200);
    expect(response.text).toEqual("Language deleted");
  });

  test("Get request with error", async () => {
    const response = await request(server).get("/hello?langue=en");
    expect(response.status).toEqual(400);
    expect(response.text).toEqual("The langage request is not allowed");
  });

  test("test of error in the post", async () => {
    eng = {
      langue: "eng",
      hello: "hello"
    };
    const resp2 = await request(server)
      .post("/hello")
      .send(eng);
    expect(resp2.status).toEqual(400);
    expect(resp2.text).toEqual("The langage request is not allowed");
  });

  test("Delete request", async () => {
    const response = await request(server).delete("/hello?langue=en");
    expect(response.status).toEqual(400);
    expect(response.text).toEqual("The langage request is not allowed");
  });
});
