const { Router } = require('express');
const router = Router();
const LinkModel = require('../models/Link');

router.get('/:code', async (req, res)=>{
  
  try {    
    const code = req.params.code;
    const link = await LinkModel.findOne({code});
    
    if(link){
      link.clicks++;
      await link.save();        
      return res.redirect(link.from);
    }
    res.send({
      message: 'ссылка не найдена'
    })    
  }
  catch(err){
    res.status(500).json({
      message: 'что-то пошло не так',
    });
  }
});

module.exports = router;