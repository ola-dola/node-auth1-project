const express = require('express');
const cors = require('cors');
const helmet = require('helmet');

const authRouter = require('./auth/auth-router');
const userRouter = require('./users/users-router');

const server = express();

server.use(helmet());
server.use(express.json());
server.use(cors());

server.use('/api', authRouter);
server.use('/api', userRouter);

server.use((req, res) => {
    res.json("All good, mate?");
});

module.exports = server;