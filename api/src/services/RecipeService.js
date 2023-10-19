// Import any required models here
const Recipe = require('../models/Recipe');

// Define your service methods
exports.getRecipes = async () => {
  return await Recipe.find();
};

exports.saveRecipe = async (title, description) => {
  const newRecipe = new Recipe({
    title,
    description
  });

  return await newRecipe.save();
};

exports.deleteWithEmptyTitle = async () => {
  return await Recipe.deleteMany({ description: null });
}