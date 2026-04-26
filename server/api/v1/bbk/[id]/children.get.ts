import { faker } from '@faker-js/faker';

export default defineEventHandler((event) => {
  const length = faker.number.int({ min: 0, max: 5 });

  return {
    data: Array.from({ length }, () => ({
      id: getRouterParam(event, 'id'),
      code: faker.string.alphanumeric(8).toUpperCase(),
      title: faker.commerce.productName(),
      hasChildren: faker.datatype.boolean(0.4),
    })),
  };
});
