import express, { Application } from "express";
import dotenv from "dotenv";
import router from "./config/routes"
import expressLayouts from 'express-ejs-layouts';
import cookieParser from "cookie-parser";
import session from "express-session";
import flash from "connect-flash";

dotenv.config();

const app: Application = express();

const PORT = process.env.PORT || 3000;

// Configurar o Express para usar EJS
app.set("view engine", "ejs");
app.set("views", "./dist/views"); 
app.use(expressLayouts);
app.set('layout', 'layouts/main');

app.use(cookieParser()); 

app.use(session({
    secret: "chave-secreta-desafio-nodejs",
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}));

app.use(flash());

app.use((req, res, next) => {
    res.locals.success_msg = req.flash("success_msg");
    res.locals.error_msg = req.flash("error_msg");
    next();
});

// Middleware para servir arquivos estáticos
app.use(express.static("dist/public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Rotas
app.use("/", router);

app.listen(PORT, () => {
    console.log(`Servidor rodando em http://localhost:${PORT}`);
});
