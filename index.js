const express = require("express");
const connection = require("./config/db");
const app = express();
const userRouter = require("./routes/userRoutes");
const productRouter = require("./routes/productRouters");
const categoryRouter = require("./routes/categoryRouters");
const cartRouter = require("./routes/catrRouters");
const { authentication } = require("./middelwares/authentication");
const cors = require("cors");

app.use(
  cors({
    origin: "*",
    methods: "*",
    allowedHeaders: "*",
  })
);

app.use(express.json());

app.use("/user", userRouter);
app.use("/product", productRouter);
app.use("/category", categoryRouter);
app.use(authentication);
app.use("/cart", cartRouter);

PORT = 9091;
app.listen(PORT, async () => {
  try {
    await connection();
    console.log("DB connection successfully");
    console.log(`server run on ${PORT} number`);
  } catch (error) {
    console.log("error", error);
    console.log("Failed to connect DB");
  }
});
