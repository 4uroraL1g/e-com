const categories = [
    {
        name: "Phone and Laptop",
        products: [
            { id: 1, name: "Laptop Gaming", price: 15000000, img: "https://via.placeholder.com/100", url: "laptop-gaming.html",
              relatedItems: [
                { id: 101, name: "asus ROG Strix", price: 35000000, img: "https://via.placeholder.com/100", url: "asus-rog-strix.html" },
                { id: 102, name: "MSI cyborg 15", price: 32000000, img: "https://via.placeholder.com/100", url: "msi-cyborg-15.html" }
              ]
            },
            { id: 2, name: "Samsung galaxy", price: 8000000, img: "https://via.placeholder.com/100", url: "samsung-galaxy.html" },
            { id: 3, name: "Tablet", price: 5000000, img: "https://via.placeholder.com/100", url: "tablet.html" },
            { id: 10, name: "MacBook Pro", price: 25000000, img: "https://via.placeholder.com/100", url: "macbook-pro.html" },
            { id: 11, name: "iPhone 14", price: 22000000, img: "https://via.placeholder.com/100", url: "iphone-14.html" },
            { id: 25, name: "Iphone 15 pro max", price: 30000000, img: "https://via.placeholder.com/100", url: "iphone-15-pro-max.html" }
        ]
    },
    {
        name: "Accessories & Audio",
        products: [
            { id: 4, name: "Bluetooth headphone", price: 500000, img: "https://via.placeholder.com/100" },
            { id: 5, name: "Wireless mouse", price: 300000, img: "https://via.placeholder.com/100" },
            { id: 6, name: "Mechanical keyboard", price: 1500000, img: "https://via.placeholder.com/100" },
            { id: 12, name: "Smartwatch", price: 3500000, img: "https://via.placeholder.com/100" },
            { id: 13, name: "Portable speaker", price: 1200000, img: "https://via.placeholder.com/100" },
            { id: 26, name: "JBL quantum 800", price: 4000000, img: "https://via.placeholder.com/100" }
        ]
    },
    {
        name: "Household appliances",
        products: [
            { id: 7, name: "Vacuum cleaner", price: 2000000, img: "https://via.placeholder.com/100" },
            { id: 8, name: "Oil-free fryer", price: 2500000, img: "https://via.placeholder.com/100" },
            { id: 9, name: "Blender", price: 800000, img: "https://via.placeholder.com/100" },
            { id: 14, name: "Air purifier", price: 3000000, img: "https://via.placeholder.com/100" },
            { id: 15, name: "Microwave oven", price: 4000000, img: "https://via.placeholder.com/100" },
            { id: 27, name: "kalpen vacuum cleaner", price: 3500000, img: "https://via.placeholder.com/100" }
        ]
    },
    {
        name: "Gaming",
        products: [
            { id: 16, name: "PlayStation 5", price: 15000000, img: "https://via.placeholder.com/100" },
            { id: 17, name: "Xbox Series X", price: 14000000, img: "https://via.placeholder.com/100" },
            { id: 18, name: "Nintendo Switch", price: 9000000, img: "https://via.placeholder.com/100" },
            { id: 28, name: "ps5", price: 15000000, img: "https://via.placeholder.com/100" }
        ]
    },
    {
        name: "Books",
        products: [
            { id: 19, name: "JavaScript Guide", price: 300000, img: "https://via.placeholder.com/100" },
            { id: 20, name: "Python Cookbook", price: 400000, img: "https://via.placeholder.com/100" },
            { id: 21, name: "Clean Code", price: 500000, img: "https://via.placeholder.com/100" }
        ]
    },
    {
        name: "Fitness",
        products: [
            { id: 22, name: "Yoga Mat", price: 700000, img: "https://via.placeholder.com/100" },
            { id: 23, name: "Dumbbells", price: 1200000, img: "https://via.placeholder.com/100" },
            { id: 24, name: "Treadmill", price: 15000000, img: "https://via.placeholder.com/100" },
            { id: 29, name: "neoprene dumbbell", price: 1300000, img: "https://via.placeholder.com/100" }
        ]
    }
];

let cart = [];
let currentCategory = "All Products";

function loadCategories(filterCategory = "All Products") {
    let categoryContainer = document.getElementById("categories");
    categoryContainer.innerHTML = "";
    // Do not render any categories to remove them from main page
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

function setupCategoryButtons() {
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        button.addEventListener("click", () => {
            // Remove active class from all buttons
            buttons.forEach(btn => btn.classList.remove("active"));
            // Add active class to clicked button
            button.classList.add("active");

            const selectedCategory = button.getAttribute("data-category-name");
            currentCategory = selectedCategory;
            loadCategories(selectedCategory);
        });
    });
}

function loadPopularProducts() {
    const popularProductsContainer = document.getElementById("popularProductsContainer");
    popularProductsContainer.innerHTML = "";

    // Define popular products by name
    const popularProductNames = ["Iphone 15 pro max", "ps5", "neoprene dumbbell", "kalpen vacuum cleaner", "JBL quantum 800"];

    // Collect popular products from categories
    let popularProducts = [];
    categories.forEach(category => {
        category.products.forEach(product => {
            if (popularProductNames.includes(product.name)) {
                popularProducts.push(product);
            }
        });
    });

    popularProducts.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VND</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
        popularProductsContainer.innerHTML += productHTML;
    });
}

function loadNewProducts() {
    const newProductsContainer = document.getElementById("newProductsContainer");
    if (!newProductsContainer) return;
    newProductsContainer.innerHTML = "";

    // Define new products by name (5 items)
    const newProductNames = ["Smartwatch", "Yoga Mat", "PlayStation 5", "Wireless mouse", "Bluetooth headphone"];

    // Collect new products from categories
    let newProducts = [];
    categories.forEach(category => {
        category.products.forEach(product => {
            if (newProductNames.includes(product.name)) {
                newProducts.push(product);
            }
        });
    });

    newProducts.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VND</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
        newProductsContainer.innerHTML += productHTML;
    });
}

function loadFeaturedProducts() {
    const featuredProductsContainer = document.getElementById("featuredProductsContainer");
    if (!featuredProductsContainer) return;
    featuredProductsContainer.innerHTML = "";

    // Define featured products by name (5 items)
    const featuredProductNames = ["Iphone 15 pro max", "ps5", "neoprene dumbbell", "kalpen vacuum cleaner", "JBL quantum 800"];

    // Collect featured products from categories
    let featuredProducts = [];
    categories.forEach(category => {
        category.products.forEach(product => {
            if (featuredProductNames.includes(product.name)) {
                featuredProducts.push(product);
            }
        });
    });

    featuredProducts.forEach(product => {
        const productHTML = `
            <div class="product">
                <img src="${product.img}" alt="${product.name}">
                <h3>${product.name}</h3>
                <p>${product.price.toLocaleString()} VND</p>
                <button class="add-to-cart" onclick="addToCart(${product.id})">Add to cart</button>
            </div>
        `;
        featuredProductsContainer.innerHTML += productHTML;
    });
}

window.onload = () => {
    loadPopularProducts();
    loadNewProducts();
    loadFeaturedProducts();
    loadCategories();
    setupCategoryButtons();

    // Define popular products to exclude from submenu
    const popularProductNames = ["Iphone 15 pro max", "ps5", "neoprene dumbbell", "kalpen vacuum cleaner", "JBL quantum 800"];

    // Generate submenu items for each category button excluding popular products
    const buttons = document.querySelectorAll(".category-btn");
    buttons.forEach(button => {
        const categoryName = button.getAttribute("data-category-name");
        const submenu = button.querySelector(".submenu");
        submenu.innerHTML = ""; // Clear existing submenu items

        // Find the category in categories array
        const category = categories.find(cat => cat.name === categoryName);
        if (category && category.products && category.products.length > 0) {
            const submenuList = document.createElement("ul");
            submenuList.classList.add("submenu-list");

            function addSubmenuItem(product) {
                const submenuItem = document.createElement("li");
                const link = document.createElement("a");
                link.textContent = product.name;
                link.href = product.url || "#";
                link.style.cursor = "pointer";
                submenuItem.appendChild(link);
                submenuList.appendChild(submenuItem);
            }

            if (categoryName === "Phone and Laptop") {
                // Exclude specific products and add "Smartphone" instead (remove iphone 15 pro max)
                category.products.forEach(product => {
                    if (!["Samsung galaxy", "MacBook Pro", "iPhone 14", "Iphone 15 pro max"].includes(product.name)) {
                        addSubmenuItem(product);
                    }
                });
                const smartphoneItem = document.createElement("li");
                const smartphoneLink = document.createElement("a");
                smartphoneLink.textContent = "Smartphone";
                smartphoneLink.href = "#"; // Placeholder URL
                smartphoneLink.style.cursor = "pointer";
                smartphoneItem.appendChild(smartphoneLink);
                submenuList.appendChild(smartphoneItem);
            } else {
                category.products.forEach(product => {
                    if (!popularProductNames.includes(product.name)) {
                        addSubmenuItem(product);
                    }
                });
            }

            submenu.appendChild(submenuList);
        }
    });
};
