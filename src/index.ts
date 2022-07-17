import {Server} from './server';

let server = new Server().app;

let port =5000;
// console.log(WebAssembly);
server.listen(port,()=>{
        console.log(`Server Listen poert :`,port)
})

