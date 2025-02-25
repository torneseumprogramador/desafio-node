import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./config/routes"

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

// Middleware para servir arquivos estáticos
app.use(express.static("dist/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
