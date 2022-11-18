const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("classes", () => {
  it("GET --> should return 401", async () => {
    const response = await request(baseURL).get("/api/v1/classes");
    expect(response.statusCode).toBe(401);
  });
});
