import { screen, waitFor } from '@testing-library/react';
import App from '../../app';
import render from '../helpers/render';

async function sleep(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('<Product />', () => {
  const product = {
    id: '1',
    title: 'Product title',
    description: 'Product description',
    price: 10,
    imageUrl: 'image url',
  };

  beforeEach(() => {});

  it('should start with loading', async () => {});

  it('should show product details', async () => {});
});
