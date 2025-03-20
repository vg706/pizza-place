import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import Parse from 'parse/node.js';

const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);


  
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'produtos', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});
