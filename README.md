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

* Kopiera in koden nedan i javascript filen:

```javascript

    function redLamp(){ // när vi trycker på den röda knappen på hemsidan så skickas "redOn" eller "redOff" till MQTT
        currentValue = document.getElementById("redSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("redOn") : sendViaMQTT("redOff")
    }
    function greenLamp(){  // när vi trycker på den gröna knappen på hemsidan så skickas "greenOn" eller "greenOff" till MQTT
        currentValue = document.getElementById("greenSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("greenOn") : sendViaMQTT("greenOff")
    }
    function blueLamp(){  // när vi trycker på den blåa knappen på hemsidan så skickas "blueOn" eller "blueOff" till MQTT
        currentValue = document.getElementById("blueSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("blueOn") : sendViaMQTT("blueOff")
    }
    
    function sendViaMQTT(color){ // här skickas meddelandet till MQTT. Alltså "blueOff", "blueOn", "redOff" etc.
        console.log(color);
        message = new Paho.MQTT.Message(color.toString());
        message.destinationName = "lamp/lampa";
        client.send(message)
    }
function onConnect(){ // om vi lyckas ansluta till MQTT
    console.log("connected");
}

function onFail(){ // om vi misslyckas ansluta till MQTT
    console.log("connection failed");
}


function startConnect() { // ansluter till MQTT
    clientID = "clientID_" + parseInt(Math.random() * 100);
    host = "10.22.2.127";   # måste ändras för varje person
    port = 1884;
    
    client = new Paho.MQTT.Client(host, Number(port), clientID);

    client.connect({ 
        onSuccess: onConnect,
        onFailure: onFail
    });
}

startConnect(); // säger att vi ska ansluta till MQTT direkt när programmet startar
```

* Titta igenom koden och läs igenom kommentarerna för att öka förståelsen.
* Öppna _**index.html**_ filen för att se hur hemsidan ser ut.  

### Steg 4
* Öppna Arduino programmet och skapa en ny fil
* Kopiera in koden nedan:
```c++

```
