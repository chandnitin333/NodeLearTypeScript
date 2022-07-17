import { Enviroment } from "./env";

export const ProdEnviroment:Enviroment ={
    db_url:'mongodb://127.0.0.1:27017/node_blog',
    jwt_secret:'prod_secret',
};