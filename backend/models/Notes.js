const mongoose = require('mongoose');
const { Schema } = mongoose;

const notesSchema = new Schema({
    user: {type: String, required: true},
  title: {type: String, required: true,},
  description: {type: String, required: true},
  tag: {type: String},
  updatedOn: { type: Date, default: Date.now },
});

module.exports=mongoose.model('notes',notesSchema)