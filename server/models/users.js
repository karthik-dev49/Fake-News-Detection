const mongoose =  require("mongoose");
const schema = mongoose.Schema;

const userSchema = new schema({
    userName: String,
    email: String,
    password: String
});

const users = mongoose.model("users",userSchema);

module.exports = users;