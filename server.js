const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const path = require('path');

// dotenv configration
dotenv.config();

// rest api
const app = express();

// middleware
app.use(cors());
app.use(express.json());

// static file  deploy
app.use(express.static(path.join(__dirname, './client/build')))

// routes
app.use('/api/v1/portfolio', require('./routes/portfolioRoute'))

app.get('*', function (req, res) {
    res.sendFile(path.join(__dirname, './client/build/index.html'))
})

// Port
const port = process.env.PORT || 8080;

// Listen
app.listen(port, () => {
    console.log(`server is running on PORT ${port}`);
})