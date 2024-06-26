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
    const category = await Category.findById(req.params.id).exec();
    if (category === null) {
        res.redirect("/inventory/categories");
    }
    const itemsInCategory = await Item.find({ category: req.params.id }).exec();
    res.render("category_delete", { title: "Delete Category", itemsInCategory: itemsInCategory});
});

exports.category_delete_post = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    if (category === null) {
        res.redirect("/inventory/categories");
    }
    const itemsInCategory = await Item.find({ category: req.params.id }).exec();
    if (itemsInCategory.length > 0) {
        res.render("category_delete", { title: "Delete Category", itemsInCategory: itemsInCategory });
        return;
    } else {
        await Category.findByIdAndDelete(req.params.id).exec();
        res.redirect("/inventory/categories");
    }
});

exports.category_update_get = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    if (category === null) {
        res.redirect("/inventory/categories");
    }
    res.render("category_form", { title: "Update Category", category: category });
});

exports.category_update_post = [
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
                title: "Update Category",
                category_name: req.body.category_name,
                category_description: req.body.category_description,
                errors: errors.array(),
            });
            return;
        } else {
            const category = new Category({
                name: req.body.category_name,
                description: req.body.category_description,
                _id: req.params.id,
            });
            await Category.findByIdAndUpdate(req.params.id, category, {}).exec();
            res.redirect(category.url);
        }
    })
];

exports.category_detail = asyncHandler(async (req, res, next) => {
    const category = await Category.findById(req.params.id).exec();
    if (category === null) {
        res.redirect("/inventory/categories");
    }
    const itemsInCategory = await Item.find({ category: req.params.id }).exec();
    res.render("category_detail", { title: "Category Detail", category: category, itemsInCategory: itemsInCategory });
});

exports.category_list = asyncHandler(async (req, res, next) => {
    const categories = await Category.find({}).exec();
    res.render("category_list", { title: "Category List", categories: categories });
});

