const { Product } = require('../schemas/Product');

const AppError = require('../../../errors/AppError');

class ProductRepository {
  async find() {
    const products = Product.find({});

    return products;
  }

  async findById(id) {
    const product = Product.findById(id);

    return product;
  }

  async findByTitleOrCategory(data) {
    const query = data.split(',');

    const product = await Product.find({
      $or: [
        { title: { $regex: data, $options: 'i' } },
        { 'categories.name': { $in: [...query] } },
      ],
    });

    return product;
  }

  async create(data) {
    const product = new Product(data);

    await product.save();

    return product;
  }

  async delete(id) {
    await Product.findByIdAndDelete(id);

    return id;
  }

  async save(product) {
    try {
      Object.keys(product).forEach(
        key => product[key] === undefined && delete product[key],
      );

      const updatedProduct = await Product.findByIdAndUpdate(
        product._id,
        product,
        {
          returnOriginal: false,
          new: true,
        },
      );

      return updatedProduct;
    } catch (e) {
      throw new AppError('Something wrong happened. Try again later', 500);
    }
  }

  async associateCategory(id, category) {
    const product = await Product.findById(id);

    if (!product) {
      throw new AppError('Product not found', 404);
    }

    if (product && !product?.categories) {
      product.categories = [];
    }

    product?.categories.push(category);

    const data = await product.save();

    return data;
  }
}

module.exports = ProductRepository;
