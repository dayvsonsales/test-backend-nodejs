const FakeProductRepository = require('../../repositories/fakes/FakeProductRepository');
const UpdateProductService = require('../../../src/services/UpdateProductService');

const AppError = require('../../../src/errors/AppError');

describe('Update Product Service', () => {
  it('should be able to update an existing product', async () => {
    const fakeProductRepository = new FakeProductRepository();

    const updateProductService = new UpdateProductService(
      fakeProductRepository,
    );

    const updateProduct = {
      title: 'elular',
      description: 'Celular bom',
      price: 4500,
      categories: [{ name: 'portatil' }],
    };

    const product = await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    const updatedProduct = await updateProductService.execute(
      product._id,
      updateProduct,
    );

    expect(updatedProduct).toEqual(expect.objectContaining(updateProduct));
  });

  it('should not be able to update a non existing product', async () => {
    const fakeProductRepository = new FakeProductRepository();

    const updateProductService = new UpdateProductService(
      fakeProductRepository,
    );

    expect(
      updateProductService.execute('unknown', {
        title: 'Celular',
        description: 'Celular bom',
        price: 4000,
        categories: [{ name: 'eletronico' }, { name: 'portatil' }],
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
