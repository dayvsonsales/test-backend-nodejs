class DeleteProductService {
  constructor(productRepository) {
    this.productRepository = productRepository;
  }

  async execute(id) {
    const data = await this.productRepository.delete(id);

    return data;
  }
}

module.exports = DeleteProductService;
