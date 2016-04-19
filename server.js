const Hapi = require('hapi');
const mongojs = require('mongojs');

// Loads environment variables
// Used only in development
require('dotenv').config({silent: true});

const server = new Hapi.Server();
server.connection({ port: process.env.PORT || 3000 });

// Connect with the database
server.app.db = mongojs(process.env.MONGO_HOST + '/api');

// Add the routes
server.register(require('./routes'), (err) => {

  if (err) {
    console.error('Failed to load plugin:', err);
  }

  // Start the server
  server.start((err) => {
    if (err) {
      throw err;
    }

    console.log('Server running at:', server.info.uri);
  });
});