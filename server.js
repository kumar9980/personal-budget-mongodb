const express = require('express');
const app = express();
const port = 3000;

app.use('/',express.static('public'));

const budget={
    myBudget : [
        {
            title : "Eat out",
            budget : 30
        },
        {
            title : "Rent",
            budget : 350
        },
        {
            title : "Groceries",
            budget : 90
        }
    ]
};

app.get('/hello',(req,res)=>{
    res.send('Hello kumar');
});

app.get('/budget',(req,res)=>{
    res.json(budget);
});

app.listen(port,()=>{
    console.log('App is up and running at http://localhost:${port}/')
})