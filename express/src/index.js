import dotenv from 'dotenv';
import app from './app.js'
import connectDb from './db/connect.js';

dotenv.config();
const PORT =process.env.PORT || 5000;

const startServer=async ()=>{
    try{
       await connectDb();
       app.listen(PORT,()=>{
        console.log(`app is listning on ${PORT}`);
       });

    }catch(err){
       console.log('failed to start the server',err.message);
    }
}
startServer();