const mosca = require('mosca')

// inställningar
const settings ={
    port:1883,
    http: {
        bundle: true,
        static: './',
        port: 1884
    }
    

}

const server = new mosca.Server(settings); // skapar en ny server


// när servern är redo. 
server.on('ready', function(){
    console.log("redo")
})

// skriver ut clientens id i consolen när den ansluter. 
server.on('clientConnected', function(client){
    console.log("Client connected", client.id)
})

server.on('published', function(packet){
    
    console.log("published message",packet.payload.toString(), " on ", packet.topic)
})
