const express = require('express');
const cors = require('cors');
const marked = require('marked');

const app = express();
app.use(cors());
app.use(express.json());

app.get('/', (req, res) => {
    res.json("Server is Running Properly!");
});

app.post('/convert', (req, res) => {
    const { markdown } = req.body;
    if (!markdown) {
        return res.status(400).json({ error: 'No markdown content provided' });
    }
    const html = marked.parse(markdown);
    res.json({ html });
});

const PORT = 3001;
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});