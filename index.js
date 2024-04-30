require('dotenv').config();
const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');

const userRoutes = require('./routes/userRoutes');
const gameRoutes = require('./routes/gameRoutes');


const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors({
    origin: 'http://localhost:5173'
}));

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/games', gameRoutes);

// app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

connectDB.once('open', () => {
    app.listen(PORT, () => {
        console.log(`API server running on port ${PORT}!`);
    });
});
