require('./config/DB_Connection')

const express = require("express");
const cors = require('cors');
const app = express();
app.use(cors());
const port = 3001;
const userRouter = require('./api/users')
const newsRouter = require('./api/news')
// for accepting post request
app.use(express.json())
app.use('/users',userRouter)
app.use('/news',newsRouter)
app.listen(port,()=>{
    console.log(`server is running at port ${port}`);
})