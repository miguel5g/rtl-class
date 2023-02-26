import React from 'react';
import ProductCard from '../components/product-card';
import { getProducts } from '../services/api';

import styles from '../styles/pages/products.module.css';

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
  };

  handleChange = (event) => {
    this.setState({ search: event.target.value });
  };

  render() {
    const { isLoading, products, search } = this.state;

    if (isLoading) return <p>Carregando...</p>;

    return (
      <div>
        <div className={styles.productsMain}>
          <div className={styles.search}>
            <input
              type="search"
              placeholder="Pesquisar"
              value={search}
              onChange={this.handleChange}
            />
            <button onClick={this.handleSearch}>Pesquisar</button>
          </div>
          <div className={styles.productList}>
            {products.map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </div>
    );
  }
}

export default Products;
