import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./config/routes"
import cors from "cors";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

app.use(cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
    allowedHeaders: ["Content-Type", "Authorization"]
}));

// Middleware para servir arquivos estáticos
app.use(express.static("dist/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
