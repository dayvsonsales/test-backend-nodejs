const AppError = require('../../../src/errors/AppError');
const FakeProductRepository = require('../../repositories/fakes/FakeProductRepository');
const AssociateCategoryProductService = require('../../../src/services/AssociateCategoryProductService');

describe('Associate Category Product Service', () => {
  it('should be able to associate a category to an existing product', async () => {
    const fakeProductRepository = new FakeProductRepository();

    const associateCategory = new AssociateCategoryProductService(
      fakeProductRepository,
    );

    const product = await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    expect(
      await associateCategory.execute(product._id, {
        name: 'smartphone',
      }),
    ).toEqual(
      expect.objectContaining({
        categories: [
          { name: 'eletronico' },
          { name: 'portatil' },
          { name: 'smartphone' },
        ],
      }),
    );
  });

  it('should not be able to associate a category to a no existing product', async () => {
    const fakeProductRepository = new FakeProductRepository();

    const associateCategory = new AssociateCategoryProductService(
      fakeProductRepository,
    );

    expect(
      associateCategory.execute('unknown', {
        name: 'smartphone',
      }),
    ).rejects.toBeInstanceOf(AppError);
  });
});
