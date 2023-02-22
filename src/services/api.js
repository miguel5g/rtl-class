const BASE_URL = 'http://localhost:4000';

async function getProducts(search = '') {
  const response = await fetch(BASE_URL + `/products?q=${search}`);

  return response.json();
}

async function getProduct(id) {
  const response = await fetch(BASE_URL + `/products/${id}`);

  return response.json();
}

export { getProducts, getProduct };
