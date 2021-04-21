const app = require('./app');
const http = require('http');
const config = require('./utils/config');
const logger = require('./utils/logger');

const server = http.createServer(app);

server.listen(config.PORT, () => {
  logger.info(`server running on port ${config.PORT}`);
});

// const config = require('./utils/config');

// const express = require('express');
// const app = express();
// const cors = require('cors');
// const Note = require('./models/note');

// app.use(cors());
// app.use(express.json());
// app.use(express.static('build'));

// const requestLogger = (request, response, next) => {
//   console.log('Method:', request.method);
//   console.log('Path:  ', request.path);
//   console.log('Body:  ', request.body);
//   console.log('---');
//   next();
// };

// app.use(requestLogger);

// app.listen(config.PORT, () => {
//   console.log(`Server running on port ${config.PORTPORT}`);
// });

// app.get('/', (req, res) => {
//   res.send('<h1>Hello World!</h1>');
// });

// app.get('/api/notes', (request, response) => {
//   Note.find({}).then((notes) => {
//     response.json(notes);
//   });
// });

// app.post('/api/notes', (request, response, next) => {
//   const body = request.body;

//   const note = new Note({
//     content: body.content,
//     important: body.important || false,
//     date: new Date(),
//   });

//   note
//     .save()
//     .then((savedNote) => {
//       response.json(savedNote);
//     })
//     .catch((error) => next(error));
// });

// app.get('/api/notes/:id', (request, response, next) => {
//   Note.findById(request.params.id)
//     .then((note) => {
//       if (note) {
//         response.json(note);
//       } else {
//         response.status(404).end();
//       }
//     })
//     .catch((error) => {
//       next(error);
//     });
// });

// app.delete('/api/notes/:id', (request, response, next) => {
//   Note.findByIdAndRemove(request.params.id)
//     .then(() => {
//       response.status(204).end();
//     })
//     .catch((error) => next(error));
// });

// app.put('/api/notes/:id', (request, response, next) => {
//   const body = request.body;

//   const note = {
//     content: body.content,
//     important: body.important,
//   };

//   Note.findByIdAndUpdate(request.params.id, note, { new: true })
//     .then((updatedNote) => {
//       response.json(updatedNote);
//     })
//     .catch((error) => next(error));
// });

// // unknown endpoints
// const unknownEndpoint = (request, response) => {
//   response.status(404).send({ error: 'unknown endpoint' });
// };

// app.use(unknownEndpoint);

// const errorHandler = (error, request, response, next) => {
//   console.error(error.message);

//   if (error.name === 'CastError') {
//     return response.status(400).send({ error: 'malformatted id' });
//   } else if (error.name === 'ValidationError') {
//     return response.status(400).json({ error: error.message });
//   }
//   next(error);
// };

// app.use(errorHandler);