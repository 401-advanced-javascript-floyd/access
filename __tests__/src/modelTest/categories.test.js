
'use strict';
const mongoose = require('mongoose');
//const server = require('./src/app.js');
process.env.SECRET = 'test';

//const supergoose = require('../../../supergoose.js');
const MONGODB_URI = process.env.MONGODB_URI ||
  'mongodb://localhost/401d3-people';

const Categories = require('../../../src/models/categories');
let categories = new Categories();
var newId;

describe('work with categories', () => {
  beforeAll(async () => {
    // return mongoConnect(MONGODB_URI);
    // Start up DB Server
    const options = {
      useNewUrlParser: true,
      useCreateIndex: true,
    };
    await mongoose.connect(MONGODB_URI, options);

  });

  it('post new info to db', async () => {
    var result = await categories.post({
      'name': 'Datetree D',
      'description': '#1  web dev company ever',
    });

    newId = result._id;
    expect(result._id).toBeDefined();

  });
  it('get new info from db', async () => {
    let result2 = await categories.getbyId({ _id: newId });
    expect(result2.name).toEqual('Datetree D');

  });
  it('update item', async () => {
    let result = await categories.put({ _id: newId }, { name: 'Mr updated' });
    console.log(result);

    // console.log(result2);
    expect(result.name).toEqual('Mr updated');
    // expect(result.name).toBe('Datetree Guy');

  });
  it('delete item', async () => {
    let result = await categories.delete({ _id: newId });
    console.log('l49', result.name);
  });
});
