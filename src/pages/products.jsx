import React from 'react';
import ProductCard from '../components/product-card';
import { getProducts } from '../services/api';

class Products extends React.Component {
  state = {
    isLoading: true,
    products: [],
    search: '',
  };

  async componentDidMount() {
    const products = await getProducts();

    this.setState({
      isLoading: false,
      products,
    });
  }

  handleSearch = async () => {
    const { search } = this.state;

    this.setState({ isLoading: true });

    const products = await getProducts(search);

    this.setState({
      isLoading: false,
      products,
    });
  }

  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { isLoading, products, search } = this.state;

    if (isLoading) return <p>Carregando...</p>;

    return (
      <div>
        <input type="search" placeholder="Pesquisar" value={search} onChange={this.handleChange} />
        <button onClick={this.handleSearch}>Pesquisar</button>
        <ul>
          {products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </ul>
      </div>
    );
  }
}

export default Products;
