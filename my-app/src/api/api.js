const express = require('express');
const { Sequelize } = require('./models');
const { DataTypes } = require('sequelize');

const cors = require('cors')
const app = express();
const port = 2999;

app.use(cors())

app.use(express.json());

const sequelize = new Sequelize('esp32', 'postgres', '321987', {
    host: '127.0.0.1',
    dialect: 'postgres'
});

const Comunication = sequelize.define('ComunicatonValues', {
    comunicationValues: {
        type: DataTypes.BOOLEAN,
        allowNull: false
    }
})

sequelize.sync();

app.get('/', (req, res) => {
    res.send('API está funcionando!');
});

app.get('/values', async (req, res) => {
    const values = await Comunication.findAll();
    res.json(values);
});

app.post('/values', async (req, res) => {
    const newItem = await Comunication.create({
        comunicationValues: req.body.comunicationValues
    });
    res.status(201).json(newItem);
})

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`)
})