import mongoose from "mongoose";
import dotenv from 'dotenv'
dotenv.config()

const url = process.env.MONGO_DB_CONNECTION;

const connectionParams = {
    useNewUrlParser: true,
    useUnifiedTopology: true
}

mongoose.connect(url, connectionParams)
    .then(() => {
        console.log('Connected to the database ')
    }).catch((err) => {
        console.error(`Error connecting to the database. n${err}`);
    })