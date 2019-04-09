
    function redLamp(){
        currentValue = document.getElementById("redSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("redOn") : sendViaMQTT("redOff")
    }
    function greenLamp(){
        currentValue = document.getElementById("greenSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("greenOn") : sendViaMQTT("greenOff")
    }
    function blueLamp(){
        currentValue = document.getElementById("blueSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("blueOn") : sendViaMQTT("blueOff")
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
    host = "10.22.2.127";
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