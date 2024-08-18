const express = require('express');
const app = express();
const port = 3000;

let items = [];
let currentId = 1;

app.use(express.json());

app.get('/boolean', (req, res) => {
    res.json(items)
});

app.post('/boolean', (req, res) => {
    const newItem = {
        id: currentId++,
        name: req.body.name
    };
    items.push(newItem);
    res.status(201).json(newItem)
})

app.get('/boolean/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const item = items.find(i => i.id === id);
    if (item) {
        res.json(item)
    } else {
        res.status(404).json({message: 'Item não encontrado'});
    }
});

app.delete('/boolean/:id', (req, res) => {
    const id = parseInt(req.params.id)
    const index = items.findIndex(i => i.id === id);
    if (index !== -1) {
        items.splice(index, 1);
        res.status(204).send()

    } else {
        res.status(404).json({message: 'Item não encontrado'})
    }
})


app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
});

