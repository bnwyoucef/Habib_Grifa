import { MessageBody, OnGatewayInit, SubscribeMessage, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server } from "socket.io";


@WebSocketGateway({
    cors: {
      origin: '*',
    },
  })
export class OrdersGateway implements OnGatewayInit{
    
    afterInit(server: any) {
        console.log('connected succefully...');
        
    }
    @WebSocketServer()
    server : Server; 
    
    
    @SubscribeMessage('add-order')
    async handleEvent(@MessageBody() data: string) {
      return data;
    }
}