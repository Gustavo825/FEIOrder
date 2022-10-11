import mongoose from "mongoose";
import "dotenv/config";
const options = { useNewUrlParser: true };
try {
  mongoose.connect(process.env.URI_DB, options);
  console.log("Conectado a DB");
} catch (error) {
  console.log("Error en la BD " + error);
}
