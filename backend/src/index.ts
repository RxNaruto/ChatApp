import { WebSocketServer,WebSocket } from "ws";

const wss = new WebSocketServer({port: 8080});
let userCount = 0;

// let allSocket={
//     //  "room1":[socket1,socket2],
//     //  "123123":[socket],
// }

interface User{
    socket: WebSocket;
    room: string;
}
let allSocket: User[]=[];
wss.on("connection",(socket)=>{
   
    socket.on("message",(message)=>{
        const parsedMessage = JSON.parse(message as unknown as string);
        console.log(parsedMessage);
        if(parsedMessage.type=="join"){ 
            allSocket.push({
                socket,
                room: parsedMessage.payload.roomId
            })
        }
        if(parsedMessage.type=="chat"){
            let currentUserRoom = null;
            for(let i=0;i<allSocket.length;i++){
                if(allSocket[i].socket==socket){
                    currentUserRoom=allSocket[i].room
                }
            }
            for(let i =0;i<allSocket.length;i++){
                if(allSocket[i].room==currentUserRoom){
                    allSocket[i].socket.send(parsedMessage.payload.message);
                }
            }
        }
        
        
    })
   


})