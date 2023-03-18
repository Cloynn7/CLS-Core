const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Melihat seberapa cepat bot merespond'),
  async execute(interaction) {
    await interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setDescription(`🏓 Pong! \`${interaction.client.ws.ping}ms\``)
      ]
    });
  },
};