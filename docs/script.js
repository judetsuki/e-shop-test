//тут глобальные переменные, незнаю как без них
let products = [];
let originalProducts = [];
let cart = [];
let currentPage = 1;
const itemsPerPage = 4;

fetch("products.json")
  .then((response) => response.json())
  .then((data) => {
    products = data;
    originalProducts = [...products];
    renderProducts();
  });
//кнопку попросил AI сделать
function renderPagination() {
  const pagination = document.getElementById("pagination");
  pagination.textContent = "";

  const totalPages = Math.ceil(products.length / itemsPerPage);

  for (let i = 1; i <= totalPages; i++) {
    const button = document.createElement("button");
    button.textContent = i;
    button.classList.add(
      "p-2",
      "border",
      "rounded-md",
      "focus:ring-2",
      "focus:ring-blue-500"
    );

    if (currentPage === i) {
      button.classList.add("bg-blue-500", "text-white");
    }

    button.addEventListener("click", () => {
      currentPage = i;
      renderProducts();
    });

    pagination.appendChild(button);
  }
}

function renderProducts() {
  const productList = document.getElementById("product-list");
  productList.textContent = "";

  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const displayedProducts = products.slice(startIndex, endIndex);

  displayedProducts.forEach((product) => {
    const li = document.createElement("li");
    li.textContent = `${product.name} - €${product.price.toFixed(2)}`;
    const img = document.createElement("img");
    img.src = product.image;
    img.style.maxHeight = 300 + "px";
    li.appendChild(img);
    productList.appendChild(li);
  });

  renderPagination();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.textContent = "";
  let total = 0;

  cart.forEach((item) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - €${item.price.toFixed(2)}`;
    cartItems.appendChild(li);
    total += item.price;
  });

  const cartTotal = document.getElementById("cart-total");
  cartTotal.textContent = `${total.toFixed(2)}`;
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

const searchInput = document.getElementById("search");
searchInput.addEventListener("input", search);

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
