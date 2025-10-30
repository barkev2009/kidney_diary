require('dotenv').config();
const http = require('http');
const https = require('https');
const fs = require('fs');
const express = require('express');
const cors = require('cors');
const models = require('./models/models')

const router = require('./routers/index');
const errorHandler = require('./middleware/ErrorHandlerMiddleware');
const sequelize = require('./db');

const PORT = process.env.PORT || 5004;

const options = {
    key: fs.readFileSync('/etc/letsencrypt/live/barkev2009-portfolio.ru/privkey.pem'),
    cert: fs.readFileSync('/etc/letsencrypt/live/barkev2009-portfolio.ru/cert.pem'),
    ca: fs.readFileSync('/etc/letsencrypt/live/barkev2009-portfolio.ru/chain.pem')
};

const app = express()
app.use(cors());
app.use(express.json());
app.use('/api', router);

// Middleware с ошибками должен регистрироваться в последнюю очередь!!!
app.use(errorHandler);

app.get(
    '/',
    (req, resp) => {
        resp.status(200).json(
            {
                message: 'Kidney Diary ready!!!'
            }
        );
    }
)

// const server = http.createServer(app);
const server = https.createServer(options, app);

const start = async () => {
    try {
        await sequelize.authenticate();
        await sequelize.sync();
        server.listen(PORT, '0.0.0.0', () => console.log(`Server started on port ${PORT}`))
    } catch (err) {
        console.error(err)
    }
}

start();