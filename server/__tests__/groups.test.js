const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("groups", () => {
  it("GET --> should return 201", async () => {
    const response = await request(baseURL).get("/api/v1/groups");
    expect(response.statusCode).toBe(201);
  });
});
