import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
import Parse from 'parse/node.js';

const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

Parse.initialize("HOa7pu3hNfi3xCUSkKzclVZl4XtxwHjlb5odaGdO", "xwV9q0OLSs0fIKYJqqUJsHPrNqPLVsSLAB0DkoZc");
Parse.serverURL = 'https://parseapi.back4app.com';
  
app.get ("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'produtos', 'index.html'));
});

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});