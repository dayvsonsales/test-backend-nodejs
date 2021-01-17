const Yup = require('yup');
const isValidObjectId = require('mongoose').isValidObjectId;

const AppError = require('../../../errors/AppError');

const validator = Yup.object().shape({
  category: Yup.string().required(),
});

class AssociateCategoryController {
  constructor(associateCategoryProductService) {
    this.associateCategoryProductService = associateCategoryProductService;
  }

  async create(request, response) {
    const { id } = request.params;

    if (!isValidObjectId(id)) {
      throw new AppError('Invalid id', 400);
    }

    const categoryObject = validator.validateSync(request.body, {
      abortEarly: false,
      stripUnknown: true,
    });

    const { category } = categoryObject;

    const product = await this.associateCategoryProductService.execute(id, {
      name: category,
    });

    return response.json(product);
  }
}

module.exports = AssociateCategoryController;
