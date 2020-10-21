const {Router} = require('express');
const router = Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const {check, validationResult } = require('express-validator');

router.post('/register', 
  [
    check('email', 'Неверный email').isEmail().exists(),
    check('password', 'Минимальная длина пароля не менее 6 символов').isLength({min: 6}).exists()
  ], async (req, res)=>{
    
  const {email, password} = req.body;

  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array()});
        return;
      }

    const candidate = await UserModel.findOne({email});
    
    if(candidate){
      res.status(400).json({        
        message: 'Такой пользователь уже существует'
      }); 
      return;     
    }
    const hashedPassword = await bcrypt.hash(password, 12);
    
    const data = {email, password: hashedPassword};

    const user = await UserModel.create(data);
    
    res.status(200).json({
      message: 'Пользователь создан'      
    });    
  }
  catch(err){    
    res.status(500).send();
  }
});

router.post('/login', async  (req, res)=>{

}); 

module.exports = router;
