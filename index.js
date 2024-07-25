const productNameInput =document.getElementById('productNameInput');
const productCategoryInput =document.getElementById('productCategoryInput');
const productPriceInput =document.getElementById('productPriceInput');
const productDiscountInput =document.getElementById('productDiscountInput');
const productQuantityInput =document.getElementById('productQuantityInput');
const productDescriptionInput =document.getElementById('productDescriptionInput')
const addProductBtn = document.getElementById('addProductBtn');
// const updateProductBtn = document.getElementById('updateProductBtn');
// const searchInput =document.getElementById('searchInput')
let productContainer = [];

if(localStorage.getItem('products')!==null){
    productContainer = JSON.parse(localStorage.getItem('products'));
    displayProducts();
}

function addProduct(){
    const product ={
        name:productNameInput.value,
        category:productCategoryInput.value,
        price:productPriceInput.value,
        discount:productDiscountInput.value,
        quantity:productQuantityInput.value,
        description:productDescriptionInput.value
    }
    productContainer.push(product);
    localStorage.setItem('products',JSON.stringify(productContainer));
    displayProducts();
    clearInput();
    console.log(productContainer);
} 

addProductBtn.addEventListener('click',addProduct);

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem('products',JSON.stringify(productContainer));
    displayProducts();
}
function updateProduct(index){
    productNameInput.value = productContainer[index].name;  
    productCategoryInput.value = productContainer[index].category;  
}

function clearInput(){
    productNameInput.value = '';
    productCategoryInput.value = '';
    productPriceInput.value = '';
    productDiscountInput.value = '';
    productQuantityInput.value = '';
    productDescriptionInput.value = '';
}

function displayProducts(){
   let addDataProduct = '';
   productContainer.forEach((product,index) => {
    addDataProduct += `<tr>
    <td>${product.name}</td>
    <td>${product.category}</td>
    <td>${product.price}</td>
    <td>${product.discount}</td>
    <td>${product.quantity}</td>
    <td>${product.description}</td>
    <td>
    <button onclick="updateProduct(${index})" class="btnUpdate">Update</button>
    </td>
    <td>
    <button onclick="deleteProduct(${index})" class="btnDelete">Delete</button>
    </td>
    </tr>`
   });
   document.getElementById('showData').innerHTML = addDataProduct;
}