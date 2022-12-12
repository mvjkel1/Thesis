const request = require('supertest');
const baseURL = 'http://localhost:3001';

describe('groups', () => {
  // Authorization needed
  let token = '';
  beforeAll(async () => {
    const user = {
      email: 'test@test.com',
      password: 'testtest'
    };
    const response = await request(baseURL).post('/api/v1/users/login').send(user);
    token = response.body.token;
  });

  let groupId = '';
  it('Create a group --> should return 201', async () => {
    const group = {
      name: 'testGroup'
    };
    const createGroupResponse = await request(baseURL)
      .post('/api/v1/groups')
      .set('Authorization', `Bearer ${token}`)
      .send(group);
    groupId = createGroupResponse.body.data.group.id;
    expect(createGroupResponse.statusCode).toBe(201);
  });

  it('Get a group --> should return 200', async () => {
    const getGroupResponse = await request(baseURL)
      .get(`/api/v1/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(getGroupResponse.statusCode).toBe(200);
  });

  it('Get current logged in user --> should return 200', async () => {
    const getCurrentLoggedInUserResponse = await request(baseURL)
      .get(`/api/v1/groups/my-group`)
      .set('Authorization', `Bearer ${token}`);
    expect(getCurrentLoggedInUserResponse.statusCode).toBe(200);
  });

  it('Update a group --> should return 200', async () => {
    const updatedGroup = {
      name: 'groupTest'
    };
    const updateGroupResponse = await request(baseURL)
      .patch(`/api/v1/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`)
      .send(updatedGroup);
    expect(updateGroupResponse.statusCode).toBe(200);
  });

  it('Delete a group --> should return 204', async () => {
    // Wipe out a group
    const deleteGroupResponse = await request(baseURL)
      .delete(`/api/v1/groups/${groupId}`)
      .set('Authorization', `Bearer ${token}`);
    expect(deleteGroupResponse.statusCode).toBe(204);
  });

  it('Get all groups --> should 0 results', async () => {
    const getAllGroupsResponse = await request(baseURL).get('/api/v1/groups');
    // As we removed a group
    expect(getAllGroupsResponse.body.results).toBe(0);
  });
});
