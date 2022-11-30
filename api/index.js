const express = require("express");
const dotenv=require('dotenv')
const app = express();
const logger = require("morgan");
const mongoose=require('mongoose')
const cors = require("cors");
const authRouter=require('./routes/auth')
const userRouter=require('./routes/user')
const adminRouter=require('./routes/admin')
const cookieParser = require('cookie-parser');
dotenv.config()

mongoose.connect(
    process.env.MONGO_URL
    ).then(()=>console.log('db connection is succesffull'))
    .catch((err)=>console.log(err)
)
app.use(cookieParser());
app.use(express.json());
// app.use(cors());

// app.use(express.cookieParser());
// let whitelist = ['http://localhost:4200','http://localhost:80'];
// let corsOptions = {
//     origin: (origin:any, callback:any)=>{
//         if (whitelist.indexOf(origin) !== -1) {
//             callback(null, true)
//         } else {
//             callback(new Error('Not allowed by CORS'))
//         }
//     },credentials: true
// }
// app.use((req, res, next) => {
//   res.header("Access-Control-Allow-Credentials", true);
//   next();
// });
app.use(
  cors({
    origin: "*"
  })
);

app.use('/api/users',userRouter)
app.use('/api/auth',authRouter)
app.use('/api/admin',adminRouter)


app.use(logger("dev"));

app.listen(process.env.PORT||5000,()=>{`port running on ${process.env.PORT}`})