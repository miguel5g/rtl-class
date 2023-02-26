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

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should start with loading', async () => {
    // Arrange
    global.fetch.mockImplementation(async () => {
      await sleep();
      return { json: jest.fn().mockResolvedValue(product) };
    });

    render(<App />, '/1');

    // Act

    // Assert
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should show product details', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(product) });

    render(<App />, '/1');

    // Act

    // Assert
    await waitFor(() => {
      expect(screen.getByRole('img')).toHaveAttribute('src', 'image url');
      expect(screen.getByRole('heading', { name: 'Product title', level: 1 })).toBeInTheDocument();
      expect(screen.getByText('Product description')).toBeInTheDocument();
      expect(screen.getByText('10')).toBeInTheDocument();
    });
  });
});
