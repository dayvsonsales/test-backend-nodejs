const { Router } = require('express');

const associateCategoryController = require('./controllers/AssociateCategoryController');
const productsController = require('./controllers/ProductsController');

const productsRouter = Router();

productsRouter.get('/', (request, response) =>
  productsController.index(request, response),
);
productsRouter.get('/:id', (request, response) =>
  productsController.show(request, response),
);

productsRouter.post('/associate/:id', (request, response) =>
  associateCategoryController.create(request, response),
);

productsRouter.post('/', (request, response) =>
  productsController.create(request, response),
);

productsRouter.put('/:id', (request, response) =>
  productsController.update(request, response),
);

productsRouter.delete('/:id', (request, response) =>
  productsController.remove(request, response),
);

module.exports = productsRouter;
