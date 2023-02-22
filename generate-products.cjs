// import { random, commerce, lorem, image } from '@faker-js/faker';
const fs = require('node:fs/promises');
const { faker } = require('@faker-js/faker');

function generateProducts(numProducts) {
  const products = [];

  for (let i = 0; i < numProducts; i++) {
    const product = {
      id: faker.datatype.uuid(),
      title: faker.commerce.productName(),
      description: faker.lorem.sentences(),
      price: parseFloat(faker.commerce.price(5, 72, 2)),
      imageUrl: faker.image.imageUrl(170, 128, 'cat',true),
    };

    products.push(product);
  }

  return products;
}

const products = generateProducts(50);

fs.writeFile('data.json', JSON.stringify({products}, null, 2)).then(() =>
  console.log('Successfully created')
);
