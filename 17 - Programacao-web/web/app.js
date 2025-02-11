const express = require('express');
const fs = require('fs');
const path = require('path');
const ejs = require('ejs');
const mustache = require('mustache');

const app = express();
const port = 3000;

app.get('/', (req, res) => {
    const i = 5 * 80;
    res.send(`
    <!DOCTYPE html>
    <html>
    <head>
        <title>Meu Site</title>
    </head>
    <body>
        <h1>Bem-vindo - ${i}</h1>
    </body>
    </html>
    `);
});

app.get('/html-template', async (req, res) => {
    const i = 5 * 80;
    let html = await fs.readFileSync("templates/index.html", 'utf8');
    html = html.replace("{###}", i);
    res.send(html);
});


app.get('/html-dinamico', async (req, res) => {
    const i = 5 * 80;
    var clientes = [
        {id: 1, nome: "Danilo"},
        {id: 2, nome: "Rafael"},
        {id: 3, nome: "Vivi"},
        {id: 4, nome: "Luis"},
    ];

    let ejsString = await fs.readFileSync("templates/index.ejs", 'utf8');
    const html = ejs.render(ejsString, { valor: i, clientes: clientes });
    res.send(html);
});


app.get('/html-mustache', async (req, res) => {
    const data = {
        titulo: "Página com Mustache",
        mensagem: "Olá, este é um exemplo de template com Mustache!",
        usuarios: [
            { id: 1, nome: "Danilo" },
            { id: 2, nome: "Rafael" },
            { id: 3, nome: "Vivi" },
            { id: 4, nome: "Luis" }
        ]
    };
    let template = await fs.readFileSync("templates/index.mustache", 'utf8');
    const html = mustache.render(template, data);
    res.send(html);
});

app.get('/json', async (req, res) => {
    res.send([
        {id: 1, nome: "Danilo"},
        {id: 2, nome: "Rafael"},
        {id: 3, nome: "Vivi"},
        {id: 4, nome: "Luis"},
    ]);
});

app.get('/json-template', async (req, res) => {
    let json = await fs.readFileSync("json/index.json", 'utf8');
    res.send(json);
});


app.get('/xml', async (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    res.send(`<?xml version="1.0" encoding="UTF-8"?>
            <usuarios>
                <usuario>
                    <id>1</id>
                    <nome>Danilo</nome>
                </usuario>
                <usuario>
                    <id>2</id>
                    <nome>Rafael</nome>
                </usuario>
                <usuario>
                    <id>3</id>
                    <nome>Vivi</nome>
                </usuario>
                <usuario>
                    <id>4</id>
                    <nome>Luis</nome>
                </usuario>
            </usuarios>
    `);
});

app.get('/xml-template', async (req, res) => {
    res.setHeader('Content-Type', 'application/xml');
    let xml = await fs.readFileSync("xml/index.xml", 'utf8');
    res.send(xml);
});


app.get('/csv-template', async (req, res) => {
    res.setHeader('Content-Type', 'text/csv');
    let csv = await fs.readFileSync("csv/index.csv", 'utf8');
    res.send(csv);
});


app.get('/pdf-template', async (req, res) => {
    const pdfPath = path.join(__dirname, 'pdf', 'HTML.pdf');

    res.setHeader('Content-Type', 'application/pdf');
    res.setHeader('Content-Disposition', 'inline; filename="HTML.pdf"');

    const data = await fs.readFileSync(pdfPath);
    res.send(data);
});

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});
