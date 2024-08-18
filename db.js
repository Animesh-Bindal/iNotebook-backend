//MONGOOSE
const mongoose = require('mongoose');
const connectToDb = async () => {
    try {
        // await mongoose.connect('mongodb://127.0.0.1:27017/inotebook');
        await mongoose.connect('mongodb+srv://anib4801:anib4801@clusterproj.cctn2.mongodb.net/?retryWrites=true&w=majority&appName=Clusterproj');
        console.log('Connection established successfully');
    }
    catch (error) {
        console.log("CONNECTION ERROR !!!");
    }
}
module.exports = connectToDb;
