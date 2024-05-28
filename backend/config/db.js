
import mongoose from "mongoose";

const connectdb = async() =>{
    try {
        await mongoose.connect(`mongodb+srv://pratik:Pratik@cluster0.hfq2sgw.mongodb.net/${process.env.DB_NAME}`)
        console.log(`\n MongoDB connected !! DB HOST: 🛜`);
    } catch (error) {
        console.log(error)
    }
}


export default connectdb