import { screen } from '@testing-library/react';
import ProductCard from '../../components/product-card';
import render from '../helpers/render';

describe('<ProductCard />', () => {
  it('should have the product properties', async () => {
    // Arrange
    render(
      <ProductCard
        product={{
          id: '1',
          title: 'Product title',
          description: 'Product description',
          price: 10,
          imageUrl: 'image url',
        }}
      />
    );

    // Act

    // Assert
    expect(screen.getByRole('heading', { name: 'Product title', level: 4 })).toBeInTheDocument();
    expect(screen.getByText('Product description')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
    expect(screen.getByRole('link', { name: 'Ver detalhes' })).toHaveAttribute('href', '/1');
    expect(screen.getByRole('img')).toHaveAttribute('src', 'image url');
  });
});
