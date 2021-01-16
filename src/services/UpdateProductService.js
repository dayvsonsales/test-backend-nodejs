const AppError = require('../errors/AppError');

class UpdateProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(_id, { title, description, price, categories }) {
    const currentProduct = await this.productRepository.findById(_id);

    if (!currentProduct) {
      throw new AppError('Invalid product id', 404);
    }

    const data = await this.productRepository.save({
      _id,
      title,
      description,
      price,
      categories,
    });

    return data;
  }
}

module.exports = UpdateProductService;
