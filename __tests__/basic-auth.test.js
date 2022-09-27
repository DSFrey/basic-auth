'use strict';

const {app} = require('../src/server');
const { sequelize } = require('../src/auth/models/users-model');
const supertest = require('supertest');
const mockRequest = supertest(app);

beforeAll(async ()=>{
  await sequelize.sync();
});

afterAll(async ()=>{
  await sequelize.drop();
});

describe('Auth Tests', ()=>{
  test('Allows a user to signup with a POST to /signup', async ()=>{
    let response = await mockRequest.post('/signup').send({username: 'Tester', password: 'qwerty'});
    expect(response.status).toEqual(200);
    expect(response.body.username).toEqual('Tester');
    expect(response.body.password).not.toEqual('qwerty');
  });
});
