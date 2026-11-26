const express = require("express");
const PORT = 4000;
const app = express();

app.set("view engine","ejs");
app.use(express.json());

app.get('/', (req, res) => res.send("working well"));

app.get('/:id', (req, res) => {
    res.send(`${req.params.id}のユーザー情報`);
});

app.listen(PORT, async () => {
    console.log("server running");
});