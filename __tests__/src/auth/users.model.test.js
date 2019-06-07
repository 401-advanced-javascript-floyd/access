const supergoose =require('../../supergoose');
let User = require('../../../src/auth/users-model')
let Role = require('../../../src/auth/role-model')


beforeAll(supergoose.startDB);
afterAll(supergoose.stopDB);

describe('User Model', ()=>{
  describe('findOne', ()=>{
    it('populates acl', async ()=>{
     
      await new User({
        username: 'k', password: 'd', role: 'editor' }).save();
        await new Role({role: 'editor', capabilities:['c', 'r','u']}).save();
        //ACt
        let user = await User.findOne({ username: 'k'}).lean();
expect(user).toBeDefined();
expect(user.acl).toBeDefined();
expect(user.acl.capabilities).toEqual(['c','r','u']);
      })
    })
  })
