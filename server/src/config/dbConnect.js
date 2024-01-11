import mongoose from "mongoose";
import dotenv from 'dotenv'

export const dbConnect = ()=>{
    try {
        mongoose.connect("mongodb+srv://adarsh:iDonate@idonate.dtkikxl.mongodb.net/PG?retryWrites=true&w=majority")
        console.log('Connected to mongoDb');
    } catch (error) {
        console.log(error.message)
    }
}