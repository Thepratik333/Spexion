
import mongoose from "mongoose";

const connectdb = async() =>{
    try {
        await mongoose.connect(`mongodb://localhost:27017/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: 🛜`);
    } catch (error) {
        console.log(error)
    }
}


export default connectdb