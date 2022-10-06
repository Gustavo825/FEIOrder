import express from "express";
import morgan from "morgan";
import cors from "cors";
import path from "path";
const app = express();

//Conexion BD
const mongoose = require("mongoose");
const uri = "mongodb://localhost:27017/myapp";
const options = { useNewUrlParser: true };
mongoose.connect(uri, options).then(
  () => {
    console.log("Conectado a DB");
  },
  (err) => {
    console.log(err);
  }
);

// Middleware
app.use(morgan("tiny"));
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use(express.static(path.join(__dirname, 'public')));

// Rutas
app.get("/", (req, res) => {
  res.send("Hello World!");
});

// Middleware para Vue.js router modo history
const history = require("connect-history-api-fallback");
app.use(history());
app.use(express.static(path.join(__dirname, "public")));

app.use("/api", require("./routes/user"));
app.use("/api", require("./routes/login"));

app.set("port", process.env.PORT || 3001);
app.listen(app.get("port"), () => {
  console.log("Example app listening on port " + app.get("port"));
});
