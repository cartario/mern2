const { Router } = require('express');
const shortid = require('shortid');
const router = Router();
const LinkModel = require('../models/Link');
const { validationResult } = require('express-validator');
const dotenv = require('dotenv').config();
const auth = require('../middleware/auth.middleware');

router.post('/generate', auth, async (req, res) => {
  const { from } = req.body;

  try {
    const baseUrl = process.env.baseUrl;    
    const code = shortid.generate();
    const existing = await LinkModel.findOne({ from });

    if (existing) {
      return res.json({ link: existing });
    }

    const to = baseUrl + '/t/' + code;

    await LinkModel.create({ to, from, code , owner: req.user.userId});
    const link = await LinkModel.findOne({ to });
    res.status(201).json({ link });
  } catch (err) {
    res.status(500).json({
      message: 'что-то пошло не так',
      err,
    });
  }
});

router.get('/', auth, async (req, res) => {
  
  try {
    
    const links = await LinkModel.find({owner: req.user.userId});
    res.send({ links });
  } catch (err) {
    res.status(500).json({
      message: 'что-то пошло не так',
    });
  }
});

router.get('/:id', auth, async (req, res) => {
  try {
    const linkId = req.params.id;
    
    const link = await LinkModel.findById(linkId);
    res.send({link})

  } catch (err) {
    res.status(500).json({
      message: 'что-то пошло не так',
    });
  }
});

module.exports = router;
