const express = require('express');
const dotenv = require('dotenv').config();
const mongoose = require('mongoose');
const router = require('./routes/auth.routes');
const newRouter = require('./routes/new.routes');
const linksRouter = require('./routes/link.routes');
const path = require('path');

const app = express();
app.use(express.json({extended: true}));

app.use('/api/auth', router);
app.use('/app/new', newRouter);
app.use('/api/links', linksRouter);

app.get('/test', (req, res)=>{  
  res.send({
    status: 'ok'
  });  
});

if(process.env.NODE_ENV === 'production'){
  app.use('/', express.static(path.join(__dirname, 'client', 'build')));

  app.get('*', (req,res)=>{
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  })
}

const PORT = process.env.PORT;
const mongoURI = process.env.mongoURI;

async function start () {
  try {
    await mongoose.connect(mongoURI,  {
      useNewUrlParser: true, 
      useUnifiedTopology: true
    });
    app.listen(PORT, ()=>{
      console.log(`SERVER RUNNING ON PORT ${PORT}, NODE_ENV=${process.env.NODE_ENV}`);
    });
  }
  catch(err){
    console.log(err);
    process.exit(1)
  }
};

start();

