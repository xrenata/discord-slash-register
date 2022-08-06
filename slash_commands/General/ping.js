const { SlashCommandBuilder } = require('@discordjs/builders'); 

module.exports = {
	data: new SlashCommandBuilder()
		.setName('ping')
		.setDescription('Botun gecikme süresini verir.'),
	async run(client, interaction) {
		interaction.reply(`${client.ws.ping}`)
	},
};
