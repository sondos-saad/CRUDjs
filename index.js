const productNameInput =document.getElementById('productNameInput');
const productCategoryInput =document.getElementById('productCategoryInput');
const productPriceInput =document.getElementById('productPriceInput');
const productDiscountInput =document.getElementById('productDiscountInput');
const productQuantityInput =document.getElementById('productQuantityInput');
const productDescriptionInput =document.getElementById('productDescriptionInput')
const addProductBtn = document.getElementById('addProductBtn');
const updateProductBtn = document.getElementById('updateProductBtn');
const searchInput =document.getElementById('searchInput')
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

} 

addProductBtn.addEventListener('click',addProduct);

function deleteProduct(index){
    productContainer.splice(index,1);
    localStorage.setItem('products',JSON.stringify(productContainer));
    displayProducts();
}


function clearInput(){
    productNameInput.value = '';
    productCategoryInput.value = '';
    productPriceInput.value = '';
    productDiscountInput.value = '';
    productQuantityInput.value = '';
    productDescriptionInput.value = '';
}
function searchProduct(term){
    let addDataProduct = '';
    productContainer.forEach((product,index) => {
        if(productContainer[index].name.toLowerCase().includes(term.toLowerCase())){
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
        }
    });
    document.getElementById('showData').innerHTML = addDataProduct;
}

searchInput.addEventListener('input', () => {  
    searchProduct(searchInput.value);
});

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
    <button onclick="setForm(${index})" class="btnUpdate">Update</button>
    </td>
    <td>
    <button onclick="deleteProduct(${index})" class="btnDelete">Delete</button>
    </td>
    </tr>`
   });
   document.getElementById('showData').innerHTML = addDataProduct;
}
 
let x = 0;
function setForm(productIndex){
    x = productIndex;
    productNameInput.value = productContainer[productIndex].name;
    productCategoryInput.value = productContainer[productIndex].category;
    productPriceInput.value = productContainer[productIndex].price;
    productDiscountInput.value = productContainer[productIndex].discount;
    productQuantityInput.value = productContainer[productIndex].quantity;
    productDescriptionInput.value = productContainer[productIndex].description;
    addProductBtn.classList.add('disabled');
    updateProductBtn.classList.remove('disabled');
}
function updateProduct(){
    productContainer[x].name =  productNameInput.value ;  
     productContainer[x].category = productCategoryInput.value; 
     productContainer[x].price = productPriceInput.value; 
     productContainer[x].discount = productDiscountInput.value; 
     productContainer[x].quantity = productQuantityInput.value; 
     productContainer[x].description = productDescriptionInput.value; 
     addProductBtn.classList.remove('disabled');
    updateProductBtn.classList.add('disabled');
     localStorage.setItem('products',JSON.stringify(productContainer));
    displayProducts(); 
    clearInput();
}

updateProductBtn.addEventListener("click" , updateProduct());