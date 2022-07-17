import User from "../models/User";
import { Utils } from "../utils/Utils";
import { NodeMailer } from "../utils/NodeMailer";
import * as Bcrypt from "bcrypt";
import * as Jwt from 'jsonwebtoken';
import { getEnviromentVariable } from "../enviroments/env";
import { ApiRespinse } from "../utils/ApiResponse";

export  class UserController{

    /**
     * New user signup process and send verification code to user email.
     * @function UserController/signUp
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */
    static  async signUp(req,res,next){
        console.log(req.body);
        const  email = req.body.email;
        const  username = req.body.username;
        const  password = req.body.password;
        const verificationToken = Utils.genericVerificationToken();
        
        try{

            const ecryptePassword = await   Utils.encryptPassword(password);
            const data ={
                email:email,
                password:ecryptePassword,
                username:username,
                verification_token:verificationToken,
                verification_token_time : Date.now() + new Utils().MAX_TOKEN_TIME,
            };

            let user = await new User(data).save();
            res.send(user);
            await NodeMailer.sendEmail(
            {
                to:['chandekarnitin03@gmail.com'],
                subject:'Email Verify',
                html:`<h1>${verificationToken}</h>`,

            });


        }catch(e){
            next(e)
        }

       
    }



    /**
     * new user verification vai OTP send  to user email.
     * @function UserController/verify
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */

    static async verify(req,res,next){
    const verificationToken = req.body.verification_token;
    const email =  req.user.email
    try{
        const  user = await User.findOneAndUpdate(
        {
            email:email,
            verificationToken:verificationToken,
            verification_token_time:{$gt:Date.now()}
        },{verified:true},{new:true});

        if(user){
            res.send(user);
            ApiRespinse.successResponseWithData(res,'verification successfully.',user);
        }else{
            throw new Error('verification Token is Expired , Please Request for new one');
        }
        }catch(err)
        {
            next(err)
        }

    }


    /**
     * Resend verification OTP to user email.
     * @function UserController/resendVerificationEmail
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */

    static  async resendVerificationEmail(req,res,next)
    {
        // const  email = req.query.email

        const  email = req.user.email
        const verificationToken = Utils.genericVerificationToken();
        try {
        const user = await   User.findOneAndUpdate(
                {email:email},
                {verification_token:verificationToken,
                    verification_token_time:Date.now() + new Utils().MAX_TOKEN_TIME
                });

                if(user){
                const mailer= await NodeMailer.sendEmail(
                        {
                            to:[user.email],
                            subject:'Resend Email Verification',
                            html:`<h1>${verificationToken}</1>`
                        
                        });

                    res.json({
                        success:true,
                        message:'Email send successfully'
                    });
                }else{
                    throw Error('User does not exists');
                }
        } catch (e) {
                next(e)
        }
    }


    /**
     * Login User and send jwt tocken for API verify.
     * @function UserController/login
     * @param {object} req  - http request object.
     * @param {object} res  - http response object.
     * @param {object} next - callback function to handle next request.
     */

    static  async  login(req,res,next){
        
        const password = req.query.password;
        const user = req.user;
        try{
            await Utils.compairPassword(
                {
                    plainPassword:password,
                    encryptedPassword:user.password
                }
            );
            const data = {
                user_id :user._id,
                email:user.email,

            }         
            const token = Jwt.sign(data,getEnviromentVariable().jwt_secret,{expiresIn:'120d'});
            const resData = {
                    user:user,
                    token:token
            }
            res.json(resData);
        }catch(e){
            next(e);
        }
        
    }
}