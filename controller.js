
import KafkaService from "./config.js";



    async function sendMessage(req,res){
        // console.log(req.body)
        const message = "This is a sample message"
        const Kafka = new KafkaService();

        function sendLocation(){
            console.log("Hii")
            const messages = [
                {key:'key1' , value:message}
            ]
            Kafka.produce('second-topic' , messages);

        }
        setInterval(sendLocation , 1000)

        res.status(200).json({
            status:"OK!",
            message:"Message send succesfully :)"
        })
    }

export default sendMessage;
