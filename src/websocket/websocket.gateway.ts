import { OnGatewayConnection, OnGatewayDisconnect, OnGatewayInit, WebSocketGateway, WebSocketServer } from "@nestjs/websockets";
import { Server, Socket } from 'socket.io';
import * as jwt from 'jsonwebtoken';

@WebSocketGateway()
export class WebsocketGateway implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect {
    @WebSocketServer()
    server: Server;
    
    connections: Map<string, Socket> = new Map();
    
    handleConnection(socket: Socket, ...args: any[]) {
        const token = socket.handshake.auth.token;
        // authenticate the user based on their token
        try {
            const decoded = jwt.verify(token, 'your-secret-key');
            const userId = decoded.userId;
            this.connections.set(userId, socket);
        } catch (err){
            console.log(err);
            socket.disconnect();
        }
    }
    handleDisconnect(socket: Socket) {
        this.connections.forEach((value, key) => {
            if(value === socket){
                this.connections.delete(key);
            }
        })
    }

    emitConversationUpdate(conversationId: number){
        this.server.emit('conversationUpdate', conversationId);
    }

    
    afterInit(server: any) {
        console.log(`Successfull websocket connection ✅`)
    }
    
}