const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create GET");
});

exports.category_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category create POST");
});

exports.category_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete GET");
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category delete POST");
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update GET");
});

exports.category_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category update POST");
});

exports.category_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Category detail");
});

exports.category_list = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}).exec();
    res.render("category_list", { title: "Category List", categories: categories });
});

