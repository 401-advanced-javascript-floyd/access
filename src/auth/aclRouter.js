'use strict';

const express = require('express');
const aclRouter = express.Router();

const User = require('./users-model.js');
const auth = require('./middleware.js');
const oauth = require('./oauth/google.js');

aclRouter.get('/public-stuff', (req, res, next) => {
  res.status(200).send('ok from public-stuff')
});
aclRouter.get('/hidden-stuff', auth(), (req, res, next) => {
  res.status(200).send('hidden-stuff should only work logedin')
});

aclRouter.get('/something-to-read', auth(), (req, res, next) => {
  res.status(200).send('something-to-read should only work with read rights')
});



module.exports = aclRouter;