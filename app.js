express = require('express');
app = express();

mainController = require('./controller/mainController');

const session = require("express-session");
const passport = require("passport");
const LocalStrategy = require('passport-local').Strategy;

const path = require('node:path');

//using EJS
app.set('view engine', 'ejs');
app.set("views", path.join(__dirname, "view"));
app.use(express.static(path.join(__dirname, "public")));

app.use(express.urlencoded({ extended: true }));

app.use(session({
    secret: "dogs",
    saveUninitialized: false,
    resave: false
}));
app.use(passport.session());

//Middleware
app.get('/', mainController.getAllAnimes);

app.get('/add', mainController.createAnimeGet);
app.post('/add', mainController.createAnimePost);

app.delete('/delete/:name', mainController.deleteAnime);


//Sign up
app.get("/sign-up", mainController.signUpGet);
app.post("/sign-up", mainController.signUpPost);
//Log in
app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);




passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const { rows } = await pool.query("SELECT * FROM users WHERE username = $1", [username]);
      const user = rows[0];

      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      if (user.password !== password) {
        return done(null, false, { message: "Incorrect password" });
      }
      return done(null, user);
    } catch(err) {
      return done(err);
    }
  })
);


passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
  try {
    const { rows } = await pool.query("SELECT * FROM users WHERE id = $1", [id]);
    const user = rows[0];

    done(null, user);
  } catch(err) {
    done(err);
  }
});

app.post(
  "/log-in",
  passport.authenticate("local", {
    successRedirect: "/",
    failureRedirect: "/",
    failureMessage: true,
  })
);



app.listen(3000, () => {
    console.log("Server running on port 3000");
})