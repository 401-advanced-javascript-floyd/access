const express = require('express');
const catRouter = express.Router();

const Categories = require('../models/categories.js');
const categories = new Categories();

const auth = require('../auth/middleware.js');
// const oauth = require('./oauth/google.js');

// Routes
catRouter.get('/categories', auth('read'), getCategories);
catRouter.post('/categories', auth('create'), postCategories);
catRouter.get('/categories/:id', auth('read'), getCategory);
catRouter.put('/categories/:id', auth('update'), putCategories);
catRouter.delete('/categories/:id', auth('delete'), deleteCategories);

//ROUTE HANDLER FUNCTIONS
function getCategories(request, response, next) {
  // expects an array of object to be returned from the model
  categories.findAll()
    .then(data => {
      console.log(data);
      const output = {
        count: data.length,
        results: data,
      };
      response.status(200).json(output);
    })
    .catch(next);
}

function getCategory(request, response, next) {
  // expects an array with the one matching record from the model
  categories.getbyId(request.params.id)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function postCategories(request, response, next) {
  // expects the record that was just added to the database
  categories.post(request.body)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}


function putCategories(request, response, next) {
  // expects the record that was just updated in the database
  categories.put(request.params.id, request.body)
    .then(result => response.status(200).json(result[0]))
    .catch(next);
}

function deleteCategories(request, response, next) {
  // Expects no return value (resource was deleted)
  categories.delete(request.params.id)
    .then(result => response.status(200).json(result))
    .catch(next);
}


module.exports = catRouter;