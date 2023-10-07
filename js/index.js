let productName = document.getElementById("Productname");
let productPrice = document.getElementById("ProductPrice");
let productCategory = document.getElementById("ProductCategory");
let productDescription = document.getElementById("ProductDescription");

let addProduct = document.getElementById("AddProduct");
let editProduct = document.getElementById("Edit");
let cancelEdit = document.getElementById("Cancel");
let clearall = document.getElementById("Clearall");

let products = [];

if (localStorage.getItem("dataofproducts") != null) {
    products = JSON.parse(localStorage.getItem("dataofproducts"));
    displayProduts(products);
    clearall.classList.remove("d-none");
}

function store() {
    if (ValidationName() && ValidationDescription() && ValidationPrice() && ValidationCategory()) {
        let inputs = {
            name: productName.value,
            price: productPrice.value,
            category: productCategory.value,
            description: productDescription.value,
        }
        products.push(inputs);
        localStorage.setItem("dataofproducts", JSON.stringify(products));
        displayProduts(products);
        clearInput();

        clearall.classList.remove("d-none");

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");

    }
    else {
        alert("invalid");
    }
}

function search(val) {
    let searchingProduct = [];

    for (let i = 0; i < products.length; i++) {
        if (products[i].name.toUpperCase().includes(val.toUpperCase()) == true) {
            searchingProduct.push(products[i]);
            displayProduts(searchingProduct);
        }
        else {
            displayProduts(searchingProduct);
        }

    }
}

function displayProduts(products) {
    let table = ``;
    for (let i = 0; i < products.length; i++) {
        table +=
            `<tr>
           <td>${products[i].name}</td>
           <td>${products[i].price}</td>
           <td>${products[i].category}</td>
           <td>${products[i].description}</td>
          <td class="text-center">
            <button onclick="beforeEdit(${i})" class="btn btn-success">edit</button>
            <button onclick="deleting(${i})" class="btn btn-danger">delete</button>
          </td>
        </tr> `
    }
    document.getElementById("tablebody").innerHTML = table;
}


function deleting(index) {
    products.splice(index, 1);
    localStorage.setItem("dataofproducts", JSON.stringify(products));
    displayProduts(products);

    if (products.length == 0) {

        clearall.classList.add("d-none");
    }

}

let i;
function beforeEdit(index) {

    productName.value = products[index].name;
    productPrice.value = products[index].price;
    productCategory.value = products[index].category;
    productDescription.value = products[index].description;

    ValidationName();
    ValidationPrice();
    ValidationDescription();
    ValidationCategory();

    addProduct.classList.add("d-none")
    editProduct.classList.remove("d-none")
    cancelEdit.classList.remove("d-none")
    i = index;
}

function edit() {
    if (ValidationPrice() && ValidationName() && ValidationDescription() && ValidationCategory()) {
        products[i].name = productName.value;
        products[i].price = productPrice.value;
        products[i].category = productCategory.value;
        products[i].description = productDescription.value;
        localStorage.setItem("dataofproducts", JSON.stringify(products));
        displayProduts(products);
        clearInput();
        addProduct.classList.remove("d-none");
        editProduct.classList.add("d-none");
        cancelEdit.classList.add("d-none");

        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");

    }
    else {
        alert("invalid");
    }
}

function cancel() {
    clearInput();
    addProduct.classList.remove("d-none");
    editProduct.classList.add("d-none");
    cancelEdit.classList.add("d-none");
    displayProduts(products);

    productName.classList.add("is-invalid");
    productName.classList.remove("is-valid");
    productPrice.classList.add("is-invalid");
    productPrice.classList.remove("is-valid");
    productDescription.classList.add("is-invalid");
    productDescription.classList.remove("is-valid");
    productCategory.classList.add("is-invalid");
    productCategory.classList.remove("is-valid");
}
function clearInput() {
    productName.value = "";
    productPrice.value = "";
    productCategory.value = "";
    productDescription.value = "";

}

function ClearAllData() {
    localStorage.clear();
    products = [];
    displayProduts(products);
    clearall.classList.add("d-none");

}

function ValidationName() {
    let x = /^[A-Z][a-z]{1,}$/
    if (x.test(productName.value) == true) {
        productName.classList.remove("is-invalid");
        productName.classList.add("is-valid");
        return true;
    }
    else {
        productName.classList.add("is-invalid");
        productName.classList.remove("is-valid");
        return false;
    }
}

function ValidationPrice() {
    let x = /^(1|10000|[1-9][0-9]{0,3})$/
    if (x.test(productPrice.value) == true) {
        productPrice.classList.remove("is-invalid");
        productPrice.classList.add("is-valid");
        return true;
    }
    else {
        productPrice.classList.add("is-invalid");
        productPrice.classList.remove("is-valid");
        return false;
    }

}
function ValidationCategory() {
    let x = /^[A-Z][a-z]{1,10}$/
    if (x.test(productCategory.value) == true) {
        productCategory.classList.remove("is-invalid");
        productCategory.classList.add("is-valid");
        return true;
    }
    else {
        productCategory.classList.add("is-invalid");
        productCategory.classList.remove("is-valid");
        return false;
    }
}

function ValidationDescription() {
    let x = /^([A-Z][a-z]{0,} ?)([a-z]{1,} ?){1,}$/
    if (x.test(productDescription.value) == true) {
        productDescription.classList.remove("is-invalid");
        productDescription.classList.add("is-valid");
        return true;
    }
    else {
        productDescription.classList.add("is-invalid");
        productDescription.classList.remove("is-valid");
        return false;
    }
}