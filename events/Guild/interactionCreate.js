const client = require('../../index.js');
const config = require("../../config.json");

client.on('interactionCreate', async interaction => {
    if (!interaction.isCommand()) return;

    const command = client.slash_commands.get(interaction.commandName);

    if (!command) return interaction.reply({ content: "Geçersiz komut geliştirici ile iletişime geçin.", ephemeral: true });

    try {
        await command.run(client, interaction);
    } catch (e) {

        await interaction.reply({ content: "Geçersiz komut geliştirici ile iletişime geçin.", ephemeral: true });
    }
});