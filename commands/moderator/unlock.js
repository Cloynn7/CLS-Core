const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('unlock')
    .setDescription('Untuk membuka kunci channel'),
  async execute(interaction) {
    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    if(interaction.channel.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages)) {
      return interaction.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya channel ini tidak dalam keadaan dikunci.')
        ],
        ephemeral: true
      });
    };

    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: null }).then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${interaction.user} baru saja membuka kunci channel ini!`)
        ]
      });
    });
  },
};