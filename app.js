const express = require('express');
const app = express();
const port = 3000;

app.use(express.json());

let data = [];

// Create operation
app.post('/api/data', (req, res) => {
    const newData = req.body;
    data.push(newData);
    res.status(201).json(newData);
});

// Read operation
app.get('/api/data', (req, res) => {
    res.json(data);
});

// Update operation
app.put('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const updatedData = req.body;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        data[index] = updatedData;
        res.json(updatedData);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

// Delete operation
app.delete('/api/data/:id', (req, res) => {
    const id = req.params.id;
    const index = data.findIndex(item => item.id === id);
    if (index !== -1) {
        const deletedData = data.splice(index, 1);
        res.json(deletedData[0]);
    } else {
        res.status(404).json({ error: 'Data not found' });
    }
});

app.listen(port, () => {
    console.log(`Server listening at http://localhost:${port}`);
});
