let title = document.getElementById("title");
let price = document.getElementById("price");
let taxes = document.getElementById("taxes");
let ads = document.getElementById("ads");
let discount = document.getElementById("discount");
let total = document.getElementById("total");
let count = document.getElementById("count");
let category = document.getElementById("category");
let submit = document.getElementById("submit");

let mood = "create";
let globalVar;
let searchMood;
let search = document.getElementById("search");

// create product function and
// save in local storage function

let dataPro = [];

if (localStorage.product) {
  dataPro = JSON.parse(localStorage.product);
}

submit.onclick = function () {
  let newPro = {
    title: title.value.toLowerCase(),
    price: price.value,
    taxes: taxes.value,
    ads: ads.value,
    discount: discount.value,
    total: total.innerHTML,
    count: count.value,
    category: category.value.toLowerCase(),
  };
  if(title.value !== '' && price.value !== '' && category.value !== '' && newPro.count < 100){
    if (mood === "create") {
      if (newPro.count > 1) {
        for (let i = 0; i < newPro.count; i++) {
          dataPro.push(newPro);
        }
      } else {
        dataPro.push(newPro);
      }
    } else {
      dataPro[globalVar] = newPro;
      mood = "create";
      submit.innerHTML = "Create";
      count.style.display = "block";
    }
  clearData()

  }
 

  localStorage.setItem("product", JSON.stringify(dataPro));
  
  showData();
};

// get total function

function getTotal() {
  if (price.value !== "") {
    let result = +price.value + +taxes.value + +ads.value - +discount.value;
    total.innerHTML = result;
    total.style.background = "#040";
  } else {
    total.innerHTML = "";
    total.style.background = "#a00d02";
  }
}

// clear inputs function
function clearData() {
  title.value = "";
  price.value = "";
  ads.value = "";
  taxes.value = "";
  count.value = "";
  category.value = "";
  total.innerHTML = "";
}

// read
function showData() {
  getTotal();
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    table += `
        <tr>
                    <td>${i + 1}</td>
                    <td>${dataPro[i].title}</td>
                    <td>${dataPro[i].price}</td>
                    <td>${dataPro[i].taxes}</td>
                    <td>${dataPro[i].ads}</td>
                    <td>${dataPro[i].discount}</td>
                    <td>${dataPro[i].total}</td>
                    <td>${dataPro[i].category}</td>
                    <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                    <td><button  onclick="deleteData(${i})" id="delete">Delete</button></td>



                </tr>
        
        `;
  }
  document.getElementById("tbody").innerHTML = table;
  let btnDelelteAll = document.getElementById("delete-all");

  if (dataPro.length > 0) {
    btnDelelteAll.innerHTML = `
    <button onclick = "deleteAll()">Delete All (${dataPro.length})</button>
    `;
  } else {
    btnDelelteAll.innerHTML = "";
  }
}
showData();

// delete one

function deleteData(i) {
  dataPro.splice(i, 1);
  localStorage.product = JSON.stringify(dataPro);
  showData();
}
// delete all
function deleteAll() {
  localStorage.clear();
  dataPro.splice(0);
  showData();
}

// count

// update

function updateData(i) {
  title.value = dataPro[i].title;
  price.value = dataPro[i].price;
  ads.value = dataPro[i].ads;
  taxes.value = dataPro[i].taxes;
  discount.value = dataPro[i].discount;
  getTotal();
  count.style.display = "none";
  submit.innerHTML = "Update";
  mood = "update";
  globalVar = i;
  scroll({
    top: 0,
    behavior: "smooth",
  });
}
// search

function getSearchMood(id) {
  if (id === "searchTitle") {
    searchMood = "Title";
  } else {
    searchMood = "Category";
  }
  search.placeholder = `Search By ${searchMood}`;

  search.focus();
  search.VALUE = '';
  showData();
}

function searchData(value) {
  let table = "";
  for (let i = 0; i < dataPro.length; i++) {
    if (searchMood == "title") {
      if (dataPro[i].title.includes(value.toLowerCase())){
        table += `
      <tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                  <td><button  onclick="deleteData(${i})" id="delete">Delete</button></td>



              </tr>
      
      `;
      }
    } else {
      if (dataPro[i].category.includes(value.toLowerCase())){
        table += `
      <tr>
                  <td>${i}</td>
                  <td>${dataPro[i].title}</td>
                  <td>${dataPro[i].price}</td>
                  <td>${dataPro[i].taxes}</td>
                  <td>${dataPro[i].ads}</td>
                  <td>${dataPro[i].discount}</td>
                  <td>${dataPro[i].total}</td>
                  <td>${dataPro[i].category}</td>
                  <td><button onclick = "updateData(${i})" id="update">Update</button></td>
                  <td><button  onclick="deleteData(${i})" id="delete">Delete</button></td>



              </tr>
      
      `;
      }
    }
    document.getElementById("tbody").innerHTML = table;
  }
}
// clean data


