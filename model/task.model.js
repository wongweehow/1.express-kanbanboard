const mongoose = require('mongoose');

const schema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  }, 
  description: {
    type: String,
    required: false
  },
  dateStart: {
    type: Date,
    required: true 
  },
  dateEnd: {
    type: Date,
    required: true
  },
  kanbanStatus: {
    type: String,
    default: 'waiting',
    required: true
  }
});


module.exports = mongoose.model('Task', schema);