const express = require('express');
const app = express();
const port = 3000;

app.use('/',express.static('public'));

const budget=require('./budget-data.json');
const d3 = require('./d3-data.json');

app.get('/hello',(req,res)=>{
    res.send('Hello kumar');
});

app.get('/budget',(req,res)=>{
    res.json(budget);
});

app.get('/d3',(req,res)=>{
    res.json(d3);
});

app.listen(port,()=>{
    console.log('App is up and running at http://localhost:${port}/')
})