const mongoose=require('mongoose');
mongoose.connect("mongodb+srv://rgs786999:8wm6lhVoV59yirSJ@cluster0.9olfp7w.mongodb.net/",{
    dbName: "BloodDonation",
})
.then(()=>{
    console.log("connection successful");
})
.catch((err)=>{
    console.log(`No connection ${err}`);
})

const logInSchema=new mongoose.Schema({
    username: String,
    password: String,
    usertype: String,
});
const LogInCollection=new mongoose.model('UserData',logInSchema);
module.exports=LogInCollection;