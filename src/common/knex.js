const config = require('config');
const database = require('../../knexfile');
module.exports = require('knex')(database[config.get('environment')]);