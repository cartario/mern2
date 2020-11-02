const {Schema, model} = require('mongoose');

const BoxSchema = new Schema({
  name: {
    type: String,
    required: true    
  },
  message: {
    type: String,
    required: true    
  }
});

module.exports = model('Box', BoxSchema);
