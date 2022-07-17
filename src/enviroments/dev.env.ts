import { Enviroment } from "./env";

export const DevEnviroment:Enviroment ={
   db_url:'mongodb://127.0.0.1:27017/node_blog',
   // db_url:'mongodb+srv://w3school:Java$123@blogpost.gqwx5.mongodb.net/blogpost?retryWrites=true&w=majority',
   jwt_secret:'secret',
};