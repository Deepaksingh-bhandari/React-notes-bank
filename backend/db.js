const mongoose = require('mongoose');

function connectToMongo(){
    mongoose.connect('mongodb://localhost:27017/Deepak',()=>{
        console.log("Connected to Deepak Database")
    })
}
module.exports=connectToMongo;