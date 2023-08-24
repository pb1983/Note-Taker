const api = require('express').Router()
const notes = require('./notes.js')

api.use('/notes', notes);

module.exports = api;
