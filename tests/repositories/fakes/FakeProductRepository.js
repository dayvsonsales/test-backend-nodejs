const AppError = require('../../../src/errors/AppError');

class FakeProductRepository {
  constructor() {
    this.products = [];
  }

  async associateCategory(id, category) {
    const exists = this.products.findIndex(p => p._id === id);

    if (exists !== -1) {
      if (!this.products[exists].categories) {
        this.products[exists].categories = [];
      }

      this.products[exists].categories.push(category);
    }

    return this.products[exists];
  }

  async find() {
    return this.products;
  }

  async findById(id) {
    const products = this.products.find(v => v._id === id);

    return products || null;
  }

  async findByTitleOrCategory(data) {
    const arrayTitleOrCategories = data.split(',');

    return this.products.filter(
      v =>
        v.categories.find(c => arrayTitleOrCategories.includes(c.name)) ||
        arrayTitleOrCategories.includes(v.title),
    );
  }

  async create(data) {
    data._id = `id-${Math.random()}`;

    this.products.push(data);

    return data;
  }

  async delete(id) {
    const index = this.products.findIndex(v => v._id === id);

    if (index === -1) {
      throw new AppError('Not found');
    }

    this.products.slice(index, 1);

    return id;
  }

  async save(product) {
    const index = this.products.findIndex(v => v._id === product._id);

    this.products[index] = product;

    return this.products[index];
  }
}

module.exports = FakeProductRepository;
