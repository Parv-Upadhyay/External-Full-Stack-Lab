const { LowSync } = require('lowdb');
const { JSONFileSync } = require('lowdb/node');
const path = require('path');

const file = path.join(__dirname, 'db.json');
const adapter = new JSONFileSync(file);
const defaultData = { users: [], recipes: [] };
const db = new LowSync(adapter, defaultData);

db.read();

module.exports = db;