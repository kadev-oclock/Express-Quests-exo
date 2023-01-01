require ("dotenv").config();
const express = require("express");

const app = express();

const port = 3000;

const welcome = (req, res) => {
  res.send("Welcome to my favourite movie list");
};



//const { hashPassword } = require("./auth.js");
const movieHandlers = require("./movieHandlers");
const userHandlers = require("./userHandlers");
const { validateMovie,validateUser } = require("./validators.js");



app.use(express.json());
app.get("/", welcome);


app.post("/api/movies", validateMovie, movieHandlers.postMovie);
app.get("/api/movies", movieHandlers.getMovies);
app.get("/api/movies/:id", movieHandlers.getMovieById);
app.put("/api/movies/:id", validateMovie, movieHandlers.updateMovie);
app.delete("/api/movies/:id", movieHandlers.deleteMovie);


app.get("/api/users", userHandlers.getUsers); 
app.get("/api/users/:id", userHandlers.getUserById); 
app.post("/api/users", validateUser,userHandlers.postUser);
app.put("/api/users/:id", validateUser, userHandlers.updateUser);
app.delete("/api/users/:id", userHandlers.deleteUser);

app.listen(port, (err) => {
  if (err) {
    console.error("Something bad happened");
  } else {
    console.log(`Server is listening on ${port}`);
  }
});
