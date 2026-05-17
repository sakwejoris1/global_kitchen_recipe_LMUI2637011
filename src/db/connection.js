import mongoose from 'mongoose';

const connectDB = async () => {
    try {
        const mongoUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/global_kitchen';
        await mongoose.connect(mongoUri);
        console.log('MongoDB connected');
    } catch (err) {
        console.error('Error occurred while connecting to MongoDB', err);
        process.exit(1);
    }
};

export default connectDB;
