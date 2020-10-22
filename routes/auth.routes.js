const {Router} = require('express');
const router = Router();
const UserModel = require('../models/User');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const {check, validationResult } = require('express-validator');

const SECRET_KEY = process.env.SECRET_KEY;

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

router.post('/login', [
  check('email', 'Неверный email').isEmail().exists(),
  check('password', 'Минимальная длина пароля не менее 6 символов').isLength({min: 6}).exists()
], async  (req, res)=>{

  const {email, password} = req.body;

  try {
    const errors = validationResult(req);
      if (!errors.isEmpty()) {
        res.status(400).json({ status: 'error', errors: errors.array()});
        return;
      }
    
    const candidate = await UserModel.findOne({email});

    if(!candidate){
      res.status(400).send({
        message: 'Пользователь не найден'
      });
      return; 
    }

    const isMatch = await bcrypt.compare(password, candidate.password);
    
    if(!isMatch){
      return res.status(400).send({message: 'пароли не совпадают'});
    }

    const token = jwt.sign({userId: candidate.id}, SECRET_KEY, {expiresIn: '1h'});

    const data = {
      userId: candidate.id,
      email: candidate.email,
      token
    }

    res.send(data);

  }
  catch(err){
    res.status(500).send();
  }
}); 

module.exports = router;
