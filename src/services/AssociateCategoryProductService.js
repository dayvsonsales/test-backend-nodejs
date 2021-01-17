const AppError = require('../errors/AppError');

class AssociateCategoryProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id, category) {
    const exists = await this.productRepository.findById(id);

    if (!exists) {
      throw new AppError('Product not found', 404);
    }

    const product = await this.productRepository.associateCategory(
      id,
      category,
    );

    return product;
  }
}

module.exports = AssociateCategoryProductService;
