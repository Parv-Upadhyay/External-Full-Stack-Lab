const bcrypt = require('bcryptjs');
const db = require('../db');

class User {
  constructor(data) {
    this.username = data.username;
    this.password = data.password;
    this.fullName = data.fullName;
    this.country = data.country;
    this.dietaryPreference = data.dietaryPreference;
    this._id = data._id || Date.now().toString(); // simple id
  }

  async save() {
    if (!this.password.startsWith('$2a$')) { // not hashed
      this.password = await bcrypt.hash(this.password, 12);
    }
    const existingIndex = db.data.users.findIndex(u => u._id === this._id);
    if (existingIndex >= 0) {
      db.data.users[existingIndex] = this;
    } else {
      db.data.users.push(this);
    }
    db.write();
    return this;
  }

  static findByUsername(username) {
    return db.data.users.find(u => u.username === username);
  }

  static findById(id) {
    return db.data.users.find(u => u._id === id);
  }

  async comparePassword(candidatePassword) {
    return await bcrypt.compare(candidatePassword, this.password);
  }

  static async register(user, password) {
    const hashedPassword = await bcrypt.hash(password, 12);
    const newUser = new User({
      username: user.username,
      password: hashedPassword,
      fullName: user.fullName,
      country: user.country,
      dietaryPreference: user.dietaryPreference,
      _id: Date.now().toString()
    });
    db.data.users.push(newUser);
    db.write();
    return newUser;
  }
}

module.exports = User;