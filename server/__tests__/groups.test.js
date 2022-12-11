const request = require("supertest");
const baseURL = "http://localhost:3001";

describe("groups", () => {
  it("Get all groups --> should return 201", async () => {
    const response = await request(baseURL).get("/api/v1/groups");
    expect(response.statusCode).toBe(201);
  });

  // Authorization needed
  let token = "";
  beforeAll(async () => {
    const user = {
      email: "test@test.com",
      password: "testtest",
    };
    const response = await request(baseURL)
      .post("/api/v1/users/login")
      .send(user);
    token = response.body.token;
  });

  let groupId = "";
  it("Create a group --> should return 201", async () => {
    const group = {
      name: "testGroup",
    };

    const createGroupResponse = await request(baseURL)
      .post("/api/v1/groups")
      .set("Authorization", `Bearer ${token}`)
      .send(group);
    groupId = createGroupResponse.body.data.group.id;
    expect(createGroupResponse.statusCode).toBe(201);
  });

  it("Delete a group --> should return 204", async () => {
    // Wipe out a group
    const deleteGroupResponse = await request(baseURL)
      .delete(`/api/v1/groups/${groupId}`)
      .set("Authorization", `Bearer ${token}`);
    expect(deleteGroupResponse.statusCode).toBe(204);
  });
});
