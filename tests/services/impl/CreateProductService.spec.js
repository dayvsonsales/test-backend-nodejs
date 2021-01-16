const FakeProductRepository = require('../../repositories/fakes/FakeProductRepository');
const CreateProductService = require('../../../src/services/CreateProductService');

describe('Create Product Service', () => {
  it('shoud be able to create a product', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const createProductService = new CreateProductService(
      fakeProductRepository,
    );

    const product = await createProductService.execute({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    expect(product).toEqual(
      expect.objectContaining({
        title: 'Celular',
        description: 'Celular bom',
        price: 4000,
        categories: [{ name: 'eletronico' }, { name: 'portatil' }],
      }),
    );
  });
});
