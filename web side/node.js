const products = [
    {
        id: 1,
        name: "Shoes",
        price: 4000,
        category: "Fashion",
        image: "image.png"
    },
    {
        id: 2,
        name: "Headphones",
        price: 3500,
        category: "Electronics",
        image: "image copy.png"
    },
    {
        id: 3,
        name: "Laptop",
        price: 55000,
        category: "Electronics",
        image: "image copy 2.png"
    },
    {
        id: 4,
        name: "Backpack",
        price: 1800,
        category: "Accessories",
        image: "image copy 3.png"
    },
    {
        id: 5,
        name: "Watch",
        price: 2000,
        category: "Accessories",
        image: "image copy 4.png"
    }
];

const productContainer = document.getElementById("productContainer");
const cartContainer = document.getElementById("cartContainer");
const searchInput = document.getElementById("search");
const categorySelect = document.getElementById("category");
const total = document.getElementById("total");
const clearCart = document.getElementById("clearCart");

let cart = JSON.parse(localStorage.getItem("cart")) || [];

// Display Products
function displayProducts(productsList) {

    productContainer.innerHTML = "";

    productsList.forEach(product => {

        productContainer.innerHTML += `
        <div class="product-card">

            <img src="${product.image}" alt="${product.name}">

            <div class="content">

                <h3>${product.name}</h3>

                <p>${product.category}</p>

                <h4>₹${product.price}</h4>

                <button onclick="addToCart(${product.id})">
                    🛒 Add to Cart
                </button>

            </div>

        </div>
        `;
    });

}

// Add to Cart
function addToCart(id) {

    const product = products.find(item => item.id === id);

    const existing = cart.find(item => item.id === id);

    if (existing) {
        existing.quantity++;
    } else {
        cart.push({
            ...product,
            quantity: 1
        });
    }

    saveCart();

    // alert(`${product.name} added to cart 🛒`);

}

// Search + Filter
function filterProducts() {

    const search = searchInput.value.toLowerCase();

    const category = categorySelect.value;

    const filtered = products.filter(product => {

        const matchSearch = product.name
            .toLowerCase()
            .includes(search);

        const matchCategory =
            category === "All" ||
            product.category === category;

        return matchSearch && matchCategory;

    });

    displayProducts(filtered);

}

searchInput.addEventListener("input", filterProducts);

categorySelect.addEventListener("change", filterProducts);

// Render Cart
function renderCart() {

    cartContainer.innerHTML = "";

    if (cart.length === 0) {

        cartContainer.innerHTML = `
            <p class="empty">
                🛒 Your cart is empty.
            </p>
        `;

        total.textContent = 0;

        return;
    }

    let grandTotal = 0;

    cart.forEach(item => {

        grandTotal += item.price * item.quantity;

        cartContainer.innerHTML += `
        <div class="cart-value">

            <img src="${item.image}" alt="${item.name}">

            <div class="cart-info">

                <h4>${item.name}</h4>

                <p>₹${item.price}</p>

                <div class="quantity">

                    <button onclick="decreaseQuantity(${item.id})">-</button>

                    <span>${item.quantity}</span>

                    <button onclick="increaseQuantity(${item.id})">+</button>

                </div>

            </div>

            <button class="remove-btn"
            onclick="removeItem(${item.id})">
                Remove
            </button>

        </div>
        `;

    });

    total.textContent = grandTotal;

    localStorage.setItem("cart", JSON.stringify(cart));

}

// Increase
function increaseQuantity(id) {

    const product = cart.find(item => item.id === id);

    if (product) {

        product.quantity++;

        saveCart();

    }

}

// Decrease
function decreaseQuantity(id) {

    const product = cart.find(item => item.id === id);

    if (!product) return;

    if (product.quantity > 1) {

        product.quantity--;

    } else {

        cart = cart.filter(item => item.id !== id);

    }

    saveCart();

}

// Remove
function removeItem(id) {

    cart = cart.filter(item => item.id !== id);

    saveCart();

}

// Save
function saveCart() {

    localStorage.setItem("cart", JSON.stringify(cart));

    renderCart();

}

// Clear Cart
// clearCart.addEventListener("click", () => {

//     if (confirm("Clear complete cart?")) {

//         cart = [];

//         saveCart();

//     }

// });

clearCart.addEventListener("click", () => {
    cart = [];
    saveCart();
});
// Initial Load
displayProducts(products);

renderCart();