import mongoose from "mongoose";

const userSchema = mongoose.Schema({
    mobile:{
        type:String
    },
    password:{
        type:String
    },
    passwords:[{
        key : String,
        password :String
    }]
})

const User = mongoose.model('User',userSchema)
export default User