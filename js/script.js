const products = [
    { id: 1, title: "Men's Casual Jacket", description: "Stylish and warm jacket for men.", price: 59.99, image: "images/products/mens_jacket.jpg", category: "mens" },
    { id: 2, title: "Women's Floral Dress", description: "Elegant floral dress for women.", price: 39.99, image: "images/products/womens_dress.jpg", category: "womens" },
    { id: 3, title: "Children's Toy Set", description: "Fun and educational toy set for kids.", price: 29.99, image: "images/products/childrens_toy.jpg", category: "childrens" },
    { id: 4, title: "Gift Hamper", description: "Perfect gift for any occasion.", price: 49.99, image: "images/products/gift_hamper.jpg", category: "gifts" },
    { id: 5, title: "Leather Wallet", description: "Sleek and durable leather wallet.", price: 19.99, image: "images/products/leather_wallet.jpg", category: "accessories" },
    { id: 6, title: "Men's Running Shoes", description: "Comfortable shoes for running.", price: 79.99, image: "images/products/mens_shoes.jpg", category: "mens" },
    { id: 7, title: "Women's Handbag", description: "Chic and spacious handbag.", price: 69.99, image: "images/products/womens_handbag.jpg", category: "womens" },
    { id: 8, title: "Children's Backpack", description: "Cute backpack for school kids.", price: 24.99, image: "images/products/childrens_backpack.jpg", category: "childrens" },
    { id: 9, title: "Gift Card", description: "A versatile gift card for any purchase.", price: 25.00, image: "images/products/gift_card.jpg", category: "gifts" },
    { id: 10, title: "Sunglasses", description: "Stylish UV-protective sunglasses.", price: 15.99, image: "images/products/sunglasses.jpg", category: "accessories" },
    { id: 11, title: "Water Bottle", description: "Reusable 750ml stainless steel bottle, BPA-free, leak-proof, eco-friendly.", price: 19.99, image: "images/products/water_bottle.jpg", category: "accessories" },
    { id: 12, title: "Watch", description: "Minimalist wristwatch, leather strap, quartz movement, water-resistant, stylish.", price: 110.99, image: "images/products/watchs.jpg", category: "accessories" }
];

// Carousel Images
const carouselImages = [
    "images/carousel/d197f3d63e273b6f5c105412b799eae6.jpeg",
    "images/carousel/hd-wallpaper-laptop-red-sunset-background-laptop.jpg",
    "images/carousel/pexels-sebastians-750225.jpg"
];

// Cart
let cart = JSON.parse(localStorage.getItem('cart')) || [];
let currentSlide = 0;
let currentNewArrivalsIndex = 0;
const itemsPerPage = 3; // Number of items to show in New Arrivals at a time

// Navigation
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        const sectionId = link.getAttribute('href').substring(1);
        document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
        document.getElementById(sectionId).classList.remove('hidden');
    });
});

// Carousel
function populateCarousel() {
    const carouselItems = document.getElementById('carousel-items');
    carouselItems.innerHTML = ''; // Clear existing items
    carouselImages.forEach((image, index) => {
        const div = document.createElement('div');
        div.className = 'w-full flex-shrink-0';
        const img = document.createElement('img');
        img.src = image;
        img.alt = `Slide ${index + 1}`;
        // Apply inline styles to show full image
        img.style.width = '100%';
        img.style.height = 'auto';
        img.style.objectFit = 'contain';
        img.style.display = 'block';
        img.style.maxHeight = '650px';
        div.appendChild(img);
        carouselItems.appendChild(div);
    });

    // Log the computed styles of the first carousel image for debugging
    const firstImage = carouselItems.querySelector('img');
    if (firstImage) {
        const computedStyles = window.getComputedStyle(firstImage);
        console.log('Carousel Image Computed Styles:', {
            height: computedStyles.height,
            width: computedStyles.width,
            objectFit: computedStyles.objectFit,
            display: computedStyles.display
        });
    }
}

function updateCarousel() {
    const carouselItems = document.getElementById('carousel-items');
    carouselItems.style.transform = `translateX(-${currentSlide * 100}%)`;
}

document.getElementById('prev-btn').addEventListener('click', () => {
    currentSlide = (currentSlide - 1 + carouselImages.length) % carouselImages.length;
    updateCarousel();
});

document.getElementById('next-btn').addEventListener('click', () => {
    currentSlide = (currentSlide + 1) % carouselImages.length;
    updateCarousel();
});

// New Arrivals Rotation
function populateNewArrivals() {
    const newArrivals = document.getElementById('new-arrivals');
    newArrivals.innerHTML = '';

    const startIndex = currentNewArrivalsIndex;
    const endIndex = Math.min(startIndex + itemsPerPage, products.length);

    for (let i = startIndex; i < endIndex; i++) {
        const product = products[i];
        const card = document.createElement('div');
        card.className = 'product-card flex-shrink-0';
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-content">
                <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
                <p class="text-gray-600">${product.description}</p>
                <p class="text-blue-600 font-bold mt-2">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', () => showProductDetails(product.id));
        newArrivals.appendChild(card);
    }
}

document.getElementById('new-arrivals-prev').addEventListener('click', () => {
    currentNewArrivalsIndex = (currentNewArrivalsIndex - itemsPerPage + products.length) % products.length;
    if (currentNewArrivalsIndex < 0) currentNewArrivalsIndex = 0;
    populateNewArrivals();
});

document.getElementById('new-arrivals-next').addEventListener('click', () => {
    currentNewArrivalsIndex = (currentNewArrivalsIndex + itemsPerPage) % products.length;
    if (currentNewArrivalsIndex >= products.length) currentNewArrivalsIndex = 0;
    populateNewArrivals();
});

// Discount Offers
function populateDiscountOffers() {
    const discountOffers = document.getElementById('discount-offers');
    discountOffers.innerHTML = '';
    const discountedProducts = products.filter(p => p.price < 50);
    discountedProducts.slice(0, 4).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-content">
                <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
                <p class="text-gray-600">${product.description}</p>
                <p class="text-blue-600 font-bold mt-2">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', () => showProductDetails(product.id));
        discountOffers.appendChild(card);
    });
}

// All Products (Home Page)
function populateHomeProducts() {
    const homeProducts = document.getElementById('home-products');
    homeProducts.innerHTML = '';
    products.slice(0, 8).forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-content">
                <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
                <p class="text-gray-600">${product.description}</p>
                <p class="text-blue-600 font-bold mt-2">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', () => showProductDetails(product.id));
        homeProducts.appendChild(card);
    });
}

// Product Grid (Products Page)
let currentCategory = 'all';
function setCategory(category) {
    currentCategory = category;
    document.querySelectorAll('.category-btn').forEach(btn => btn.classList.remove('bg-blue-700'));
    document.querySelector(`.category-btn[onclick="setCategory('${category}')"]`).classList.add('bg-blue-700');
    document.getElementById('category-filter').value = category;
    populateProductGrid();
}

function populateProductGrid() {
    const productGrid = document.getElementById('product-grid');
    productGrid.innerHTML = '';
    const searchTerm = document.getElementById('search-filter').value.toLowerCase();
    const priceLimit = document.getElementById('price-filter').value;

    let filteredProducts = products.filter(product => {
        const matchesCategory = currentCategory === 'all' || product.category === currentCategory;
        const matchesSearch = product.title.toLowerCase().includes(searchTerm) || product.description.toLowerCase().includes(searchTerm);
        const matchesPrice = product.price <= priceLimit;
        return matchesCategory && matchesSearch && matchesPrice;
    });

    filteredProducts.forEach(product => {
        const card = document.createElement('div');
        card.className = 'product-card';
        card.innerHTML = `
            <div class="image-wrapper">
                <img src="${product.image}" alt="${product.title}">
            </div>
            <div class="card-content">
                <h3 class="text-lg font-semibold text-gray-800">${product.title}</h3>
                <p class="text-gray-600">${product.description}</p>
                <p class="text-blue-600 font-bold mt-2">$${product.price.toFixed(2)}</p>
                <button onclick="addToCart(${product.id})" class="mt-4 w-full bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition-colors">Add to Cart</button>
            </div>
        `;
        card.addEventListener('click', () => showProductDetails(product.id));
        productGrid.appendChild(card);
    });
}

// Filters
document.getElementById('search-filter').addEventListener('input', populateProductGrid);
document.getElementById('category-filter').addEventListener('change', (e) => {
    setCategory(e.target.value);
});
document.getElementById('price-filter').addEventListener('input', (e) => {
    document.getElementById('price-value').textContent = `$${e.target.value}`;
    populateProductGrid();
});

// Product Details Modal
function showProductDetails(productId) {
    const product = products.find(p => p.id === productId);
    document.getElementById('product-title').textContent = product.title;
    document.getElementById('product-image').src = product.image;
    document.getElementById('product-description').textContent = product.description;
    document.getElementById('product-price').textContent = `$${product.price.toFixed(2)}`;
    document.getElementById('product-details-modal').classList.remove('hidden');

    // Log the computed styles of the product image for debugging
    const productImage = document.getElementById('product-image');
    if (productImage) {
        const computedStyles = window.getComputedStyle(productImage);
        console.log('Product Image Computed Styles:', {
            width: computedStyles.width,
            height: computedStyles.height,
            maxHeight: computedStyles.maxHeight,
            objectFit: computedStyles.objectFit,
            display: computedStyles.display,
            margin: computedStyles.margin
        });
    }
}

document.getElementById('close-product-modal').addEventListener('click', () => {
    document.getElementById('product-details-modal').classList.add('hidden');
});

// Cart
function addToCart(productId) {
    const product = products.find(p => p.id === productId);
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity++;
    } else {
        cart.push({ ...product, quantity: 1 });
    }
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

function addToCartFromModal() {
    const productId = products.find(p => p.title === document.getElementById('product-title').textContent).id;
    addToCart(productId);
    document.getElementById('product-details-modal').classList.add('hidden');
}

function updateCart() {
    const cartItems = document.getElementById('cart-items');
    cartItems.innerHTML = '';
    let total = 0;

    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        const div = document.createElement('div');
        div.className = 'flex justify-between items-center bg-white p-4 rounded-lg shadow-lg';
        div.innerHTML = `
            <div class="flex items-center">
                <div class="image-wrapper-cart">
                    <img src="${item.image}" alt="${item.title}" class="w-full h-full rounded-lg">
                </div>
                <div>
                    <h3 class="text-lg font-semibold text-gray-800">${item.title}</h3>
                    <p class="text-gray-600">$${item.price.toFixed(2)} x ${item.quantity}</p>
                </div>
            </div>
            <div>
                <button onclick="updateCartItem(${item.id}, ${item.quantity - 1})" class="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400">-</button>
                <span class="mx-2">${item.quantity}</span>
                <button onclick="updateCartItem(${item.id}, ${item.quantity + 1})" class="bg-gray-300 text-gray-800 px-2 py-1 rounded-lg hover:bg-gray-400">+</button>
                <button onclick="removeFromCart(${item.id})" class="ml-2 bg-red-600 text-white px-2 py-1 rounded-lg hover:bg-red-700">Remove</button>
            </div>
        `;
        cartItems.appendChild(div);
    });

    document.getElementById('cart-total').textContent = total.toFixed(2);
    document.getElementById('cart-count').textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
}

function updateCartItem(productId, quantity) {
    if (quantity === 0) {
        removeFromCart(productId);
        return;
    }
    const cartItem = cart.find(item => item.id === productId);
    if (cartItem) {
        cartItem.quantity = quantity;
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCart();
    }
}

function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
}

document.getElementById('checkout-btn').addEventListener('click', () => {
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById('checkout').classList.remove('hidden');
});

// Checkout
document.getElementById('payment-method').addEventListener('change', (e) => {
    const creditCardDetails = document.getElementById('credit-card-details');
    creditCardDetails.classList.toggle('hidden', e.target.value !== 'credit');
});

document.getElementById('checkout-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Order placed successfully!');
    cart = [];
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCart();
    document.querySelectorAll('section').forEach(section => section.classList.add('hidden'));
    document.getElementById('home').classList.remove('hidden');
});

// Feedback
document.getElementById('feedback-form').addEventListener('submit', (e) => {
    e.preventDefault();
    alert('Thank you for your feedback!');
    document.getElementById('feedback-form').reset();
});

// Authentication
let isAuthenticated = false;

document.getElementById('login-btn').addEventListener('click', () => {
    document.getElementById('auth-title').textContent = 'Login';
    document.getElementById('auth-modal').classList.remove('hidden');
});

document.getElementById('signup-btn').addEventListener('click', () => {
    document.getElementById('auth-title').textContent = 'Sign Up';
    document.getElementById('auth-modal').classList.remove('hidden');
});

document.getElementById('close-modal').addEventListener('click', () => {
    document.getElementById('auth-modal').classList.add('hidden');
});

document.getElementById('auth-form').addEventListener('submit', (e) => {
    e.preventDefault();
    isAuthenticated = true;
    document.getElementById('auth-status').innerHTML = `
        <span class="text-lg">Welcome, User!</span>
        <button id="logout-btn" class="bg-red-500 px-4 py-2 rounded-full hover:bg-red-600 transition-colors">Logout</button>
    `;
    document.getElementById('auth-modal').classList.add('hidden');
    document.getElementById('logout-btn').addEventListener('click', () => {
        isAuthenticated = false;
        document.getElementById('auth-status').innerHTML = `
            <button id="login-btn" class="bg-blue-500 px-4 py-2 rounded-full hover:bg-blue-600 transition-colors">Login</button>
            <button id="signup-btn" class="bg-green-500 px-4 py-2 rounded-full hover:bg-green-600 transition-colors">Sign Up</button>
        `;
        document.getElementById('login-btn').addEventListener('click', () => {
            document.getElementById('auth-title').textContent = 'Login';
            document.getElementById('auth-modal').classList.remove('hidden');
        });
        document.getElementById('signup-btn').addEventListener('click', () => {
            document.getElementById('auth-title').textContent = 'Sign Up';
            document.getElementById('auth-modal').classList.remove('hidden');
        });
    });
});

// Initialize
populateCarousel();
updateCarousel();
populateNewArrivals();
populateDiscountOffers();
populateHomeProducts();
populateProductGrid();
updateCart();