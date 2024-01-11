import express from 'express'
const app = express();
import { dbConnect } from './src/config/dbConnect.js';


dbConnect()


app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.listen(3000,()=>{
    console.log('server is running')
})