import "dotenv/config";
import dns from "node:dns";
import app from "./src/app.js";
import connectDatabase from "./src/config/db.js";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

const PORT = process.env.PORT || 3000;

async function startServer() {
  await connectDatabase();

  app.listen(PORT, () => {
    console.log("Servidor iniciado");
  });
}

startServer();