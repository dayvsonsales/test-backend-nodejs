const ProductRepository = require('../infra/mongodb/repositories/ProductRepository');

const execute = (id, category) => {
  const productRepository = new ProductRepository();

  return new Promise((resolve, reject) => {
    productRepository
      .findById(id)
      .then(product => {
        if (!product) {
          reject('Product not found');
        } else {
          productRepository
            .associateCategory(id, category)
            .then(data => {
              resolve(data);
            })
            .catch(err => reject(err));
        }
      })
      .catch(err => reject(err));
  });
};

module.exports = { execute };
