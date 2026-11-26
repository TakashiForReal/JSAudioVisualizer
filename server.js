const express = require("express");
const PORT = 4000;
const app = express();

app.use(express.static("pages"));

app.get('/', (req, res) => res.send("working well"));

app.get('/:id/aaa', (req, res) => {
    res.send(`${req.params.id}のユーザー情報`);
});

app.listen(PORT, async () => {
    console.log("server running");
});