/**import  */
const express = require('express');
const cors = require('cors');
require('./src/config/db.config.js')
require('dotenv').config();

// config
const app = express()
const port = process.env.PORT || 3000;

/** middleware */
app.use(cors())
app.use(express.json())
/** end middleware */

// demo url
app.get('/', (req, res) => {
    res.status(200).send('hello server is working');
})

// server run
app.listen(port, () => {
    console.log(`Server is running port ${port}`)
})