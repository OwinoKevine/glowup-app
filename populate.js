// populate.js

const axios = require("axios");
const fs = require("fs");

const API_URL = "https://makeup-api.herokuapp.com/api/v1/products.json";

async function populateDB() {
  try {
    const response = await axios.get(API_URL);
    const products = response.data;

    // Structure the db.json content
    const dbData = {
      wishlist: products.slice(0, 100) // You can fetch all or limit to first 100
    };

    // Write to db.json
    fs.writeFileSync("db.json", JSON.stringify(dbData, null, 2));
    console.log("✅ db.json has been populated with products.");
  } catch (error) {
    console.error("❌ Failed to fetch or write products:", error);
  }
}

populateDB();
