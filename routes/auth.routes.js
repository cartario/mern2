const {Router} = require('express');
const router = Router();
const UserModel = require('../models/User');

console.log(UserModel);

router.post('/register', async (req, res)=>{
  const {email, password} = req.body; 
  try {
    const candidate = await UserModel.findOne({email});
    
    if(candidate){
      res.status(400).json({        
        message: 'Такой пользователь уже существует'
      }); 
      return;     
    }
    const data = {email, password};

    const user = await UserModel.create(data);
    
    res.status(200).json(user);    
  }
  catch(err){    
    res.status(500).send();
  }
});

router.post('/login', async  (req, res)=>{

}); 

module.exports = router;
