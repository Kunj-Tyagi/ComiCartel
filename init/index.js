// logic:)
const mongoose=require("mongoose");
const initData=require("./data.js");
const comic=require("../models/comicModel.js");
require('dotenv').config({ path: '../.env' });

main().then(()=>{
    console.log("connected to DB");
}).catch(err=>{
    console.log(err);
});

async function main() {
    await mongoose.connect(process.env.CONNECTION_STRING, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        serverSelectionTimeoutMS: 5000,
    });
}
const initDB=async()=>{
    await comic.deleteMany({});
    await comic.insertMany(initData.data);
    console.log("data was initialized");
};

initDB();
