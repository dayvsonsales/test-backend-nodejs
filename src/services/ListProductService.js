class ListProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async find() {
    const products = await this.productRepository.find();

    return products;
  }

  async findById(id) {
    const product = await this.productRepository.findById(id);

    return product;
  }

  async findByTitleOrCategory(query) {
    const product = await this.productRepository.findByTitleOrCategory(query);

    return product;
  }
}

module.exports = ListProductService;
