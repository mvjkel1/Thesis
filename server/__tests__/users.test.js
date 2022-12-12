const request = require('supertest');
const baseURL = 'http://localhost:3001';
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const exec = require('child_process').exec;
dotenv.config({ path: './.env_jest' });

describe('users', () => {
  beforeAll(async () => {
    // Connect to the database
    const DB = process.env.MONGO_URI.replace('<password>', process.env.DATABASE_PASSWORD);
    await mongoose.connect(DB, {
      dbName: `${process.env.MONGO_DBNAME}`,
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: true
    });
    const collections = await mongoose.connection.db.listCollections().toArray();

    collections.forEach(async (collection) => {
      await mongoose.connection.db.dropCollection(collection.name);
    });
    exec('npm run import');
  });

  it('Get all users --> should return 201', async () => {
    const response = await request(baseURL).get('/api/v1/users');
    expect(response.statusCode).toBe(201);
  });

  let user = '';
  let token = '';
  it('Sign up a user --> should return 201', async () => {
    const user = {
      name: 'testUser',
      email: 'testUser@testUser.com',
      password: 'testUsertestUser',
      passwordConfirm: 'testUsertestUser'
    };
    const signUpResponse = await request(baseURL).post('/api/v1/users/signup').send(user);
    token = signUpResponse.body.token;
    expect(signUpResponse.statusCode).toBe(201);
  });

  it('Login a user --> should return 201', async () => {
    const user = {
      email: 'testUser@testUser.com',
      password: 'testUsertestUser'
    };
    const loginResponse = await request(baseURL)
      .post('/api/v1/users/login')
      .set('Authorization', `Bearer ${token}`)
      .send(user);
    expect(loginResponse.statusCode).toBe(200);
  });

  it('Update user name --> should return 200', async () => {
    const user = {
      email: 'testUser@testUser.com',
      password: 'testUsertestUser'
    };
    const loginResponse = await request(baseURL)
      .post('/api/v1/users/login')
      .set('Authorization', `Bearer ${token}`)
      .send(user);

    const userUpdated = {
      name: 'userTestUserTest'
    };
    const updateMeResponse = await request(baseURL)
      .patch('/api/v1/users/update-me')
      .set('Authorization', `Bearer ${token}`)
      .send(userUpdated);
    expect(updateMeResponse.statusCode).toBe(200);
  });
});
