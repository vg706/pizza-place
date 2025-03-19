import express from "express";

const PORT = process.env.PORT || 8080;
const path = require('path')
const app = express();

// app.get ("/", (req, res) => {
//     res.json({message: "App is running on docker container"});
// });
app.use(express.static(path.join(__dirname, 'public')));

app.listen(PORT, () => {
    console.log(`App running on ${PORT}`);
});