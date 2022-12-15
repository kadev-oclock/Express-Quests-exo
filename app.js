require ("dotenv").config();
const express = require("express");

const app = express();

const port = 3000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};

const { hashPassword } = require("./auth.js");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");


app.use(express.json());
app.get("/", welcome);


app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);


app.get("/api/users", userHandlers.getUsers); 
app.get("/api/users/:id", userHandlers.getUserById); 
app.post("/api/users", hashPassword, userHandlers.postUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
