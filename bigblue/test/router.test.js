const router = require("../router");
const logger = require("../logger");
const server = require("../index.js");
const request = require("supertest");

// close the server after each test
afterEach(() => {
  server.close();
});

describe("test of post", () => {
  test("test of a sucess", async () => {
    pos = {
      origin: ["43.43", "53.34"],
      destination: "EU-FRA-001",
      departure_time: "2019-03-15T10:02:43.705Z"
    };
    const resp2 = await request(server)
      .post("/inbound-shipments")
      .send(pos);
    expect(JSON.parse(resp2.text)).toEqual({
      id: "b5f695dcadefccf73488111b3562f125",
      distance: 9239108.8,
      expected_delivery_time: "2019-03-15T10:02:43.705Z"
    });
  });

  test("test of an origin error", async () => {
    pos = {
      origin: ["53.34"],
      destination: "EU-FRA-001",
      departure_time: "2019-03-15T10:02:43.705Z"
    };
    const resp3 = await request(server)
      .post("/inbound-shipments")
      .send(pos);
    expect(resp3.status).toEqual(400);
  });

  test("test of an destination error", async () => {
    pos = {
      origin: ["43.43", "53.34"],
      destination: "EU-FRA-002",
      departure_time: "2019-03-15T10:02:43.705Z"
    };
    const resp4 = await request(server)
      .post("/inbound-shipments")
      .send(pos);
    expect(resp4.status).toEqual(400);
  });

  test("test of an departure_time error", async () => {
    pos = {
      origin: ["43.43", "53.34"],
      destination: "EU-FRA-001",
      departure_time: "15-03-2019"
    };
    const resp5 = await request(server)
      .post("/inbound-shipments")
      .send(pos);
    expect(resp5.status).toEqual(400);
  });
});

describe("test of get", () => {
  test("test of success", async () => {
    const resp6 = await request(server).get("/inbound-shipments");
    expect(JSON.parse(resp6.text)).toEqual([
      {
        id: "b5f695dcadefccf73488111b3562f125",
        distance: 9239108.8,
        expected_delivery_time: "2019-03-15T10:02:43.705Z"
      }
    ]);
  });
});
