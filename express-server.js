const express = require("express");
const app = express();

const middleware1 = async (req, res, next) => {
  console.log("express middleware1 in");
  await next();
  console.log("express middleware1 out");
};

const middleware2 = async (req, res, next) => {
  console.log("express middleware2 in");
  await next();
  console.log("express middleware2 out");
};

app.use(middleware1);

app.use(middleware2);

app.all("*", (req, res) => {
  console.log("express11111111111");
  res.json({ msg: "hello world" });
});

app.listen(3000);
