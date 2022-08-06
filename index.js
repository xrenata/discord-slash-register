const { Client, Collection, MessageEmbed } = require("discord.js");
const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require("node:fs");
const config = require("./config.json");
const { QuickDB } = require("quick.db");
const db = new QuickDB(); 
const client = new Client({
    intents: 32767
});

client.config = require("./config")
client.db = db
client.commands = new Collection();
client.slash_commands = new Collection();
client.aliases = new Collection();
client.events = new Collection();

module.exports = client;

["slash", "event" , "function"].forEach(handler => {
    require(`./handlers/${handler}`)(client);
});

process.on('unhandledRejection', err => {
    console.log(`[HATA] Unhandled promise rejection: ${err.message}.`);
    console.log(err);
});

const AUTH = process.env.TOKEN || config.client.TOKEN;
if (!AUTH) {
    console.warn("[UYARI] Token girilmemiş!").then(async () => process.exit(1));
} else {
    client.login(AUTH).catch(() => console.log("[UYARI] Token hatalı."));
}