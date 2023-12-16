const express = require('express')
const app = express()
const port = 4000;
const cors = require('cors');


const mongoDB = require('./db');
app.use((req, res, next) => {
    res.setHeader("Access-Control-Allow-Origin", "http://localhost:3000/");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin,X-Requested-With,Content-Type,Accept"
    );
    next();
})
app.use(cors());
mongoDB();          

app.get('/', (req, res) => {
    res.send('Hello Ankit')
})
app.use(express.json())
app.use('/api', require("./Routes/Createuser"));
app.use('/api', require("./Routes/DisplayData"));
app.use('/api', require("./Routes/OrderData"));



app.listen(port, () => {
    console.log(`this is the port we are working on ${port}`);
})
