const Joi = require('joi');
const Boom = require('boom');

exports.register = (server, options, next) => {
  const messages = server.app.db.collection('messages');

  // Get all the messages
  server.route({
    method: 'GET',
    path: '/',
    handler: (request, reply) => {

      messages.find((err, docs) => {

        if (err) {
          return reply(Boom.badData('Oops! There was an error with MongoDB', err));
        }

        reply(docs);
      });
    }
  });

  // Add a new message
  server.route({
    method: 'POST',
    path: '/',
    handler: (request, reply) => {

      messages.save(request.payload, (err, result) => {

        if (err) {
          return reply(Boom.badData('Oops! There was an error with MongoDB', err));
        }

        reply(result);
      });
    },
    config: {
      validate: {
        payload: {
          message: Joi.string().required()
        }
      }
    }
  });

  next();
}

exports.register.attributes = {
  name: 'routes'
};