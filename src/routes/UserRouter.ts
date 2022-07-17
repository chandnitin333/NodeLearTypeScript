import { Router } from "express";
import { UserController } from "../controllers/UserController";
 import {body} from 'express-validator';
import { UserValidator } from "../validators/UserValidator";
import { GlobalMiddleware } from "../middleware/GlobalMiddleware";

export class userReoutes{
    public router : Router;

    constructor(){
        this.router = Router();
        this.getRoutes();
        this.postRoute();
        this.patchRoute();
        this.deleteRoute();
    }

    getRoutes(){

        //this.router.post('/login',UserController.login,UserController.test)
        // this.router.get('/send/verificationemail',UserValidator.resendVerificationEmail(),UserController.resendVerificationEmail);

        this.router.get('/send/verificationemail',GlobalMiddleware.authenticate,UserController.resendVerificationEmail);
        this.router.get('/login',UserValidator.login(),GlobalMiddleware.checkError,UserController.login);

    }
    postRoute(){
        this.router.post('/signup',UserValidator.signUp(),GlobalMiddleware.checkError,UserController.signUp)
        

    }
    patchRoute(){
        this.router.post('/verify',UserValidator.verifyUser(),GlobalMiddleware.checkError,GlobalMiddleware.authenticate,UserController.verify)
        
    }
    deleteRoute(){
        
    }
}

export default new userReoutes().router;