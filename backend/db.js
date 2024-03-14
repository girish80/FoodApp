const mongoose = require('mongoose');
require('dotenv').config()
const mongoURI = 'mongodb+srv://girishjoshi:foodApp1234@cluster0.0spdlvo.mongodb.net/foodApp';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongoURI, { useUnifiedTopology: true });
        console.log("Connected to MongoDB");

        const foodDataCollection = mongoose.connection.db.collection("foodData2");
        const foodCategoryCollection = mongoose.connection.db.collection("foodCategory");

        const data = await foodDataCollection.find({}).toArray();
        const catData = await foodCategoryCollection.find({}).toArray();

        global.foodData2 = data;
        global.foodCategory = catData;

    } catch (err) {
        console.error("Error connecting to MongoDB:", err);
    }
};


module.exports = mongoDB;
