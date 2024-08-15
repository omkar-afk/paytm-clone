const express = require("express");
const cors = require('cors')
require('dotenv').config();


const userRouter = require('./routes/user');
const accountRouter = require("./routes/account");
const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/users',userRouter);
app.use('/api/v1/account',accountRouter)

app.get('/',(req,res)=>{
    res.json({
        "mssg":"hello"
    })
})
const PORT = process.env.PORT|| 3000

app.listen(PORT,()=>{
    console.log("runnning at server 3000.")
})






