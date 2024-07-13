const Koa = require("koa");
const app = new Koa();

const middleware1 = async (ctx, next) => {
  console.log("koa middleware1 in");
  await next();
  console.log("koa middleware1 out");
};

const middleware2 = async (ctx, next) => {
  console.log("koa middleware2 in");
  await next();
  console.log("koa middleware2 out");
};

app.use(middleware1);

app.use(middleware2);

app.use(async (ctx) => {
  console.log("koa 2222222222222222");
  ctx.body = { msg: "hello world" };
});

app.listen(3001);
