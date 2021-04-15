const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');


const port = process.env.Port || 2020;
const host = '0.0.0.0';

const routes = require('./Routes/index');

const app = express();

app.use(cors());
app.options('*', cors());

app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/', routes);

mongoose.connect('mongodb+srv://Abhishek07:Abhishek@07@cluster0.gticu.mongodb.net/Project1DB?retryWrites=true&w=majority',
    { useNewUrlParser: true, useUnifiedTopology: true }
).then(res => {
    app.listen(port, host, () => {
        console.log(`Server Running at - ${host}:${port}`);
    })
}).catch(err => { console.log(err) })