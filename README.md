MJ Shopping 🛒
Welcome to MJ Shopping, an e-commerce platform designed to provide a seamless shopping experience with the tagline "Buy! What’s you Need?". This project is a fully functional online store built using HTML, CSS, and JavaScript, featuring a responsive design, product filtering, a shopping cart, and a checkout process.
🚀 Project Overview
MJ Shopping allows users to browse products across various categories (Men's, Women's, Children's, Gifts, and Accessories), filter them by price and category, add items to a cart, and proceed to checkout. The website includes a carousel for promotions, a "New Arrivals" section, discount offers, and an "About" page with a feedback form. It’s styled with Tailwind CSS and custom CSS for a modern, user-friendly interface.
Key Features

Responsive Design: Works seamlessly on desktop, tablet, and mobile devices.
Product Filtering: Filter products by category, price, and search terms.
Shopping Cart: Add, update, and remove items with a persistent cart using localStorage.
Checkout Process: Includes payment method selection (Credit Card, PayPal, Cash on Delivery).
Carousel: Displays promotional images with navigation controls.
Authentication: Basic login/signup functionality (simulated).
Feedback Form: Users can submit feedback on the About page.

🛠️ Setup Instructions
Prerequisites

A modern web browser (e.g., Chrome, Firefox, Safari).
A local server to run the project (e.g., VS Code Live Server, Node.js http-server, or Python’s HTTP server).

Installation

Clone the Repository:
git clone https://github.com/your-username/mj-shopping.git
cd mj-shopping


Directory Structure:Ensure the following structure is in place:
mj-shopping/
├── css/
│   └── styles.css
├── js/
│   └── script.js
├── images/
│   ├── carousel/
│   │   ├── d197f3d63e273b6f5c105412b799eae6.jpeg
│   │   ├── hd-wallpaper-laptop-red-sunset-background-laptop.jpg
│   │   └── pexels-sebastians-750225.jpg
│   ├── products/
│   │   ├── mens_jacket.jpg
│   │   ├── womens_dress.jpg
│   │   ├── childrens_toy.jpg
│   │   └── (other product images)
│   └── about/
│       └── mj_shopping_logo.jpg
├── index.html
└── README.md

Note: Ensure all images are placed in the correct directories, as the project references them directly.

Run a Local Server:

Using VS Code:
Open the project in VS Code.
Install the "Live Server" extension.
Right-click index.html and select "Open with Live Server".


Using Node.js:
Install http-server globally:npm install -g http-server


Run the server:http-server


Open http://localhost:8080 in your browser.


Using Python:
Run:python -m http.server 8000


Open http://localhost:8000 in your browser.




Clear Browser Cache (if needed):

If styles or scripts don’t load correctly, clear your browser cache:
Chrome: Settings > Privacy and Security > Clear Browsing Data > Cached images and files.
Firefox: Settings > Privacy & Security > Cookies and Site Data > Clear Data.
Safari: History > Clear History (select "All History").





📂 File Structure & Purpose

index.html: The main HTML file containing the structure of the website, including sections for Home, Products, Cart, Checkout, and About.
css/styles.css: Custom CSS for styling the website, including product cards, carousel, and responsive layouts. Uses Tailwind CSS for base styling.
js/script.js: JavaScript file handling dynamic functionality like product filtering, cart management, carousel navigation, and form submissions.
images/: Directory containing all images used in the project:
carousel/: Promotional images for the homepage carousel.
products/: Product images for the catalog.
about/: Logo for the About page.



🌟 Usage

Home Page:

View the carousel with promotional images.
Browse "New Arrivals," "Discount Offers," and "All Products."
Click on a product card to view details in a modal and add to cart.


Products Page:

Filter products by category (Men’s, Women’s, etc.), price, or search terms.
Add products to the cart.


Cart Page:

View items in the cart, update quantities, or remove items.
Proceed to checkout.


Checkout Page:

Enter delivery details and select a payment method.
Submit the order (simulated with an alert).


About Page:

Learn about MJ Shopping and submit feedback via the form.



🎨 Styling Notes

Tailwind CSS: Used for responsive layouts, utility classes, and consistent styling.
Custom CSS: Enhances Tailwind with specific styles (e.g., product card height, carousel image sizing).
Product Cards: Fixed height (400px on desktop) with uniform image sizing using image-wrapper.
Carousel Images: Set to 650px height with object-fit: contain to ensure full visibility.

🐛 Known Issues

Image Loading: Ensure all images are in the correct directories (images/carousel/, images/products/, etc.). Missing images will break the layout.
Browser Cache: Styles may not update if the browser cache isn’t cleared after changes.
Product Card Heights: If images or text overflow, cards may appear uneven (mitigated with overflow: hidden and line-clamp).

🤝 Contributing

Fork the repository.
Create a new branch (git checkout -b feature/your-feature).
Make your changes and commit (git commit -m "Add your feature").
Push to your branch (git push origin feature/your-feature).
Open a Pull Request.

📜 License
This project is licensed under the MIT License. See the LICENSE file for details.
📧 Contact
For questions or support, reach out to:

Email: support@mjshopping.com
GitHub Issues: Create an issue


Happy Shopping with MJ Shopping! 🛍️
