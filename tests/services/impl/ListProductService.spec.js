const FakeProductRepository = require('../../repositories/fakes/FakeProductRepository');
const ListProductService = require('../../../src/services/ListProductService');

describe('List Product Service', () => {
  test('validate that products exists in repository', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const listProductService = new ListProductService(fakeProductRepository);

    const { _id } = await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    const exists = await listProductService.find();

    expect(exists).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id,
        }),
      ]),
    );
  });

  test('validate that products do not exists in repository', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const listProductService = new ListProductService(fakeProductRepository);

    await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    expect(await listProductService.findById('unknown')).toBeNull();
  });

  test('validate findByNameOrCategory query', async () => {
    const fakeProductRepository = new FakeProductRepository();
    const listProductService = new ListProductService(fakeProductRepository);

    const { _id } = await fakeProductRepository.create({
      title: 'Celular',
      description: 'Celular bom',
      price: 4000,
      categories: [{ name: 'eletronico' }, { name: 'portatil' }],
    });

    expect(await listProductService.findByTitleOrCategory('Celular')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id,
        }),
      ]),
    );

    expect(await listProductService.findByTitleOrCategory('portatil')).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id,
        }),
      ]),
    );

    expect(
      await listProductService.findByTitleOrCategory('computador'),
    ).toHaveLength(0);
  });
});
