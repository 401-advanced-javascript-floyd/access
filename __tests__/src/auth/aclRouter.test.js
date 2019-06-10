'use strict';

process.env.SECRET = 'test';

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

beforeAll(async (done) => {
  await supergoose.startDB();
  done();
});
afterAll(supergoose.stopDB);

describe('make sure access is correct', () => {
  // let encodedToken;
  // let id;

  it('/hidden-stuff "error": "Invalid User ID/Password" when not logged in', () => {
    return mockRequest
      .get('/hidden-stuff')
      .expect(401);
  });

  it('/hidden-stuff "error": "Invalid User ID/Password" for invalid username/password', () => {
    return mockRequest
      // .get('/hidden-stuff', { "Authorization": "Basic dGVzdDoxMjM0" })
      .get('/hidden-stuff')
      .auth('test', '1234')
      .expect(401);
  });
})
