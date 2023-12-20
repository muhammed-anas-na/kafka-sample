import {Kafka} from 'kafkajs';

class KafkaService{
    constructor(){
        this.kafka = new Kafka({
            clientId:'nodejs-kafka',
            brokers:['localhost:9092']
        })
        this.producer = this.kafka.producer();
        this.consumer = this.kafka.consumer({groupId:'test-group'});

    }

    async produce(topic , message){
        try {
            await this.producer.connect();
            await this.producer.send({
                topic:topic,
                messages:message
            })
            console.log("Message send succesfully!")
        } catch (error) {
            console.log(error)
        } finally{
            await this.producer.disconnect();
        }
    }

    async consume(topic , callback){
        try {
            await this.consumer.connect();
            await this.consumer.subscribe({topic:topic , fromBeginning:true})
            await this.consumer.run({
                eachMessage:async ({topic,partition,message}) =>{
                    const values = message.value.toString();
                    callback(values);
                }
            })
        } catch (error) {
            console.log(error);
        }
    }
}
export default KafkaService