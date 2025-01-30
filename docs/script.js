//тут глобальные, незнаю как без них сделать
let products = [];
let originalProducts = [];
//

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    originalProducts = [...products];
    renderProducts();
  });

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.textContent = "";
  products.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - €${product.price.toFixed(2)}`;
    const img = document.createElement("img");
    img.src = product.image;
    img.style.maxHeight = 300 + "px";
    li.appendChild(img);
    productList.appendChild(li);
  });
}

function search() {
  const searchValue = searchInput.value.toLowerCase();
  const filteredProducts = products.filter((product) =>
    product.name.toLowerCase().includes(searchValue)
  );
  products = filteredProducts;
  renderProducts();

  if (searchValue === "") {
    products = [...originalProducts];
    renderProducts();
  }
}
//тут тоже глобальные переменные, не понял как без них обойтись
const searchInput = document.getElementById("search");
searchInput.addEventListener("input", search);
//

const sortSelect = document.getElementById("sort");
sortSelect.addEventListener("change", (event) => {
  const sortValue = event.target.value;

  switch (sortValue) {
    case "price-asc":
      products.sort((a, b) => a.price - b.price);
      break;
    case "price-desc":
      products.sort((a, b) => b.price - a.price);
      break;
    case "name-asc":
      products.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      products.sort((a, b) => b.name.localeCompare(a.name));
      break;
    default:
      products = [...originalProducts];
  }

  renderProducts();
});

const categorySelect = document.getElementById("category");
categorySelect.addEventListener("change", (event) => {
  const categoryValue = event.target.value;

  if (categoryValue === "all") {
    products = [...originalProducts];
  } else {
    products = [...originalProducts];
    const filteredProducts = products.filter(
      (product) => product.category === categoryValue
    );
    products = filteredProducts;
  }
  renderProducts();
});
