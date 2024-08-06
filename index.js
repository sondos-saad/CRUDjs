// Get the input elements and buttons
const productNameInput = document.getElementById('productNameInput');
const productCategoryInput = document.getElementById('productCategoryInput');
const productPriceInput = document.getElementById('productPriceInput');
const productDiscountInput = document.getElementById('productDiscountInput');
const productQuantityInput = document.getElementById('productQuantityInput');
const productDescriptionInput = document.getElementById('productDescriptionInput');
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn');
const searchInput = document.getElementById('searchInput');

let productContainer = [];

// Load products from localStorage if available
if (localStorage.getItem('products')) {
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts();
}

// Add product to the list and localStorage
function addProduct() {
    if (checkProductName()) {
        const product = {
            name: productNameInput.value,
            category: productCategoryInput.value,
            price: productPriceInput.value,
            discount: productDiscountInput.value,
            quantity: productQuantityInput.value,
            description: productDescriptionInput.value
        };
        productContainer.push(product);
        localStorage.setItem('products', JSON.stringify(productContainer));
        displayProducts();
        clearInput();
    } else {
        alert('Please Enter Valid Product Name');
    }
}

addProductBtn.addEventListener('click', addProduct);

// Delete product from the list and localStorage
function deleteProduct(index) {
    productContainer.splice(index, 1);
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProducts();
}

// Clear input fields
function clearInput() {
    productNameInput.value = '';
    productCategoryInput.value = '';
    productPriceInput.value = '';
    productDiscountInput.value = '';
    productQuantityInput.value = '';
    productDescriptionInput.value = '';
}

// Search for products and display the results
function searchProduct(term) {
    let addDataProduct = '';
    productContainer.forEach((product, index) => {
        if (product.name.toLowerCase().includes(term.toLowerCase())) {
            addDataProduct += `<tr>
                <td>${product.name}</td>
                <td>${product.category}</td>
                <td>${product.price}</td>
                <td>${product.discount}</td>
                <td>${product.quantity}</td>
                <td>${product.description}</td>
                <td>
                    <button onclick="setForm(${index})" class="btnUpdate">Update</button>
                </td>
                <td>
                    <button onclick="deleteProduct(${index})" class="btnDelete">Delete</button>
                </td>
            </tr>`;
        }
    });
    document.getElementById('showData').innerHTML = addDataProduct;
}

searchInput.addEventListener('input', () => {  
    searchProduct(searchInput.value);
});

// Display all products
function displayProducts() {
    let addDataProduct = '';
    productContainer.forEach((product, index) => {
        addDataProduct += `<tr>
            <td>${product.name}</td>
            <td>${product.category}</td>
            <td>${product.price}</td>
            <td>${product.discount}</td>
            <td>${product.quantity}</td>
            <td>${product.description}</td>
            <td>
                <button onclick="setForm(${index})" class="btnUpdate">Update</button>
            </td>
            <td>
                <button onclick="deleteProduct(${index})" class="btnDelete">Delete</button>
            </td>
        </tr>`;
    });
    document.getElementById('showData').innerHTML = addDataProduct;
}

let currentIndex = 0;

// Set form with the selected product's details for updating
function setForm(productIndex) {
    currentIndex = productIndex;
    productNameInput.value = productContainer[productIndex].name;
    productCategoryInput.value = productContainer[productIndex].category;
    productPriceInput.value = productContainer[productIndex].price;
    productDiscountInput.value = productContainer[productIndex].discount;
    productQuantityInput.value = productContainer[productIndex].quantity;
    productDescriptionInput.value = productContainer[productIndex].description;
    addProductBtn.classList.add('disabled');
    updateProductBtn.classList.remove('disabled');
}

// Update product details
function updateProduct() {
    productContainer[currentIndex].name = productNameInput.value;
    productContainer[currentIndex].category = productCategoryInput.value;
    productContainer[currentIndex].price = productPriceInput.value;
    productContainer[currentIndex].discount = productDiscountInput.value;
    productContainer[currentIndex].quantity = productQuantityInput.value;
    productContainer[currentIndex].description = productDescriptionInput.value;
    localStorage.setItem('products', JSON.stringify(productContainer));
    displayProducts();
    clearInput();
    addProductBtn.classList.remove('disabled');
    updateProductBtn.classList.add('disabled');
}

updateProductBtn.addEventListener('click', updateProduct);

// Validate product name
function checkProductName() {
    let regx = /^\w{4,15}$/;
    return regx.test(productNameInput.value);
}
