//Budget API
const express = require('express');
const cors = require('cors');
const app = express();
const port = 3000;
const mongoose = require('mongoose');
mongoose.set('useCreateIndex', true);

let url= "mongodb://localhost:27017/mongodb_budget_forCharts";
let budget_route= require("./routes_add_get");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use('/',express.static('public'));

mongoose
  .connect(url, {useUnifiedTopology: true,useNewUrlParser: true})
  .then(() => {
    console.log("Connected to Mongodb Database");
  })
  .catch((Conerror) => {
    console.log(Conerror);
  });

app.use('/',budget_route);

app.listen(port,()=>{
    console.log(`API is up and running at http://localhost:${port}/`)
})