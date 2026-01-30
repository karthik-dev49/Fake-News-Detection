const mongoose = require("mongoose");

const uri = "mongodb+srv://BholaKumar:i95KagmrKhxUMS6X@cluster0.gvozwdv.mongodb.net/FakeNewsDetection";

mongoose.connect(uri)
.then(()=>console.log("connected to db"))
.catch(err=>console.log(err))