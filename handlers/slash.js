const { REST } = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const fs = require('node:fs');
const { readdirSync } = require("fs");
const config = require("../config.json");
const ascii = require("ascii-table");
let table = new ascii("Slash Commands Handler");
table.setHeading('COMMANDS:', 'STATUS:');
let cmd = [];

module.exports = (client) => {
	readdirSync("./slash_commands/").forEach(dir => {
		const commands = readdirSync(`./slash_commands/${dir}`).filter(file => file.endsWith(".js"));
		for (let file of commands) {
			const command = require(`../slash_commands/${dir}/${file}`);
			if (command.data.name) {
				cmd.push(command.data.toJSON());
				client.slash_commands.set(command.data.name, command);
				table.addRow(client.slash_commands.size, file, '🟩');
			} else {
				table.addRow(client.slash_commands.size, file, '🟥');
				continue;
			}
		}
	});

	const rest = new REST({ version: '9' }).setToken(process.env.TOKEN || config.client.TOKEN);

	(async () => {
		try {
            if (!config.client.ID) {
                    console.log("[UYARI] Slash komutlarının aktif olması için gerekli işlemler yerine getirilmemiş readme.md dosyasını okuyup gerekenleri doldur.");
                    process.exit(1);      
            }
			if(!config.handlers.slash.guildID) {
				await rest.put(
					Routes.applicationCommands(config.client.ID),
					{ body: cmd },
				);
			} else {
				await rest.put(
					Routes.applicationGuildCommands(config.client.ID, config.handlers.slash.guildID),
					{ body: cmd },
				);
			};

			console.log(table.toString());
			console.log(`[HANDLER] ${client.slash_commands.size} Slash komutu yüklendi.`);
		} catch (error) {
			console.error(error);
		}
	})();
}