# GlowUp – Your Ultimate Makeup Discovery App

GlowUp is a responsive and interactive single-page web application that allows users to discover, filter, and save their favorite makeup products. Built using HTML, CSS (with Bootstrap), and JavaScript, it fetches real-time data from the Makeup API
 and allows wishlist persistence via json-server.

# Features
🔍 Search and filter by brand, product type, or name.
💄 View detailed product info including image, price, and description.
❤️ Add products to a wishlist, saved locally via json-server.
📱 Responsive design powered by Bootstrap.
🔄 Fully asynchronous data fetching and UI rendering.

# Tech Stack
# Tech	Description
  HTML	Semantic structure
  CSS	Custom + Bootstrap 5 for layout and responsiveness
  JavaScript	App logic, DOM manipulation, fetch API
  Makeup API	Public product data
  json-server	Local REST API to persist wishlist

# Project Structure
glowup/
│
├── index.html          # Main single-page HTML
├── styles.css          # Custom styles + Bootstrap overrides
├── script.js           # App logic (fetch, filter, wishlist)
├── db.json             # json-server storage for wishlist
└── README.md           # This file

# Installation & Setup
1. Clone the Repository
git clone https://github.com/yourusername/glowup.git
cd glowup

3. Install json-server
npm install -g json-server

3. Start the Backend
json-server --watch db.json

4. Open the App
Just open index.html in your browser (no server needed for frontend).

# API Used
Makeup API
URL: https://makeup-api.herokuapp.com/api/v1/products.json
Provides public access to makeup products by type, brand, and more.

# Example User Stories
As a user, I want to browse makeup products by type.
As a user, I want to filter by brand and price.
As a user, I want to view detailed product info.
As a user, I want to save items to a wishlist and view them later.

# Future Improvements
Persist wishlist with user accounts.
Add dark/light theme toggle.
Add pagination or infinite scrolling.
Deploy app to GitHub Pages or Netlify.

# License
This project is open-source and free to use under the MIT License.

# Author
Kevine Owino





