import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { sequelize } from "./models/index.js";
import router from "./routes/index.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.get("/", (_, res) => {
  res.send("🚗 Sync Dealer API activa.");
});

// 📌 Montar rutas protegidas
app.use("/api", router);

// 🟢 Iniciar servidor (ya sin sync innecesario)
const PORT = process.env.PORT || 5001;
app.listen(PORT, async () => {
  try {
    await sequelize.authenticate();
    console.log("✅ Conexión a la base de datos confirmada");
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
  } catch (error) {
    console.error("❌ Error de conexión a MySQL:", error.message);
  }
});
