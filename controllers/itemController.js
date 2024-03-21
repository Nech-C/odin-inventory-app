const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.index = asyncHandler(async (req, res, next) => {
    const itemCount = await Item.countDocuments({}).exec();
    const categoryCount = await Category.countDocuments({}).exec();
    res.render("index", {
        title: "Inventory Home",
        itemCount: itemCount,
        categoryCount: categoryCount,
    });
});

exports.item_list = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item list");
});

exports.item_detail = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item detail");
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item create GET");
});

exports.item_create_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item create POST");
});

exports.item_update_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update GET");
});

exports.item_update_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item update POST");
});

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete GET");
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    res.send("NOT IMPLEMENTED: Item delete POST");
});