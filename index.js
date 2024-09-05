const express = require("express");
var expressLayouts = require("express-ejs-layouts");
const bodyParser = require("body-parser");
const app = express();
const db = require("./queries");
const passport = require("passport");
const session = require("express-session");
const UserDetails = require("./userDetails");
const routes = require("./routes/router");
require("dotenv").config();
const port = 3000;

app.use(expressLayouts);
app.set("layout", "./layout/main");
app.set("view engine", "ejs");
app.use(bodyParser.json());
app.use(
  bodyParser.urlencoded({
    extended: true,
  })
);

// Set up Passport
app.use(passport.initialize());
app.use(passport.session());

passport.use(UserDetails.createStrategy());
passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());

UserDetails.register({ username: "nemo", active: false }, "123");

app.get("/", (request, response) => {
  response.json({ info: "Node.js, Express, and Postgres API" });
});

app.get("/users", db.getUsers);
app.get("/users/:id", db.getUserById);
app.post("/users", db.createUser);
app.put("/users/:id", db.updateUser);
app.delete("/users/:id", db.deleteUser);

app.listen(port, () => {
  console.log(`App running on port ${port}.`);
});
