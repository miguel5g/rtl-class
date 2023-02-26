import React from 'react';
import { Link } from 'react-router-dom';

import styles from '../styles/components/product-card.module.css';

class ProductCard extends React.Component {
  render() {
    const { id, title, description, price, imageUrl } = this.props.product;

    return (
      <div className={styles.productCard} data-testid="product-card">
        <img src={imageUrl} />
        <h4>{title}</h4>
        <p>{description}</p>
        <p>{price}</p>

        <Link to={`/${id}`}>Ver detalhes</Link>
      </div>
    );
  }
}

export default ProductCard;
