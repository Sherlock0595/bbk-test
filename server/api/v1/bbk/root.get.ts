import { faker } from '@faker-js/faker';

export default defineEventHandler(async () => {
  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  await sleep(2500);

  return {
    data: Array.from({ length: 10 }, () => ({
      id: faker.string.uuid(),
      code: faker.string.alphanumeric(8).toUpperCase(),
      title: faker.commerce.productName(),
      hasChildren: true,
    })),
  };
});
