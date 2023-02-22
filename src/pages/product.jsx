import React from 'react';
import { getProduct } from '../services/api';

class Product extends React.Component {
  state = {
    isLoading: true,
    product: null,
  };

  async componentDidMount() {
    const { id } = this.props.match.params;

    const product = await getProduct(id);

    this.setState({ isLoading: false, product });
  }

  render() {
    const { isLoading, product } = this.state;

    if (isLoading) return <p>Carregando...</p>;

    return (
      <div>
        <img src={product.imageUrl} />
        <h1>{product.title}</h1>
        <p>{product.description}</p>
        <p>{product.price}</p>
      </div>
    );
  }
}

export default Product;
