const cors = require("cors");
const express = require("express");
const movieRoutes = require("./routes/movie");

const app = express();

// use cors to communicate with front-end react
app.use(
  cors({
    origin: true,
    credentials: true,
  })
);
app.use(express.json());

// use movie routes 
app.use('/api/movies',movieRoutes);

// Return error message when user access wrong route
app.use((req, res, next)=>{
  res.status(404).send({message: "Route not found"})
})

// start server listen on port 3001
app.listen(3001);
