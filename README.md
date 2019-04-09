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

´´´javascript
var hej;
    

´´´
