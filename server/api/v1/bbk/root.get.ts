import { faker } from '@faker-js/faker';

export default defineEventHandler(async () => {
  return {
    data: Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      code: faker.string.alphanumeric(8).toUpperCase(),
      title: faker.commerce.productName(),
      hasChildren: true,
    })),
  };
});
