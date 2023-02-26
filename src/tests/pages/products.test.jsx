import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';
import Products from '../../pages/products';
import render from '../helpers/render';

async function sleep(ms = 200) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

describe('<Products />', () => {
  const products = [
    {
      id: '1',
      title: 'Product title 1',
      description: 'Product description 1',
      price: 10,
      imageUrl: 'image url 1',
    },
    {
      id: '2',
      title: 'Product title 2',
      description: 'Product description 2',
      price: 20,
      imageUrl: 'image url 2',
    },
  ];

  beforeEach(() => {
    global.fetch = jest.fn();
  });

  it('should start with a loading state', async () => {
    // global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });
    global.fetch.mockImplementation(async () => {
      await sleep(500);

      return { json: jest.fn().mockResolvedValue(products) };
    });

    render(<Products />);

    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render all available products', async () => {
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });
    render(<Products />);

    expect(await screen.findAllByTestId('product-card')).toHaveLength(2);
  });

  it('should redirect to the product details page when a product is clicked', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });
    const { history } = render(<Products />);

    const productsLinks = await screen.findAllByRole('link', { name: 'Ver detalhes' });

    // Act
    await userEvent.click(productsLinks[1]);

    // Assert
    expect(history.location.pathname).toBe('/2');
  });

  it('should render a search input', async () => {});

  it('should render a search button', async () => {});

  it('should update the product list when the search button is clicked', async () => {
    global.fetch
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(products) })
      .mockImplementationOnce(async () => {
        await sleep(50);

        return { json: jest.fn().mockResolvedValue([products[1]]) };
      });
    render(<Products />);

    const loading = screen.getByText('Carregando...');

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', {
      name: /pesquisar/i,
    });

    // ACT
    await userEvent.type(input, 'Abroba');
    await userEvent.click(button);

    // Assert
    expect(global.fetch).toBeCalledWith('http://localhost:4000/products?q=Abroba');
    expect(await screen.findByText('Carregando...')).toBeInTheDocument();
    expect(await screen.findAllByTestId('product-card')).toHaveLength(1);
  });
});
