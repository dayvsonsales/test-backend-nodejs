const Yup = require('yup');

const validator = Yup.object().shape({
  category: Yup.string().required(),
});

class AssociateCategoryController {
  constructor(associateCategoryProductService) {
    this.associateCategoryProductService = associateCategoryProductService;
  }

  async create(request, response) {
    const { id } = request.params;

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
