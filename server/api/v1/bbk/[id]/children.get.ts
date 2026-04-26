import { faker } from '@faker-js/faker';

export default defineEventHandler(async () => {
  function sleep(ms: number) {
    return new Promise((resolve) => {
      setTimeout(resolve, ms);
    });
  }
  await sleep(2500);

  const length = faker.number.int({ min: 0, max: 5 });

  return Array.from({ length }, () => ({
    id: faker.string.uuid(),
    code: faker.string.alphanumeric(8).toUpperCase(),
    title: faker.commerce.productName(),
    hasChildren: faker.datatype.boolean(0.4),
  }));
});
