const categories = [
    {
        name: "Phone and Laptop",
        products: [
            { id: 1, name: "Laptop Gaming", price: 15000000, img: "https://via.placeholder.com/100" },
            { id: 2, name: "Samsung galaxy", price: 8000000, img: "https://via.placeholder.com/100" },
            { id: 3, name: "Tablet", price: 5000000, img: "https://via.placeholder.com/100" }
        ]
    },
    {
        name: "Accessories & Audio",
        products: [
            { id: 4, name: "Bluetooth headphone", price: 500000, img: "https://via.placeholder.com/100" },
            { id: 5, name: "Wireless mouse", price: 300000, img: "https://via.placeholder.com/100" },
            { id: 6, name: "Mechanical keyboard", price: 1500000, img: "https://via.placeholder.com/100" }
        ]
    },
    {
        name: "Household appliances",
        products: [
            { id: 7, name: "Vacuum cleaner", price: 2000000, img: "https://via.placeholder.com/100" },
            { id: 8, name: "Oil-free fryer", price: 2500000, img: "https://via.placeholder.com/100" },
            { id: 9, name: "Blender", price: 800000, img: "https://via.placeholder.com/100" }
        ]
    }
];

let cart = [];

function loadCategories() {
    let categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";

    categories.forEach(category => {
        let categoryHTML = `
            <div class="category">
                <h2>${category.name}</h2>
                <div class="products">
                    ${category.products.map(product => `
                        <div class="product">
                            <img src="${product.img}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price.toLocaleString()} VND</p>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">Thêm vào giỏ</button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        categoryContainer.innerHTML += categoryHTML;
    });
}

function addToCart(productId) {
    let product;
    categories.forEach(category => {
        category.products.forEach(p => {
            if (p.id === productId) product = p;
        });
    });

    if (product) {
        cart.push(product);
        document.getElementById("cartCount").innerText = cart.length;
        alert(`${product.name} đã được thêm vào giỏ hàng!`);
    }
}

function searchProduct() {
    let query = document.getElementById("searchBox").value.toLowerCase();
    let categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";

    let filteredCategories = categories.map(category => ({
        name: category.name,
        products: category.products.filter(p => p.name.toLowerCase().includes(query))
    })).filter(category => category.products.length > 0);

    if (filteredCategories.length === 0) {
        categoryContainer.innerHTML = "<p style='text-align:center;'>No products found</p>";
        return;
    }

    filteredCategories.forEach(category => {
        let categoryHTML = `
            <div class="category">
                <h2>${category.name}</h2>
                <div class="products">
                    ${category.products.map(product => `
                        <div class="product">
                            <img src="${product.img}" alt="${product.name}">
                            <h3>${product.name}</h3>
                            <p>${product.price.toLocaleString()} VND</p>
                            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
                        </div>
                    `).join("")}
                </div>
            </div>
        `;
        categoryContainer.innerHTML += categoryHTML;
    });
}

function viewCart() {
    let cartList = cart.map(p => `- ${p.name} (${p.price.toLocaleString()} VND)`).join("\n");
    alert(cartList ? `Your shopping cart:\n${cartList}` : "Cart is empty!");
}

window.onload = loadCategories;
