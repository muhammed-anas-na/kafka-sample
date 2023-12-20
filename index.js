import express from 'express';
import bodyparser from 'body-parser'
import sendMessage from './controller.js'
import KafkaService from './config.js';


const app = express();
const jsonParse = bodyparser.json();

app.post('/send' , sendMessage)


const kafka = new KafkaService();
// kafka.consume('my-topic' , (value)=>{
//     console.log("Recieved value => ", value)
// })


kafka.consume('second-topic' ,(value)=>{
    console.log("Recieved message =>  " ,value)
})
app.listen(3000,()=>{
    console.log("Server started at port 3000")
})


