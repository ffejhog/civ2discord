const express = require('express')
const config = require('./config.json');
const { Webhook } = require('discord-webhook-node');
const hook = new Webhook(config.discordWebhook);

const app = express()
const port = 3000

app.use(express.json())

app.post('/', (req, res) => {

    const gameName = req.body.value1;
    const userName = req.body.value2;
    const turnNumber = req.body.value3;

    const discordName = lookupDiscordId(userName);

    hook.send("Its your turn <@" + discordName +">! \nGame name: " + gameName + "\nTurn number: " + turnNumber);

    res.send();
})

app.listen(port, () => {
  console.log(config);
  console.log(`Example app listening on port ${port}`)
})


function lookupDiscordId(civUsername) {
    let retrievedName = civUsername;
    config.userNameMappings.forEach((element) => {
        if (element.civName === civUsername) {
            retrievedName = element.discordId;
        }
    });
    return retrievedName;
}