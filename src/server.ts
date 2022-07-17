import bodyParser = require('body-parser');
import { error } from 'console';
import * as express from 'express'
import * as mongoose from "mongoose";
import { getEnviromentVariable } from "./enviroments/env";
import UserRouter from './routes/UserRouter';


export class Server{
    public  app : express.Application = express();

    constructor(){
        this.setConfigration();
        this.configureBodyParser();
        this.setRoutes();
        this.erorr404Handdler();
        this.handdleErrors();
    }

    setConfigration(){
        this.connectMongodb();
        
    }
    
  
    connectMongodb(){

        const databaseUrl = getEnviromentVariable().db_url;       
        mongoose.connect(databaseUrl).then(()=>{
            console.log("Mongo is connected");
        }).catch((err)=>{
            console.log("Error")
            console.log("Error"+err)
        });

    }

    configureBodyParser(){
        this.app.use(bodyParser.urlencoded({extended:true}));  //qs lybary
    }
    setRoutes(){
        this.app.use('/api/user/',UserRouter);
       
    }

    erorr404Handdler(){
        this.app.use((req,res)=>{
            res.status(404).send({message:'Page Not Found..!',status_code:404})
        })    
    }

    handdleErrors(){
        this.app.use((error,req,res,next)=>{

            const errorStatus = req.errorStatus || 500;
            res.status(errorStatus).json({
                message:error.message || 'Something went worng Please try again..!',
                status_code:errorStatus
            })
            
        })
    }
}



