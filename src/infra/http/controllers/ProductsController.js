const Yup = require('yup');

const AppError = require('../../../errors/AppError');

const createValidator = Yup.object().shape({
  title: Yup.string().required().min(3).max(256),
  price: Yup.number().required(),
  description: Yup.string().required().min(8).max(256),
  categories: Yup.string().required(),
});

const updateValidator = Yup.object().shape({
  title: Yup.string().min(3).max(256),
  price: Yup.number(),
  description: Yup.string().min(8).max(256),
  categories: Yup.string(),
});

class ProductsController {
  constructor(
    createProductService,
    updateProductService,
    listProductService,
    deleteProductService,
  ) {
    this.createProductService = createProductService;
    this.updateProductService = updateProductService;
    this.listProductService = listProductService;
    this.deleteProductService = deleteProductService;
  }

  async index(request, response) {
    const { query } = request.query;

    let products;

    if (query) {
      products = await this.listProductService.findByTitleOrCategory(query);
    } else {
      products = await this.listProductService.find();
    }

    return response.json(products);
  }

  async create(request, response) {
    const product = createValidator.validateSync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { title, description, price } = product;

    let { categories } = request.body;
    const listCategories = await this.getCategories(categories);

    if (!listCategories || (listCategories && listCategories.length === 0)) {
      throw new AppError('Missing categories', 400);
    }

    const data = await this.createProductService.execute({
      title,
      description,
      price,
      categories: listCategories,
    });

    return response.json(data);
  }

  async update(request, response) {
    const product = updateValidator.validateSync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { id } = request.params;

    const { title, description, price } = product;

    let { categories } = request.body;

    let listCategories;

    if (categories) {
      listCategories = await this.getCategories(categories);
    }

    const data = await this.updateProductService.execute(id, {
      title,
      description,
      price,
      categories: listCategories,
    });

    return response.json(data);
  }

  async delete(request, response) {
    const { id } = request.params;

    const data = await this.deleteProductService.execute(id);

    return response.json(data);
  }

  async show(request, response) {
    const { id } = request.params;
    const product = await this.listProductService.findById(id);

    if (!product) {
      throw new AppError('Not found', 404);
    }

    return response.json(product);
  }

  async getCategories(categories) {
    let categoriesInstance;

    if (categories) {
      categoriesInstance = [];
      let toArray = categories.split(',');

      for (let category of toArray) {
        if (category !== '') {
          categoriesInstance.push({ name: category });
        }
      }
    }

    return categoriesInstance;
  }
}

module.exports = ProductsController;
