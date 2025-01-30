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
//кнопку для страниц попросил AI сделать, и оно сделал классы из теилвинда я так понимаю
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
    // тут тоже классы для кнопки Ai попросил сделать
    const addToCartButton = document.createElement("img");
    addToCartButton.src =
      "https://media.istockphoto.com/id/1206806317/vector/shopping-cart-icon-isolated-on-white-background.jpg?s=612x612&w=0&k=20&c=1RRQJs5NDhcB67necQn1WCpJX2YMfWZ4rYi1DFKlkNA=";
    addToCartButton.style.width = "25px";
    addToCartButton.style.height = "25px";
    addToCartButton.style.cursor = "pointer";
    addToCartButton.style.border = "1px solid";
    addToCartButton.style.borderRadius = "5px";
    addToCartButton.style.marginTop = "5px";

    addToCartButton.addEventListener("click", () => {
      cart.push(product);
      renderCart();
    });

    li.appendChild(img);
    li.appendChild(addToCartButton);
    productList.appendChild(li);
  });

  renderPagination();
}

function renderCart() {
  const cartItems = document.getElementById("cart-items");
  cartItems.textContent = "";
  let total = 0;

  cart.forEach((item, index) => {
    const li = document.createElement("li");
    li.textContent = `${item.name} - €${item.price.toFixed(2)}`;

    const deleteButton = document.createElement("button");
    deleteButton.textContent = "X";
    deleteButton.classList.add(
      "border",
      "rounded-md",
      "focus:ring-2",
      "focus:ring-red-500",
      "text-red-500"
    );

    deleteButton.addEventListener("click", () => {
      cart.splice(index, 1);
      renderCart();
    });

    li.appendChild(deleteButton);
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
