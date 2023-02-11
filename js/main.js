var productName = document.getElementById("productName");
var productPrice = document.getElementById("productPrice");
var productCategory = document.getElementById("productCategory");
var productDescription = document.getElementById("productDescription");
var addBtn = document.getElementById("addProductBtn");
var updateBtn = document.getElementById("updateProductBtn");
productList = [];

if (localStorage.getItem("products") !== null) {
  productList = JSON.parse(localStorage.getItem("products"));
  displayProduct(productList);
}

function addProduct() {
  var product = {
    pName: productName.value,
    pPrice: productPrice.value,
    pCategory: productCategory.value,
    pDescription: productDescription.value,
  };
  productList.push(product);
  localStorage.setItem("products", JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
}

function displayProduct(productsList) {
  var productContainer = ``;
  for (var i = 0; i < productsList.length; i++) {
    productContainer += `
    <tr>
      <td>${i + 1}</td>
      <td>${productsList[i].pName}</td>
      <td>${productsList[i].pPrice}$</td>
      <td>${productsList[i].pCategory}</td>
      <td>${productsList[i].pDescription}</td> 
      <td>
            <button class="btn btn-outline-warning" onclick="updateProductBtn(${i})" >
              <i class="fa-regular fa-pen-to-square"></i>
            </button>
      </td>
      <td>
            <button class="btn btn-outline-danger" onclick="deleteProduct(${i})">
              <i class="fa-regular fa-trash"></i>
            </button>
      </td>
    </tr>`;
  }
  document.getElementById("productContainer").innerHTML = productContainer;
}
function deleteProduct(productIndex) {
  productList.splice(productIndex, 1);
  localStorage.setItem("products", JSON.stringify(productList));

  displayProduct(productList);
}
function clearForm() {
  productName.value = "";
  productPrice.value = "";
  productCategory.value = "";
  productDescription.value = "";
}
function searchBox(searchTerm) {
  searchProduct = [];
  for (var i = 0; i < productList.length; i++) {
    if (
      productList[i].pName.toLowerCase().includes(searchTerm.toLowerCase()) ===
      true
    ) {
      searchProduct.push(productList[i]);
    }
  }
  displayProduct(searchProduct);
}
function updateProductBtn(productIndex) {
  addBtn.classList.replace("d-block", "d-none");
  updateBtn.classList.replace("d-none", "d-block");
  productName.value = productList[productIndex].pName;
  productPrice.value = productList[productIndex].pPrice;
  productCategory.value = productList[productIndex].pCategory;
  productDescription.value = productList[productIndex].pDescription;
  productIndex = productIndex;
  sessionStorage.setItem("updatedProductIndex", productIndex);
}

function updateProduct() {
  addBtn.classList.replace("d-none", "d-block");
  updateBtn.classList.replace("d-block", "d-none");
  var updatedProduct = {
    pName: productName.value,
    pPrice: productPrice.value,
    pCategory: productCategory.value,
    pDescription: productDescription.value,
  };
  productList.splice(
    sessionStorage.getItem("updatedProductIndex"),
    1,
    updatedProduct
  );
  localStorage.setItem("products", JSON.stringify(productList));
  displayProduct(productList);
  clearForm();
}
