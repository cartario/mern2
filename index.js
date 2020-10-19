const express = require('express');
const dotenv = require('dotenv').config();

const PORT = process.env.PORT;

const app = express();

app.get('/test', (req, res)=>{  
  res.send({
    status: 'ok'
  });  
});

app.listen(PORT, ()=>{
  console.log(`SERVER RUNNING ON PORT ${PORT}`);
});



