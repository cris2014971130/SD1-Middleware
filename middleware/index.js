const express = require("express");
const app = express();
const port = 2000;

const hbs = require("hbs");

hbs.registerPartials(__dirname + "/views/partials");
app.set("view engine", "hbs");

app.get("/", (req, res) => {
  res.render("index", {
    hour: 12,
    date: "12/21",
  });
});

app.listen(port, () => {
  console.log(`Middlewar -> ${port}`);
});
