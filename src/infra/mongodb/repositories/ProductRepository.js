const { Product } = require('../schemas/Product');

const AppError = require('../../../errors/AppError');

class ProductRepository {
  /**
   * @name find - Search products
   *
   * @returns {array} - Product array
   */
  find() {
    const products = Product.find({});

    return products;
  }

  /**
   * @name find - Search products by id
   *
   * @param {number} id
   *
   * @returns {array} - Product array
   */
  findById(id) {
    const product = Product.findById(id);

    return product;
  }

  /**
   * @name find - Search products by title or category
   *
   * @param {object} data - query object
   *
   * @returns {array} - Product array
   */
  findByTitleOrCategory(data) {
    const query = data.split(',');

    const product = Product.find({
      $or: [
        { title: { $regex: data, $options: 'i' } },
        { 'categories.name': { $in: [...query] } },
      ],
    });

    return product;
  }

  /**
   * @name create - Create products
   *
   * @param {object} data
   *
   * @returns {object} - Product created
   */
  create(data) {
    const product = new Product(data).save();

    return product;
  }

  /**
   * @name delete - Delete products
   *
   * @param {number} id
   *
   * @returns {object} - Product deleted
   */
  delete(id) {
    return Product.findByIdAndDelete(id);
  }

  /**
   * @name save - Save a product
   *
   * @param  {object} product
   *
   * @return {object} - Product saved
   */
  save(product) {
    return new Promise((resolve, reject) => {
      Object.keys(product).forEach(
        key => product[key] === undefined && delete product[key],
      );

      Product.findByIdAndUpdate(product._id, product, {
        returnOriginal: false,
        new: true,
      })
        .then(updatedProduct => resolve(updatedProduct))
        .catch(err => reject(err));
    });
  }

  /**
   * @name associateCategory - Associate category
   *
   * @param {number} id
   * @param {string} category
   *
   * @returns {object}
   */
  associateCategory(id, category) {
    return new Promise((resolve, reject) => {
      Product.findById(id)
        .then(product => {
          if (!product) {
            throw new AppError('Product not found', 404);
          }

          if (product && !product?.categories) {
            product.categories = [];
          }

          product?.categories.push(category);

          product
            .save()
            .then(data => {
              resolve(data);
            })
            .catch(err => {
              reject(err);
            });
        })
        .catch(err => {
          reject(err);
        });
    });
  }
}

module.exports = ProductRepository;
