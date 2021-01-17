require('dotenv/config');

const logger = require('../../logger');
const express = require('express');
require('express-async-errors');

require('../mongodb/database');

const helmet = require('helmet');
const cors = require('cors');

const routes = require('./routes');

const { ValidationError } = require('yup');
const AppError = require('../../errors/AppError');

const app = express();

app.use(helmet());
app.use(cors());
app.use(express.json());
app.use(routes);

app.use((err, request, response, _) => {
  if (err instanceof AppError) {
    return response
      .status(err.statusCode)
      .json({ status: 'error', message: err.message });
  }

  if (err instanceof ValidationError) {
    if (err.errors && err.errors.length > 1) {
      return response
        .status(400)
        .json({ status: 'error', message: JSON.stringify(err.errors) });
    }

    return response.status(400).json({ status: 'error', message: err.message });
  }

  logger.error(err);

  return response
    .status(500)
    .json({ status: 'error', message: 'Internal server error' });
});

app.listen(3333, () => {
  console.log(`Server started on port 3333`);
});
