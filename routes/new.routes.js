const {Router} = require('express');
const newRouter = Router();
const BoxModel = require('../models/Box');

newRouter.get('/', (req, res)=>{
  const data = {
    name: 'vasil',
    message: 'yo'
  }

  BoxModel.create(data);  

  res.send({
    message: 'hello',
    data
  })
});

module.exports = newRouter;
