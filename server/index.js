const path = require('path');
const mongoose = require('mongoose');
const express = require('express');
const app = new express();
const PORT = 4444;
const user = require('./routes/user');
const cookieParser = require('cookie-parser');
const cors = require('cors');
require ('dotenv').config();

app.use(cors());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.get('/', (req, res) => {
    console.log("req recieved");
    res.send("Server is running");
});

app.use("/user", user);


mongoose.connect(process.env.DB_URL)
.then(
    app.listen(PORT, ()=>{
        console.log(`Server is running on port ${PORT}`);
    }
)).catch(err => console.log("database error,", err));
