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