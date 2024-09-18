const express = require('express');
const app = express();

app.get('/', (req, res) =>{res.send('Hello World');})

const port = 5500;
app.listen(process.env.port || 5500);
console.log('Web Server is listening at port' + (process.env.port || 5500));