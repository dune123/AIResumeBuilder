const express=require('express');
const bodyParser=require('body-parser');
const mongoose=require('mongoose');
const dotenv=require('dotenv');
const cors=require('cors');
const UserResumeRoutes=require('./routes/UserResumeRoutes');
dotenv.config();

const corsOptions = {
    origin: process.env.REACT_FRONTEND_URL, // Replace this with the origin of your client application
    credentials: true // Allow cookies or HTTP authentication to be included in the request
  };
const app=express();

app.use(cors(corsOptions))
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

//User resume routes
app.use("/api/userResume",UserResumeRoutes);


app.listen(process.env.PORT,()=>{
    console.log(`listening on ${process.env.PORT}`)
    mongoose.connect(process.env.MONGO_URL,{
        useNewUrlParser: true,
        useUnifiedTopology: true,
        dbName:"AIResumeBuilder"
    })
    .then(()=>{
        console.log("Connnected to the databases")
    })
    .catch((err)=>{
        console.log(err);
    })
})