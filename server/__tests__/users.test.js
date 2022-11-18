const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("users", () => {
  it("GET --> should return 201", async () => {
    const response = await request(baseURL).get("/api/v1/users");
    expect(response.statusCode).toBe(201);
  });

  it("POST --> should return 201", async () => {
    const user = {
      email: "test@test.com",
      password: "testtest",
    };
    const response = await request(baseURL)
      .post("/api/v1/users/login")
      .send(user);
    expect(response.statusCode).toBe(200);
  });
});
