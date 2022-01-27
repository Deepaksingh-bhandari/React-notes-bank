const mongoose = require('mongoose');
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {type: String, required: true,},
  email: {type: String, required: true, unique:true},
  password: {type: String, required: true,},
  createdOn: { type: Date, default: Date.now },
});
userModel=mongoose.model('user',userSchema)
// userModel.createIndexes(); //TO create index based on eamil as it is set to unique
module.exports=userModel