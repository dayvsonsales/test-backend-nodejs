const Yup = require('yup');
const isValidObjectId = require('mongoose').isValidObjectId;

const AppError = require('../../../../../errors/AppError');

const {
  createProduct,
  deleteProduct,
  updateProduct,
  findById,
  find,
  findByTitleOrCategory,
} = require('../../../../../services/ProductService');

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

/**
 * @name index - Show products
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Object} - Response object
 */
const index = (request, response) => {
  const { query } = request.query;

  if (query) {
    findByTitleOrCategory(query)
      .then(products => {
        return response.json(products);
      })
      .catch(err => {
        return response.json(err);
      });
  } else {
    find()
      .then(products => {
        return response.json(products);
      })
      .catch(err => {
        return response.json(err);
      });
  }
};

/**
 * @name create - Create products
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Object} - Response object
 */
const create = (request, response) => {
  const product = createValidator.validateSync(request.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const { title, description, price } = product;

  let { categories } = request.body;
  const listCategories = getCategories(categories);

  if (!listCategories || (listCategories && listCategories.length === 0)) {
    throw new AppError('Missing categories', 400);
  }

  createProduct({
    title,
    description,
    price,
    categories: listCategories,
  })
    .then(data => {
      response.json({ success: true, data });
    })
    .catch(err => response.json(err));
};

/**
 * @name update - Update products
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Object} - Response object
 */
const update = (request, response) => {
  const product = updateValidator.validateSync(request.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const { id } = request.params;

  if (!isValidObjectId(id)) {
    throw new AppError('Invalid id', 400);
  }

  const { title, description, price } = product;

  let { categories } = request.body;

  let listCategories;

  if (categories) {
    listCategories = this.getCategories(categories);
  }

  updateProduct(id, {
    title,
    description,
    price,
    categories: listCategories,
  })
    .then(product => response.json({ success: true, data: product }))
    .catch(err => response.json({ success: false, err }));
};

/**
 * @name remove - Update product
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Object} - Response object
 */
const remove = (request, response) => {
  const { id } = request.params;

  if (!isValidObjectId(id)) {
    throw new AppError('Invalid id', 400);
  }

  deleteProduct(id)
    .then(_ => response.json({ success: true, id }))
    .catch(err => response.json({ success: false, err: err }));
};

/**
 * @name show - Show product by id
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Object} - Response object
 */
const show = (request, response) => {
  const { id } = request.params;

  if (!isValidObjectId(id)) {
    throw new AppError('Invalid id', 400);
  }

  findById(id)
    .then(product => {
      if (product) {
        response.json({ success: true, data: product });
      } else {
        response.json({ success: false, err: 'Product not found' });
      }
    })
    .catch(err => response.json({ success: false, err: err }));
};

/**
 * @name getCategories - Get categories
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Array} - A categories array
 */
const getCategories = categories => {
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
};

module.exports = { index, create, update, remove, show };
