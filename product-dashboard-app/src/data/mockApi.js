const productsData = [];

export function fetchProducts() {
  return new Promise((resolve) => {
    setTimeout(() => {
      fetch('https://dummyjson.com/products')
        .then((res) => res.json())
        .then((data) => {
          productsData.length = 0;
          productsData.push(...data.products);
          resolve([...productsData]);
        });
    }, 1000);
  });
}

export function updateProductTitle(id, newTitle) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productsData.find((p) => p.id === id);
      if (product) product.title = newTitle;
      resolve([...productsData]);
    }, 500);
  });
}

export function updateProductPrice(id, newPrice) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const product = productsData.find((p) => p.id === id);
      if (product) product.price = parseFloat(newPrice);
      resolve([...productsData]);
    }, 500);
  });
}

export function deleteProduct(id) {
  return new Promise((resolve) => {
    setTimeout(() => {
      const index = productsData.findIndex((p) => p.id === id);
      if (index !== -1) productsData.splice(index, 1);
      resolve([...productsData]);
    }, 500);
  });
}
