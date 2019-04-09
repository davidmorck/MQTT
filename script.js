
    function redLamp(){
        currentValue = document.getElementById("redSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("redOn") : sendViaMQTT("redOff")
    }
    function yellowLamp(){
        currentValue = document.getElementById("yellowSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("yellowOn") : sendViaMQTT("yellowOff")
    }
    function greenLamp(){
        currentValue = document.getElementById("greenSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("greenOn") : sendViaMQTT("greenOff")
    }
   
    
    function sendViaMQTT(color){
        console.log(color);
        message = new Paho.MQTT.Message(color.toString());
        message.destinationName = "lamp/lampa";
        client.send(message)
    }
function onConnect(){
    console.log("connected");
}

function onFail(){
    console.log("connection failed");
}


function startConnect() {
    // Generate a random client ID
    clientID = "clientID_" + parseInt(Math.random() * 100);
    host = "192.168.0.116";
    port = 1884;
    // Fetch the hostname/IP address and port number from the form

    // Print output for the user in the messages div
    // Initialize new Paho client connection
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    // Set callback handlers
    //client.onConnectionLost = onConnectionLost;
    //client.onMessageArrived = onMessageArrived;

    client.connect({ 
        onSuccess: onConnect,
        onFailure: onFail
    });
}

startConnect();