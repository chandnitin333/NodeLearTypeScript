
import { body,query } from "express-validator";
import { resolve } from "path/posix";
import User from "../models/User";

export class UserValidator{
    static signUp(){
        
        return [
          
            body('password','Password1 is required').isAlphanumeric().isLength({min:8,max: 20}).withMessage('Password can be from 8-20 charector only'),
                body('username','Username is required').isString(),
                body('email','Email is required.').isEmail().custom((email,{req})=>{
                   return User.findOne({email:email}).then(user=>{
                        if(user){
                            throw new Error('User Already Exists');
                        }else{
                            // console.log(req);
                            return true
                        }
                    })
                })]
    }
    static verifyUser(){
        
        return[body('verification_token','Verification token is required').isNumeric()]
    }

   static  resendVerificationEmail(){
        return[
            query('email').isEmail()
        ]
    }


    static login(){
        return[
            query('email','email is required').isEmail().custom(
                (email,{req})=>{
                    return User.findOne({email:email}).then(user=>{
                        if(user){
                            req.user = user;
                            return true;
                        }else{
                            throw new Error("User does not exits");
                        }
                    })
                })
            , query('password', 'Password is Required').isAlphanumeric()

        ]
    }    
   
}