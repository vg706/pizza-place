import express from "express";
import path from 'path';
import { fileURLToPath } from 'url';
// import Parse from 'parse/node.js';

const PORT = process.env.PORT || 8080;
const app = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, 'pages', 'produtos', 'index.html'));
});
app.get("/login-cliente", (req, res) => {
    res.redirect("/login-cliente");
});

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});

app.use(express.static(path.join(__dirname, 'pages')));
// app.use(express.static(path.join(__dirname, 'login-cliente')));

// async function create() {
//     const player = new Parse.Object('Player');
//     player.set('name', 'Alex');
//     player.set('yearOfBirth', 1997);
//     player.set('emailContact', 'alex@email.com');
//     player.set('attributes', ['fast', 'good endurance']);
    
//     try {
//         const result = await player.save();
//         console.log('New object created with ID:', result.id);
//     } catch (error) {
//         console.error('Failed to save object:', error.message);
//     }
// }