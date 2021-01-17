const FakeProductRepository = require('../../repositories/fakes/FakeProductRepository');
const DeleteProductService = require('../../../src/services/DeleteProductService');
const AppError = require('../../../src/errors/AppError');

describe('Delete Product Service', () => {
  it('shoud be able to delete a product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const deleteProductService = new DeleteProductService(
      fakeProductRepository,
    );

    const { _id } = await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    const result = await deleteProductService.execute(_id);

    expect(result).toEqual(_id);
  });

  it("should not be able to delete a product that doesn't exists", async () => {
    const fakeProductRepository = new FakeProductRepository();
    const deleteProductService = new DeleteProductService(
      fakeProductRepository,
    );

    expect(deleteProductService.execute('unknown')).rejects.toBeInstanceOf(
      AppError,
    );
  });
});
