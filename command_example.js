const { SlashCommandBuilder } = require('@discordjs/builders');
               
module.exports = {
    data: new SlashCommandBuilder()
        .setName('command')
        .setDescription('command info'),
        async run(client, interaction) {
            //code
    }
}