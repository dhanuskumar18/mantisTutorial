const knex = require("knex");
const knexConfig = require('./knexfile');

// Select environment based on NODE_ENV or default to 'development'
const environment = process.env.NODE_ENV || "development";
console.log(knexConfig);
console.log(environment);

// Initialize Knex with the selected environment's configuration
const db = knex(knexConfig[environment]);

module.exports = db;
