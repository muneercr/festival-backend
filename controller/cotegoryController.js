const Category = require("../model/category");

const addCategory = (req, res, next) => {
    let category = new Category({
        category: req.body.category, 
    });
    category.save().then((category) => {
        res.json({
            category
        });
    });
};

const getCategory = async (req, res, next) => {
    try {
        const data = await Category.find({});
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({
                message: "No categories found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const getAllCategories = async (req, res) => {
    try {
        const data = await Category.find({});
        if (data.length > 0) {
            res.json(data);
        } else {
            res.json({
                message: "No categories found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const getCategoryById = async (req, res) => {
    const categoryId = req.params.id; // Assuming you pass the category ID as a route parameter

    try {
        const category = await Category.findById(categoryId);

        if (category) {
            res.json({
                message: "Category found successfully",
                category,
            });
        } else {
            res.json({
                message: "Category not found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const editCategoryById = async (req, res) => {
    const categoryId = req.params.id; // Assuming you pass the category ID as a route parameter

    try {
        const updatedCategory = await Category.findByIdAndUpdate(categoryId, {
            category: req.body.category, 
        }, { new: true });

        if (updatedCategory) {
            res.json({
                message: "Category updated successfully",
                category: updatedCategory,
            });
        } else {
            res.json({
                message: "Category not found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

const deleteCategoryById = async (req, res) => {
    const categoryId = req.params.id; // Assuming you pass the category ID as a route parameter

    try {
        const deletedCategory = await Category.findByIdAndDelete(categoryId);

        if (deletedCategory) {
            res.json({
                message: "Category deleted successfully",
                category: deletedCategory,
            });
        } else {
            res.json({
                message: "Category not found",
            });
        }
    } catch (error) {
        res.json({
            error: error.message,
        });
    }
};

module.exports = {
    addCategory,
    getCategory,
    getAllCategories,
    getCategoryById,
    editCategoryById,
    deleteCategoryById
};
