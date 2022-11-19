const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("wrong route", () => {
  it("GET --> should return 404", async () => {
    const response = await request(baseURL).get("/defalut");
    expect(response.statusCode).toBe(404);
  });
});
