'use strict';

process.env.SECRET = 'test';

const jwt = require('jsonwebtoken');

const server = require('../../../src/app.js').server;
const supergoose = require('../../supergoose.js');
const Role = require('../../../src/auth/role-model');
const User = require('../../../src/auth/users-model');

const mockRequest = supergoose.server(server);

let users = {
  admin: new User({ username: 'admin', password: 'password', role: 'admin' }),
  editor: new User({ username: 'editor', password: 'password', role: 'editor' }),
  user: new User({ username: 'user', password: 'password', role: 'user' }),
};

beforeAll(async () => {
  await supergoose.startDB();

  await users.admin.save();
  await users.editor.save();
  await users.user.save();

  console.log('All Users', await User.find());
});

// return mockRequest
//           .get('/categories')
//           .expect(200);
afterAll(supergoose.stopDB);

// describe('Categories Route', () => {

//   //Object.keys(users).forEach(userType => {

//   // describe(`${userType} users`, () => {

//   let newCategory='eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjVkMDBkMWFiZmFmMjRmNzQ5ZjU1ODkzNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJyZWFkIiwidXBkYXRlIiwiZGVsZRmNzQ5ZjU1ODkzNyIsImNhcGFiaWxpdGllcyI6WyJjcmVhdGUiLCJyZWFkIiwidXBkYXRlIiwiZGxTHODAznOGJMjGhDBKTK9ucwo-BPt63P-4hF4Jk';
// let token;
it('can create category for user with create permission', async () => {
  return mockRequest
    .post('/categories')
    .set('Authorization', `Bearer ${users.editor.generateToken()}`)
    .send({
      name: 'floyd',
    })
    .expect(200)
    .expect(res => {
      expect(res.body).toBeDefined();
      //newCategory = res.body;
    });
});

//   it('cannot create category for user without create permission', () => {
//     return mockRequest
//       .post('/categories')
//       .set('Authorization', `Bearer ${tokenForUserWitoutCreate}`)
//       .send({
//         name: 'floyd',
//       })
//       .expect(200)
//       .expect(res => {
//         expect(res.body).toBeDefined();
//         newCategory = res.body;
//       });
//   });

it('anyone can get to categories with no logging in', () => {
  new Role({
    role: 'user',
    capabilities: ['read'],
  }).save();
  return mockRequest
    .get('/categories')
    .set('Authorization', `Bearer ${users.user.generateToken()}`)
    .expect(200);
});

// it('can signin with basic', () => {
//   return mockRequest.post('/signin')
//     .auth(users[userType].username, users[userType].password)
//     .then(results => {
//       var token = jwt.verify(results.text, process.env.SECRET);
//       expect(token.id).toEqual(id);
//       expect(token.capabilities).toBeDefined();
//     });
// });

// it('can signin with bearer', () => {
//   return mockRequest.post('/signin')
//     .set('Authorization', `Bearer ${encodedToken}`)
//     .then(results => {
//       var token = jwt.verify(results.text, process.env.SECRET);
//       expect(token.id).toEqual(id);
//       expect(token.capabilities).toBeDefined();
//    });
// });

// });

//});

//});
