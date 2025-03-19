import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// app.use(express.static(path.join(__dirname, './')));

app.get ("/", (req, res) => {
    // res.json({message: "App is running on docker container"});
    res.sendFile(path.join(__dirname, 'produtos', 'index.html'));
});


app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});