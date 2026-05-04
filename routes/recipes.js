const express = require('express');
const Recipe = require('../models/recipe');
const User = require('../models/user');
const { isLoggedIn } = require('../middleware'); // assume middleware for auth
const router = express.Router();

// Index
router.get('/', async (req, res) => {
  const recipes = Recipe.find();
  // Populate user manually
  const populatedRecipes = recipes.map(r => {
    const user = User.findById(r.user);
    return { ...r, user };
  });
  res.render('recipes/index', { recipes: populatedRecipes });
});

// New
router.get('/new', isLoggedIn, (req, res) => {
  res.render('recipes/new');
});

// Create
router.post('/', isLoggedIn, async (req, res) => {
  const { dishName, ingredients, cookingTime, difficulty, instructions } = req.body;
  const recipe = new Recipe({
    dishName,
    ingredients,
    cookingTime: parseInt(cookingTime),
    difficulty,
    instructions,
    user: req.user._id
  });
  await recipe.save();
  req.flash('success', 'Recipe created successfully!');
  res.redirect('/recipes');
});

// Show
router.get('/:id', async (req, res) => {
  const recipe = Recipe.findById(req.params.id);
  if (!recipe) {
    req.flash('error', 'Recipe not found.');
    return res.redirect('/recipes');
  }
  const user = User.findById(recipe.user);
  res.render('recipes/show', { recipe: { ...recipe, user } });
});

// Edit
router.get('/:id/edit', isLoggedIn, async (req, res) => {
  const recipe = Recipe.findById(req.params.id);
  if (!recipe) {
    req.flash('error', 'Recipe not found.');
    return res.redirect('/recipes');
  }
  if (recipe.user !== req.user._id) {
    req.flash('error', 'You do not have permission to edit this recipe.');
    return res.redirect('/recipes');
  }
  res.render('recipes/edit', { recipe });
});

// Update
router.put('/:id', isLoggedIn, async (req, res) => {
  const recipe = Recipe.findById(req.params.id);
  if (recipe.user !== req.user._id) {
    req.flash('error', 'You do not have permission to edit this recipe.');
    return res.redirect('/recipes');
  }
  const { ingredients, cookingTime, difficulty, instructions } = req.body;
  recipe.ingredients = ingredients;
  recipe.cookingTime = parseInt(cookingTime);
  recipe.difficulty = difficulty;
  recipe.instructions = instructions;
  await recipe.save();
  req.flash('success', 'Recipe updated successfully!');
  res.redirect(`/recipes/${recipe._id}`);
});

// Delete
router.delete('/:id', isLoggedIn, async (req, res) => {
  const recipe = Recipe.findById(req.params.id);
  if (recipe.user !== req.user._id) {
    req.flash('error', 'You do not have permission to delete this recipe.');
    return res.redirect('/recipes');
  }
  await Recipe.findByIdAndDelete(req.params.id);
  req.flash('success', 'Recipe deleted successfully!');
  res.redirect('/recipes');
});

module.exports = router;