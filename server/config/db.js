const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            serverSelectionTimeoutMS: 60000,
            socketTimeoutMS: 45000,
            family: 4
        });
        
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error('MongoDB Connection Error Details:');
        console.error('Error name:', error.name);
        console.error('Error message:', error.message);
        if (error.cause) {
            console.error('Error cause:', error.cause);
        }
        process.exit(1);
    }
};

module.exports = connectDB; 