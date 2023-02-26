import { screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
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
    // Arrange
    global.fetch.mockImplementation(async () => {
      await sleep();
      return { json: jest.fn().mockResolvedValue(products) };
    });

    render(<Products />);

    // Act

    // Assert
    expect(screen.getByText('Carregando...')).toBeInTheDocument();
  });

  it('should render all available products', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });

    render(<Products />);

    // Act

    // Assert
    const loading = screen.getByText('Carregando...');

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    expect(screen.getAllByTestId('product-card')).toHaveLength(2);
  });

  it('should redirect to the product details page when a product is clicked', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });

    const { history } = render(<Products />);

    // Act
    const loading = screen.getByText('Carregando...');

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const productsLinks = screen.getAllByRole('link');

    userEvent.click(productsLinks[1]);

    // Assert
    await waitFor(() => {
      expect(history.location.pathname).toBe('/2');
    });
  });

  it('should render a search input', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });

    render(<Products />);

    // Act

    // Assert
    const loading = screen.getByText('Carregando...');

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    expect(screen.getByRole('searchbox')).toBeInTheDocument();
  });

  it('should render a search button', async () => {
    // Arrange
    global.fetch.mockResolvedValue({ json: jest.fn().mockResolvedValue(products) });

    render(<Products />);

    // Act

    // Assert
    const loading = screen.getByText('Carregando...');

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    expect(screen.getByRole('button', { name: 'Pesquisar' })).toBeInTheDocument();
  });

  it('should update the product list when the search button is clicked', async () => {
    // Arrange
    global.fetch
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue(products) })
      .mockResolvedValueOnce({ json: jest.fn().mockResolvedValue([products[1]]) });

    render(<Products />);

    // Act
    const loading = screen.getByText('Carregando...');

    await waitFor(() => {
      expect(loading).not.toBeInTheDocument();
    });

    const input = screen.getByRole('searchbox');
    const button = screen.getByRole('button', { name: 'Pesquisar' });

    await userEvent.type(input, 'X');
    await userEvent.click(button);

    // Assert
    expect(global.fetch).toBeCalledWith('http://localhost:4000/products?q=X');
    expect(screen.getAllByTestId('product-card')).toHaveLength(1);
    expect(screen.getByRole('heading', { name: 'Product title 2', level: 4 })).toBeInTheDocument();
  });
});
