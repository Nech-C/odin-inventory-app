#! /usr/bin/env node

console.log(
    'This script populates some test items and categories to your database. Specified database as argument - e.g.: node populatedb "mongodb+srv://cooluser:coolpassword@cluster0.lz91hw2.mongodb.net/local_library?retryWrites=true&w=majority"'
  );
  
  // Get arguments passed on command line
  const userArgs = process.argv.slice(2);
  
  const Category = require("./models/category");
  const Item = require("./models/item");
  
  const categories = [];
  const items = [];
  
  const mongoose = require("mongoose");
  mongoose.set("strictQuery", false);
  
  const mongoDB = userArgs[0];
  
  main().catch((err) => console.log(err));
  
  async function main() {
    console.log("Debug: About to connect");
    await mongoose.connect(mongoDB);
    console.log("Debug: Should be connected?");
    await createCategories();
    await createItems();
    console.log("Debug: Closing mongoose");
    mongoose.connection.close();
  }
  
  async function categoryCreate(index, name, description) {
    const category = new Category({ name: name, description: description });
    await category.save();
    categories[index] = category;
    console.log(`Added category: ${name}`);
  }
  
  async function itemCreate(index, name, description, price, num_in_stock, category) {
    const itemdetail = {
      name: name,
      price: price,
      num_in_stock: num_in_stock,
      category: category,
    };
    if (description != false) itemdetail.description = description;
  
    const item = new Item(itemdetail);
    await item.save();
    items[index] = item;
    console.log(`Added item: ${name}`);
  }
  
  async function createCategories() {
    console.log("Adding categories");
    await Promise.all([
      categoryCreate(0, "Electronics", "Electronic devices and gadgets"),
      categoryCreate(1, "Clothing", "Apparel for men, women, and children"),
      categoryCreate(2, "Home & Kitchen", "Products for home and kitchen"),
      categoryCreate(3, "Books", "Books from various genres"),
      categoryCreate(4, "Sports & Outdoors", "Products for sports and outdoor activities"),
    ]);
  }
  
  async function createItems() {
    console.log("Adding Items");
    await Promise.all([
      itemCreate(0, "Smartphone", "Latest smartphone with advanced features", 799.99, 50, categories[0]),
      itemCreate(1, "Laptop", "High-performance laptop for work and entertainment", 1299.99, 30, categories[0]),
      itemCreate(2, "Headphones", "Wireless noise-cancelling headphones", 249.99, 100, categories[0]),
      itemCreate(3, "Smartwatch", "Fitness tracker and smartwatch", 199.99, 75, categories[0]),
      itemCreate(4, "T-Shirt", "Cotton t-shirt with graphic print", 24.99, 200, categories[1]),
      itemCreate(5, "Jeans", "Denim jeans with straight leg", 59.99, 150, categories[1]),
      itemCreate(6, "Dress", "Floral summer dress", 79.99, 80, categories[1]),
      itemCreate(7, "Sneakers", "Running shoes with cushioning", 99.99, 120, categories[1]),
      itemCreate(8, "Cookware Set", "10-piece stainless steel cookware set", 149.99, 40, categories[2]),
      itemCreate(9, "Coffee Maker", "Programmable coffee maker with timer", 89.99, 60, categories[2]),
      itemCreate(10, "Blender", "High-speed blender for smoothies", 69.99, 90, categories[2]),
      itemCreate(11, "Comforter Set", "King size comforter set with pillow shams", 129.99, 25, categories[2]),
      itemCreate(12, "Novel", "Bestselling fiction novel", 19.99, 500, categories[3]),
      itemCreate(13, "Cookbook", "Collection of healthy recipes", 29.99, 200, categories[3]),
      itemCreate(14, "Biography", "Biography of a famous historical figure", 24.99, 150, categories[3]),
      itemCreate(15, "Children's Book", "Illustrated children's storybook", 14.99, 300, categories[3]),
      itemCreate(16, "Yoga Mat", "Non-slip yoga mat for exercise", 34.99, 175, categories[4]),
      itemCreate(17, "Hiking Backpack", "Waterproof hiking backpack with multiple compartments", 99.99, 80, categories[4]),
      itemCreate(18, "Tennis Racket", "Lightweight tennis racket for beginners", 79.99, 100, categories[4]),
      itemCreate(19, "Soccer Ball", "Professional soccer ball", 29.99, 200, categories[4]),
    ]);
  }