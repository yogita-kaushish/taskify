const mongoose = require('mongoose')

const newTaskSchema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    completed:{
        type:Boolean||false,
        required:true,
        default:false
    }
})

const Task = mongoose.model('task',newTaskSchema);

module.exports = Task;