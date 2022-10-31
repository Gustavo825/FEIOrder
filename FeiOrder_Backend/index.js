import express from "express";
import authRoutes from "./routes/auth.route.js";
import dishRoutes from "./routes/dish.route.js";
import orderRoutes from "./routes/order.route.js";
import "./database/connectDB.js";
import cookieParser from "cookie-parser";
import cors from "cors";
const whiteList = [process.env.ORIGIN1];
const app = express();
const port = process.env.PORT || 5006;
app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || whiteList.includes(origin)) {
        return callback(null, origin);
      }
      return callback("Error" + origin + " no autorizado");
    },
    credentials: true,
  })
);

app.use(express.json());
app.use(cookieParser());
app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/dish", dishRoutes);
app.use("/api/v1/order", orderRoutes);
app.listen(port, () => console.log("http://localhost:" + port));
