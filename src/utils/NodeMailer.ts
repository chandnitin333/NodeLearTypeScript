import* as nodemailer from "nodemailer";
import * as SendGrid from 'nodemailer-sendgrid-transport';


export class NodeMailer{

    private static initializedTransport(){
        return nodemailer.createTransport({
            host: "smtp.gmail.com",
            port: 587,
            secure: false,
            auth: {
                user: 'chand.nitin333@gmail.com' ,
                pass: 'JanuAK@47'
            }
        })
    }

    static sendEmail(data: {to:[string],subject:string ,html:string }):Promise<any> {
       return NodeMailer.initializedTransport().sendMail({ from: 'No-Replay',to:data.to,subject:data.subject,html:data.html})
       
    }

}