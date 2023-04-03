const express = require('express')
const cors = require('cors')
const connect = require('./models/db');
const cookieParser = require('cookie-parser');

const router = require('./routes/index')

const { isObjectIdOrHexString } = require('mongoose');
const app = express()

connect();

app.unsubscribe(cookieParser())
app.use(express.json())
app.use(cors())

app.use(router)



const port = process.env.PORT || 3000

app.listen(port, () => console.log('app is listening to port: ' + port))