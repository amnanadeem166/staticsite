// app.js
document.addEventListener('DOMContentLoaded', () => {
    const productForm = document.getElementById('productForm');
    const productNameInput = document.getElementById('productName');
    const productPriceInput = document.getElementById('productPrice');
    const productList = document.getElementById('productList');
  
    // Retrieve existing products from localStorage or initialize an empty array
    let products = JSON.parse(localStorage.getItem('products')) || [];
  
    // Function to render the product list
    function renderProductList() {
      productList.innerHTML = '';
      products.forEach((product, index) => {
        const li = document.createElement('li');
        li.innerHTML = `
          ${product.name} - $${product.price}
          <button onclick="editProduct(${index})">Edit</button>
          <button onclick="deleteProduct(${index})">Delete</button>
        `;
        productList.appendChild(li);
      });
    }
  
    // Add product to the list and save to localStorage
    productForm.addEventListener('submit', (e) => {
      e.preventDefault();
  
      const newProduct = {
        name: productNameInput.value,
        price: parseFloat(productPriceInput.value)
      };
  
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
  
      productNameInput.value = '';
      productPriceInput.value = '';
  
      renderProductList();
    });
  
    // Edit product function
    window.editProduct = (index) => {
      const product = products[index];
      productNameInput.value = product.name;
      productPriceInput.value = product.price;
  
      productForm.removeEventListener('submit', handleAddProduct);
      productForm.addEventListener('submit', (e) => handleUpdateProduct(e, index));
    };
  
    // Handle updating an existing product
    function handleUpdateProduct(e, index) {
      e.preventDefault();
  
      products[index] = {
        name: productNameInput.value,
        price: parseFloat(productPriceInput.value)
      };
  
      localStorage.setItem('products', JSON.stringify(products));
  
      productNameInput.value = '';
      productPriceInput.value = '';
  
      renderProductList();
      productForm.removeEventListener('submit', handleUpdateProduct);
      productForm.addEventListener('submit', handleAddProduct);
    }
  
    // Delete product function
    window.deleteProduct = (index) => {
      products.splice(index, 1);
      localStorage.setItem('products', JSON.stringify(products));
      renderProductList();
    };
  
    // Handle adding a new product
    function handleAddProduct(e) {
      e.preventDefault();
  
      const newProduct = {
        name: productNameInput.value,
        price: parseFloat(productPriceInput.value)
      };
  
      products.push(newProduct);
      localStorage.setItem('products', JSON.stringify(products));
  
      productNameInput.value = '';
      productPriceInput.value = '';
  
      renderProductList();
    }
  
    renderProductList();  // Initial render of the product list
  });
  