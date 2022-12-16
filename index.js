let express = require("express");
let axios = require("axios");
let jwt = require("jsonwebtoken");
require("dotenv").config();
let PORT = process.env.PORT || 3000;
let app = express();
app.use(express.json());

app.post("/signin", (req, res) => {
  axios.get("https://6393561fab513e12c50b63b8.mockapi.io/api/wallet").then(function (response) {
    let users = response.data;
    for (let i of users) {
      if (i.username == req.body.username || i.email == req.body.username) {
        const token = jwt.sign({ username: i.username }, process.env.JWT_KEY, {
          expiresIn: 900,
        });
        res.status(200).json({ token });
        return;
      }
    }
    res.status(404).send("Username does not exist.");
  });
});
app.post("/verify", (req, res) => {
  jwt.verify(req.body.jwt, process.env.JWT_KEY, (err, resp) => {
    if (err) return res.status(401).send(err);
    return res.send("Successfully Verified");
  });
});
app.all("*", (req, res) => {
  res.send("Hi there!");
});

app.listen(PORT);
