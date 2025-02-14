import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./config/routes"
import expressLayouts from 'express-ejs-layouts';

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

// Configurar o Express para usar EJS
app.set("view engine", "ejs");
app.set("views", "./dist/views"); 
app.use(expressLayouts);
app.set('layout', 'layouts/main');

// Middleware para servir arquivos estáticos
app.use(express.static("dist/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
