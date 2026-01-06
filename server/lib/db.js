import mongoose from "mongoose"; 

export const connectDb = async () => {
    try {
        mongoose.connection.on('connected', () => {
            console.log('Db is connected yayyy! 😁');            
        })
        await mongoose.connect(process.env.DB_URL)
    } catch (error) {
        console.log(error.message);        
    }
}