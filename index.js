const express = require("express");
const app = express();
const videoRoutes = require("./routes/videos");
const cors = require("cors");
require("dotenv").config();
const PORT = process.env.PORT;

//middleware

app.use(express.json());
app.use(express.static("public"));
app.use(cors());

//custom middleware

app.use((req, res, next) => {
  console.log("incoming request");
  next();
});
app.use("/", videoRoutes);

//home route

app.get("/", (req, res) => {
  res.send("welcome to my brainflix api");
});

app.listen(PORT, (err) => {
  err ? console.log(err) : console.log(`listening on port ${PORT}`);
});
