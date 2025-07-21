import mongoose from 'mongoose'

export const connectDB = async () => {
    await mongoose.connect('mongodb+srv://rohithh902:123456789qwertyuio@cluster0.1zrdq.mongodb.net/food-del').then(() => console.log("MongoDB Connected!"))
    .catch(err => console.log("MongoDB Connection Error:", err));
}

