const Item = require("../models/item");
const Category = require("../models/category");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");


exports.category_create_get = asyncHandler(async (req, res, next) => {
    res.render("category_form", {title: "Create Category"});
});

exports.category_create_post = [
    body("category_name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Category name must be specified.")
        .isAlphanumeric()
        .withMessage("Category name has non-alphanumeric characters."),
    body("category_description")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Category description must be specified.")
        .isAlphanumeric()
        .withMessage("Category description has non-alphanumeric characters."),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            res.render("category_form", {
                title: "Create Category",
                category_name: req.body.category_name,
                category_description: req.body.category_description,
                errors: errors.array(),
            });
            return;
        } else {
            const category = new Category({
                name: req.body.category_name,
                description: req.body.category_description,
            });
            await category.save();
            res.redirect(category.url);
        }
    })
];

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

