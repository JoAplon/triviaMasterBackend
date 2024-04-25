require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');  

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');

const app = express();
const PORT = process.env.PORT || 5000;

connectDB(); 

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
