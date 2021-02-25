const ProductRepository = require('../infra/mongodb/repositories/ProductRepository');

const productRepository = new ProductRepository();

const createProduct = data => {
  return productRepository.create(data);
};

const deleteProduct = id => {
  return productRepository.delete(id);
};

const find = () => {
  const products = productRepository.find();

  return products;
};

const findById = id => {
  const product = productRepository.findById(id);

  return product;
};

const findByTitleOrCategory = query => {
  const product = productRepository.findByTitleOrCategory(query);

  return product;
};

const updateProduct = (_id, { title, description, price, categories }) => {
  return new Promise((resolve, reject) => {
    productRepository.findById(_id).then(currentProduct => {
      if (!currentProduct) {
        reject('Product not found');
      }

      productRepository
        .save({
          _id,
          title,
          description,
          price,
          categories,
        })
        .then(product => resolve(product))
        .catch(err => reject(err));
    });
  });
};

module.exports = {
  createProduct,
  deleteProduct,
  find,
  findById,
  findByTitleOrCategory,
  updateProduct,
};
