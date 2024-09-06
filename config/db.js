const mongoose = require('mongoose');
const consola = require('consola');

const connectToDb = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        consola.success('Connected to database');
    } catch (error) {
        consola.error('Error connecting to database: ', error);
    }
}

module.exports = connectToDb;