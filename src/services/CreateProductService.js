class CreateProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(data) {
    const product = await this.productRepository.create(data);

    return product;
  }
}

module.exports = CreateProductService;
