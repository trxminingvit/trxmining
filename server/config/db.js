const mongoose = require('mongoose');

const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000,
            authSource: 'admin',
            ssl: true,
            retryWrites: true,
            w: 'majority'
        });

        console.log(`MongoDB Connected: ${conn.connection.host}`);
        return conn;
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