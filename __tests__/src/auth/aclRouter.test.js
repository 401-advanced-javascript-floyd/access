'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');

const mockRequest = supergoose.server(server);

let aclRouter = require('../../../src/auth/aclRouter.js');
beforeAll(async (done) => {
  await supergoose.startDB();
  done();
});
afterAll(supergoose.stopDB);

describe('make sure access is correct', () => {
  // let encodedToken;
  // let id;

  it('/hidden-stuff "error": "Invalid User ID/Password" when not logged in', () => {
    return mockRequest.get('/hidden-stuff', { "Authorization": "Basic dGVzdDoxMjM0" })

      .then(results => {
        var token = jwt.verify(results.text, process.env.SECRET);
        expect(token.id).toEqual({ "error": "Invalid User ID/Password" });
      });
  });
})
