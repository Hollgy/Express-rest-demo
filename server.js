// https://insomnia.rest/download

const port = 3000;
const express = require('express');

// Ofta kallad för "app" eller "server"
const server = express();

// Middleware så att express fattar hur man läser json
const bodyParser = require('body-parser');
server.use(bodyParser.json());

// Lista av object
let db = [];

// Handler definierad som en anonym funktion
let getUsers = (req, res) => {
    res.status(200).send(JSON.stringify(db));
}

// Handler definierad som en vanlig funktion
function registerUser(req, res) {
    // Bodyn måste innehålla json med field "name"
    if (!req.body.name) {
        res.status(400).send("Missing name in request body");
        return; // Avsluta funktionen
    }

    // Databasen får inte redan innehålla namnet
    if (db.includes(req.body.name)) {
        res.status(400).send("User already exists");
        return; // Avsluta funktionen
    }

    db.push(req.body.name);
    res.status(200).send("Successfully added: " + req.body.name);
}

// Mounta vår getUsers handler på "/users"
server.get('/users', getUsers);
// Mounta vår registerUser handler på "/register"
server.post('/register', registerUser);

// Starta servern på port 3000 och ge den en callback som executeras när servern startar
server.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`)
});