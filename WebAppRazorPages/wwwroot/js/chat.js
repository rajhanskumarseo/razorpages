﻿"use strict";

var connection = new signalR.HubConnectionBuilder().withUrl("/chatHub?userid=" + document.getElementById("receiverInput").value).build();
console.log("Console result");
console.log(document.getElementById("receiverInput").value);
//Disable send button until connection is established
document.getElementById("sendButton").disabled = true;

connection.on("ReceiveMessage", function (user, message) {
    var li = document.createElement("li");
    document.getElementById("messagesList").appendChild(li);
    // We can assign user-supplied strings to an element's textContent because it
    // is not interpreted as markup. If you're assigning in any other way, you 
    // should be aware of possible script injection concerns.
    li.textContent = `${user} says ${message}`;
});

connection.start().then(function () {
    document.getElementById("sendButton").disabled = false;
}).catch(function (err) {
    return console.error(err.toString());
});

document.getElementById("sendButton").addEventListener("click", function (event) {
    //var user = document.getElementById("userInput").value;
    var receiver = document.getElementById("receiverInput").value;
    var message = document.getElementById("messageInput").value;
    connection.invoke("SendMessageToGroup", receiver, message).catch(function (err) {
        return console.error(err.toString());
    });
    event.preventDefault();
});