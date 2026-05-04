const db = require('../db');

class Recipe {
  constructor(data) {
    this.dishName = data.dishName;
    this.ingredients = data.ingredients;
    this.cookingTime = data.cookingTime;
    this.difficulty = data.difficulty;
    this.instructions = data.instructions;
    this.user = data.user;
    this._id = data._id || Date.now().toString();
    this.createdAt = data.createdAt || new Date();
  }

  async save() {
    const existingIndex = db.data.recipes.findIndex(r => r._id === this._id);
    if (existingIndex >= 0) {
      db.data.recipes[existingIndex] = this;
    } else {
      db.data.recipes.push(this);
    }
    db.write();
    return this;
  }

  static find(query = {}) {
    let recipes = db.data.recipes;
    if (query.user) {
      recipes = recipes.filter(r => r.user === query.user);
    }
    return recipes;
  }

  static findById(id) {
    return db.data.recipes.find(r => r._id === id);
  }

  static async findByIdAndDelete(id) {
    const index = db.data.recipes.findIndex(r => r._id === id);
    if (index >= 0) {
      db.data.recipes.splice(index, 1);
      db.write();
    }
  }
}

module.exports = Recipe;