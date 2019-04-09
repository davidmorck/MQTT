# MQTT
Mqtt är en standard för att skicka data mellan olika enheter, huvdsakligen IOT-enheter. Tack vare mqtts lilla fotavtryck används den på platser där det behövs små datamängder eller snabba överföringar. 

För att illustrera hur snabb och enkel standarden är kommer vi idag göra en fjärrkontroll till tre lampor. Vi ska skriva kod för en hemsida och koppla lysdioder till en mikrokontroller. Vi kommer börja med att koda en hemsida som kommer fungera som en fjärrkontroll. Det som tar emot det hemsidan skickar är ett arduino-kort som är kopplad till 3 led-lampor. 


### Steg 1

* Klicka på den gröna knappen som säger *Clone or download* och välj *download ZIP*
* Extrahera filerna ur zip-filen.

### Steg 2

* Öppna Visual Studio Code
* Hitta och öppna filen _**script.js**_

### Steg 3

* Kopiera in koden nedan:
´´´javascript
    
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
´´´
