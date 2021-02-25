const Yup = require('yup');
const isValidObjectId = require('mongoose').isValidObjectId;

const associateCategoryProductService = require('../../../../../services/AssociateCategoryProductService');

const AppError = require('../../../../../errors/AppError');

const validator = Yup.object().shape({
  category: Yup.string().required(),
});

/**
 * @name create - Associate a category to a product
 *
 * @param {Request} request
 * @param {Response} response
 *
 * @returns {Object} - Product object
 */
const create = (request, response) => {
  const { id } = request.params;

  if (!isValidObjectId(id)) {
    throw new AppError('Invalid id', 400);
  }

  const { execute: associateCategory } = associateCategoryProductService;

  const categoryObject = validator.validateSync(request.body, {
    abortEarly: false,
    stripUnknown: true,
  });

  const { category } = categoryObject;

  associateCategory(id, {
    name: category,
  })
    .then(product => response.json({ success: true, data: product }))
    .catch(err => response.json({ success: false, err }));
};

module.exports = { create };
