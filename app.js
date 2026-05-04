const express = require('express');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const methodOverride = require('method-override');
const flash = require('connect-flash');
const User = require('./models/user');
const { isLoggedIn } = require('./middleware');
const userRoutes = require('./routes/users');
const recipeRoutes = require('./routes/recipes');

const app = express();

// EJS
app.set('view engine', 'ejs');
app.set('views', 'views');

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(methodOverride('_method'));
app.use(session({
  secret: 'secretkey', // change in production
  resave: false,
  saveUninitialized: false
}));
app.use(flash());

// Passport
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(async (username, password, done) => {
  try {
    const user = User.findByUsername(username);
    if (!user) return done(null, false, { message: 'Incorrect username.' });
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return done(null, false, { message: 'Incorrect password.' });
    return done(null, user);
  } catch (err) {
    return done(err);
  }
}));
passport.serializeUser((user, done) => done(null, user._id));
passport.deserializeUser((id, done) => {
  const user = User.findById(id);
  done(null, user);
});

// Global variables
app.use((req, res, next) => {
  res.locals.currentUser = req.user;
  res.locals.success = req.flash('success');
  res.locals.error = req.flash('error');
  next();
});

// Routes
app.get('/', (req, res) => res.redirect('/recipes'));
app.use('/', userRoutes);
app.use('/recipes', recipeRoutes);

// Alias routes for expected path names
app.get('/recipe/new', isLoggedIn, (req, res) => {
  res.render('recipes/new');
});

app.post('/recipe', isLoggedIn, async (req, res) => {
  const { dishName, ingredients, cookingTime, difficulty, instructions } = req.body;
  const Recipe = require('./models/recipe');
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

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));