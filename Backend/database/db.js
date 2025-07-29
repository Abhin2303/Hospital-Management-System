import mongoose from 'mongoose';
import dotenv from 'dotenv';

// Load environment variables from config/config.env
dotenv.config({ path: './config/config.env' });

const mongoURL = process.env.MONGODB_URI; // Match this with your env variable name

if (!mongoURL) {
    console.error("❌ MONGODB_URI is not defined in your config.env file");
    process.exit(1);
}

mongoose.connect(mongoURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;

db.on('connected', () => {
    console.log('✅ Connected to MongoDB Server');
});

db.on('error', (err) => {
    console.error('❌ MongoDB Server Connection error:', err);
});

db.on('disconnected', () => {
    console.log('🔌 Disconnected from MongoDB Server');
});

export default db;
export { mongoURL };
