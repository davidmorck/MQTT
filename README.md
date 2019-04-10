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
    function yellowLamp(){  // när vi trycker på den gula knappen på hemsidan så skickas "yellowOn" eller "yellowOff" till MQTT
        currentValue = document.getElementById("yellowSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("yellowOn") : sendViaMQTT("yellowOff")
    }
    function greenLamp(){   // när vi trycker på den gröna knappen på hemsidan så skickas "greenOn" eller "greenOff" till MQTT
        currentValue = document.getElementById("greenSwitch").checked;
        console.log(currentValue);
        (currentValue) ? sendViaMQTT("greenOn") : sendViaMQTT("greenOff")
    }
   
    
    function sendViaMQTT(color){    // här skickas meddelandet till MQTT. Alltså "yellowOff", "yelllowOn", "redOff" etc.
        console.log(color);
        message = new Paho.MQTT.Message(color.toString());
        message.destinationName = "lamp/lampa";
        client.send(message)
    }
function onConnect(){   // om vi lyckas ansluta till MQTT
    console.log("connected");
}

function onFail(){  // om vi misslyckas ansluta till MQTT
    console.log("connection failed");
}


function startConnect() {   // ansluter till MQTT
    // Generate a random client ID
    clientID = "clientID_" + parseInt(Math.random() * 100);
    host = "192.168.0.116"; // måste ändras för varje person
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

startConnect(); // säger att vi ska ansluta till MQTT direkt när programmet startar
```

* Titta igenom koden och läs igenom kommentarerna för att öka förståelsen.
* Öppna _**index.html**_ filen för att se hur hemsidan ser ut.  

### Steg 4
* Öppna Arduino programmet och skapa en ny fil
* Kopiera in koden nedan:
```c++
#include "EspMQTTClient.h"
void onConnectionEstablished();

#define led_pin D1 // red
#define led_pin1 D2 // yellow
#define led_pin2 D3 // green

EspMQTTClient client(
  "ABBIndgymIoT_2.4GHz",           // Wifi ssid
  "ValkommenHit!",           // Wifi password
  "192.168.0.116",  // MQTT broker ip
  1883,             // MQTT broker port
  "jocke",            // MQTT username
  "apa",       // MQTT password
  "mikrodator",          // Client name
  onConnectionEstablished, // Connection established callback
  true,             // Enable web updater
  true              // Enable debug messages
);

void setup()
{  pinMode(led_pin, OUTPUT);
   digitalWrite(led_pin, LOW);
   pinMode(led_pin1, OUTPUT);
   digitalWrite(led_pin1, LOW);
   pinMode(led_pin2, OUTPUT);
   digitalWrite(led_pin2, LOW);
    
  Serial.begin(115200);
}

//Skickar in siffra, om siffra är 0 så släck, 1 så tänd, över det så är det antal gånger den ska blinka.
void Lamp(String command){
  if (command == "redOn")
    digitalWrite(led_pin, HIGH);
  else if (command == "redOff")
    digitalWrite(led_pin, LOW);
  else if (command == "yellowOn")
    digitalWrite(led_pin1, HIGH);
  else if (command == "yellowOff")
    digitalWrite(led_pin1, LOW);
  else if (command == "greenOn")
    digitalWrite(led_pin2, HIGH); 
  else if (command == "greenOff")
    digitalWrite(led_pin2, LOW);
}

void onConnectionEstablished()
{
  client.subscribe("mess", [] (const String &payload)
  {
    Serial.println(payload);
  });

    client.subscribe("lamp/lampa", [] (const String &payload)
  {
        Serial.println(payload);
        //Gör om payload till ett nummer värde
    //    int number= payload.toInt();
   // if(payload=="change")W
    Lamp(payload);
  });
} 

void loop()
{

 //getTemperature();
   //  delay(5000);
  client.loop();
}

```
