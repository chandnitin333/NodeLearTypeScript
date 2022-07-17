
import { rejects } from "assert";
import * as Bcrypt from "bcrypt";
import { resolve } from "path/posix";
export class Utils{
    public MAX_TOKEN_TIME = 3600000;
    static genericVerificationToken(size=5){
        let digit ='0123456789';

        let otp ='';
        for(let i =0; i < size ; i++){
            otp += digit[Math.floor(Math.random() * 10)];
        }
        return parseInt(otp);
    }


     static  async encryptPassword(password){
        return new Promise((resolve,reject )=>{
            Bcrypt.hash(password,10,( async (err,hash) =>{
                
                if(err){
                    reject(err);
                }else{
                    resolve(hash);
                }

            }));

            
        });
    }

    static async compairPassword(password:{plainPassword:string,encryptedPassword:string}):Promise<any>{
        return new Promise((resolve,rejects)=>{
            Bcrypt.compare(password.plainPassword,password.encryptedPassword,((err,isSame)=>{
                    if(err){
                        rejects(err)
                    } else if(!isSame){
                        rejects(new Error("User and Password does not match"));
                    }else{
                        resolve(true);
                    }
            }));
        })
    }

}