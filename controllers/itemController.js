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
    const items = await Item.find({}).populate("category", "name -_id").exec();
    res.render("item_list", { title: "Item List", items: items });

});

exports.item_detail = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).populate("category").exec();
    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_detail", { title: item.name, item: item });
});

exports.item_create_get = asyncHandler(async (req, res, next) => {
    const categories = await Category.find().exec();
    res.render("item_form", { title: "Create Item", categories: categories });
});

exports.item_create_post = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified.")
        .isAlphanumeric()
        .withMessage("Name has non-alphanumeric characters."),
    body("description")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Description must be specified.")
        .isAlphanumeric()
        .withMessage("Description has non-alphanumeric characters."),
    body("category")
        .isLength({ min: 1 })
        .escape()
        .withMessage("Category must be specified.")
        .isAlphanumeric()
        .withMessage("Category has non-alphanumeric characters."),
    body("price")
        .isNumeric()
        .escape()
        .withMessage("Price must be a number.")
        .custom((value) => value > 0)
        .withMessage("Price must be greater than 0."),
    body("stock")
        .isNumeric()
        .escape()
        .withMessage("Stock must be a number.")
        .custom((value) => value >= 0)
        .withMessage("Stock must be greater than or equal to 0."),
    asyncHandler(async (req, res, next) => {
        const errors = validationResult(req);
        const categories = await Category.find().exec();
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            num_in_stock: req.body.stock,
        });

        console.log(item);
        console.log(item.category)

        if (!errors.isEmpty()) {
            res.render("item_form", {
                title: "Create Item",
                item: item,
                categories: categories,
                errors: errors.array(),
            });
            return;
        } else {
            await item.save();
            res.redirect(item.url);
        }
    })
]

exports.item_update_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();
    const categories = await Category.find().exec();
    if (item === null) {
        const err = new Error("Item not found");
        err.status = 404;
        return next(err);
    }

    res.render("item_form", {
        title: "Update Item",
        item: item,
        categories: categories,
    });
});

exports.item_update_post = [
    body("name")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Name must be specified.")
        .isAlphanumeric()
        .withMessage("Name has non-alphanumeric characters."),
    body("description")
        .trim()
        .isLength({ min: 1 })
        .escape()
        .withMessage("Description must be specified.")
        .isAlphanumeric()
        .withMessage("Description has non-alphanumeric characters."),
    body("category")
        .isLength({ min: 1 })
        .escape()
        .withMessage("Category must be specified.")
        .isAlphanumeric()
        .withMessage("Category has non-alphanumeric characters."),
    body("price")
        .isNumeric()
        .escape()
        .withMessage("Price must be a number.")
        .custom((value) => value > 0)
        .withMessage("Price must be greater than 0."),
    body("stock")
        .isNumeric()
        .escape()
        .withMessage("Stock must be a number.")
        .custom((value) => value >= 0)
        .withMessage("Stock must be greater than or equal to 0."),
    asyncHandler(async (req, res, next) => {
        errors = validationResult(req);
        const categories = await Category.find().exec();
        const item = new Item({
            name: req.body.name,
            description: req.body.description,
            category: req.body.category,
            price: req.body.price,
            num_in_stock: req.body.stock,
            _id: req.params.id,
        });

        if (!errors.isEmpty()) {
            res.render("item_form", {
                title: "Update Item",
                item: item,
                categories: categories,
                errors: errors.array(),
            });
            return;
        } else {
            const updatedItem = await Item.findByIdAndUpdate(req.params.id, item, {new: true});
            res.redirect(updatedItem.url);
        }
    })
]

exports.item_delete_get = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();
    if (item === null) {
        res.redirect("/inventory/items");
    }
    res.render("item_delete", { title: "Delete Item", item: item });
});

exports.item_delete_post = asyncHandler(async (req, res, next) => {
    const item = await Item.findById(req.params.id).exec();
    if (item === null) {
        res.redirect("/inventory/items");
    }

    await Item.findByIdAndRemove(req.body.itemid);
    res.redirect("/inventory/items");
});