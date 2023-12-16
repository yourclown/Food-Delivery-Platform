const mongoose = require('mongoose');
const mongouri = 'mongodb+srv://anprasad58:mern123@cluster0.ubpqa8v.mongodb.net/gofood?retryWrites=true&w=majority';

const mongoDB = async () => {
    try {
        await mongoose.connect(mongouri, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("Connected to MongoDB Ankits Database");
        const fooditemdata = await mongoose.connection.db.collection('food_items');
        const data = await fooditemdata.find({}).toArray();
        global.food_items = data;


        const foodCategory = await mongoose.connection.db.collection('food_category');
        const foodCategorydata = await foodCategory.find({}).toArray();
        global.food_category = foodCategorydata;
        console.log(global.food_category);


    } catch (error) {
        console.error("Error connecting to MongoDB:", error);
    }
};

module.exports = mongoDB;

