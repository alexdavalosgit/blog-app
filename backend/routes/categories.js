const router = require('express').Router();
const Category = require('../models/Category');

// Create new category
router.post("/", async (req, res) => {
    const newCategory = new Category(req.body);
    try {
        const savedCategory = await newCategory.save();
        res.status(200).json(savedCategory);
    } catch (error) {
        res.status(500).json(error);
    }
});

// Get category
router.get("/:id", async (req, res) => {
    try {
        const cat = await Category.findById(req.params.id);
        res.status(200).json(cat);
    } catch (error) {
        res.status(500).json(error);
    }
})

// Get all categories
router.get("/", async (req, res) => {
    try {
        const allCats = await Category.find();
        res.status(200).json(allCats);
    } catch (error) {
        res.status(500).json(error);
    }
})

module.exports = router