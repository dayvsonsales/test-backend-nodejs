const { Router } = require('express');

const CreateProductService = require('../../../services/CreateProductService');
const DeleteProductService = require('../../../services/DeleteProductService');
const ListProductService = require('../../../services/ListProductService');
const UpdateProductService = require('../../../services/UpdateProductService');

const AssociateCategoryController = require('../controllers/AssociateCategoryController');
const AssociateCategoryProductService = require('../../../services/AssociateCategoryProductService');

const ProductsController = require('../controllers/ProductsController');

const ProductRepository = require('../../mongodb/repositories/ProductRepository');

const productRepository = new ProductRepository();

const productsRouter = Router();
const productsController = new ProductsController(
  new CreateProductService(productRepository),
  new UpdateProductService(productRepository),
  new ListProductService(productRepository),
  new DeleteProductService(productRepository),
);

const associateCategoryController = new AssociateCategoryController(
  new AssociateCategoryProductService(productRepository),
);

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
  productsController.delete(request, response),
);

module.exports = productsRouter;
