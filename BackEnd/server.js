const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

dotenv.config();

const app = express();

app.use(cors());
app.use(express.json()); // Middleware to parse JSON request bodies

// Serve static files from the 'public' directory
app.use(express.static(path.join(__dirname, '../FrontEnd/dist')));

console.log("Frontend served from /FrontEnd/dist");

// Explicitly serve index.html for the root route
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../FrontEnd/dist', 'index.html'));
});

// API endpoint /api/data (keeping the previous one)
app.get('/api/data', (req, res) => {
  res.json({ message: 'Hello from the backend!' });
});

// New POST route for /api/order
app.post('/api/order', (req, res) => {
  console.log('Order received:', req.body); // Log the received order
  res.json({ success: true, message: 'Order received!' });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
