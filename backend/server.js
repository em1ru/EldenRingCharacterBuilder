const express = require('express');
const connectDB = require('./database');
const itemRoutes = require('./routes/itemRoutes');
require('dotenv').config();

const app = express();

app.use(express.json());
app.use('/api', itemRoutes);

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    connectDB();
});
