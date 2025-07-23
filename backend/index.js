import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import connectDB from './utils/db.js';
import userRoute from './routes/userRoute.js';
import imageRoute from './routes/imageRoute.js';
import linkRoute from './routes/linkRoute.js';
import cookieParser from "cookie-parser";
import path from 'path';//

dotenv.config();
const app=express();
const PORT=process.env.PORT || 3000;

app.use(cors(
    {
        origin:'https://portfolio-website-tnpr.onrender.com',
        credentials: true,
    }
));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

const __dirname=path.resolve();//



//routes
app.use('/api/user',userRoute)
app.use('/api/image',imageRoute)
app.use('/api/link',linkRoute)

app.use(express.static(path.join(__dirname,'frontend/dist')))//
app.get(/.*/,(req,res)=>{
  res.sendFile(path.resolve(__dirname,'frontend','dist','index.html'))
})//

// Connect to MongoDB
connectDB().then(()=>{
    app.listen(PORT, () => {
        console.log(`Server is running on port ${PORT}`);
    });
})