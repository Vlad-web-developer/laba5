const express = require('express');
const bodyParser = require('body-parser');

const app = express();
app.use(bodyParser.json());

// Курси валют 
const exchangeRates = {
    USD: 40.60 ,    
    EUR: 45.20,    
};

// Маршрут для обробки конвертації валюти
app.post('/convert', (req, res) => {
    const { currency, amount } = req.body;

    if (!currency || !amount || typeof amount !== 'number') {
        return res.status(400).json({ error: 'Некоректні дані. Вкажіть валюту і кількість' });
    }

    const rate = exchangeRates[currency.toUpperCase()];
    if (!rate) {
        return res.status(400).json({ error: 'Невідома валюта' });
    }

    const result = amount * rate;
    res.json({ amount, currency, resultInUAH: result });
});

let tasks = [
    { id: 1, name: 'Task 1' },
    { id: 2, name: 'Task 2' },
];

app.get('/tasks', (req, res) => {
    res.json(tasks);
});

app.get('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');
    res.json(task);
});

app.post('/tasks', (req, res) => {
    const task = {
        id: tasks.length + 1,
        name: req.body.name
    };
    tasks.push(task);
    res.status(201).json(task);
});

app.put('/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === parseInt(req.params.id));
    if (!task) return res.status(404).send('Task not found');

    task.name = req.body.name;
    res.json(task);
});

app.delete('/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === parseInt(req.params.id));
    if (taskIndex === -1) return res.status(404).send('Task not found');

    tasks.splice(taskIndex, 1);
    res.status(204).send();
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

