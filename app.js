const express = require('express');
const cors = require('cors')
const bodyParser = require('body-parser');
const path = require("path");
const app = express();


require('dotenv').config();

const router = require('./routes/router');


const port = process.env.PORT || 3000;

app.use(cors({
    origin: '*',
}));

app.use('/uploads', express.static(path.join(__dirname, 'uploads')));

// app.use(express.json());
app.use(bodyParser.json());

app.use(express.urlencoded({ extended: true }));


app.use('/api/', router);

app.listen(port, ()=>{
    console.log(`Connected on port ${port}`);
});