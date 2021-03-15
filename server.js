const express = require("express");
const logger = require("morgan");
const mongoose = require("mongoose");

const PORT = process.env.PORT || 3000;


const app = express();

app.use(logger("dev"));

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname + "./public/index.html"));
});

mongoose.connect(process.env.MONGODB_URI || "mongodb://localhost/fitness", { useNewUrlParser: true });

app.use(require("./routes/api"));
// require('./routes/api-routes')(app)
// require('./routes/html-routes')(app)

app.listen(PORT, () => {
  console.log(`App running on port ${PORT}!`);
});