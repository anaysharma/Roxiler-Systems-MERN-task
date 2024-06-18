require('dotenv').config();

const express = require('express');
const cors = require('cors');
const connectDb = require('./DB.js');

const server = express();

server.use(cors());
server.use(express.json());
server.use('/api/', require('./routes/index.js'));

server.get('/', (_, res) => res.send('<h1>Transactions API</h1>'));

const PORT = process.env.PORT;

server.listen(PORT, (e) => {
  console.log(`Server is running at ${PORT}`);
  connectDb(process.env.DB_URL);
});
