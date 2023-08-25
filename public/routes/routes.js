const api = require('express').Router()
const notes = require('./notes.js')

//Routes all APIs with a 'notes' endpoint 

api.use('/notes', notes);

module.exports = api;
