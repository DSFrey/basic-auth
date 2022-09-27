'use strict';

const { app } = require('../src/server');
const { sequelize } = require('../src/auth/models/users-model');
const supertest = require('supertest');
const { basicAuth } = require('../src/auth/middleware/basic');
const mockRequest = supertest(app);

let user = { username: 'test', password: 'pass' };

beforeAll(async () => {
  await sequelize.sync();
});

afterAll(async () => {
  await sequelize.drop();
});

describe('Auth Tests', () => {
  test('Allows a user to signup with a POST to /signup', async () => {
    let response = await mockRequest.post('/signup').send(user);
    expect(response.status).toEqual(201);
    expect(response.body.username).toEqual('test');
    expect(response.body.password).not.toEqual('pass');
  });

  test('/signin fails appropiately', async () => {
    let req = { headers: { authorization: 'Basic bad' } };
    let res = { status: null };
    let next = jest.fn();
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith('Invalid Login');
  });
  test('/signin passes appropiately', async () => {
    let req = { headers: { authorization: 'Basic dGVzdDpwYXNz' } };
    let res = { status: null };
    let next = jest.fn();
    await basicAuth(req, res, next);
    expect(next).toHaveBeenCalledWith();
  });
});
