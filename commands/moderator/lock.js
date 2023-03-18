const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('lock')
    .setDescription('Untuk mengkunci channel sementara dari member')
    .addStringOption(option =>
      option.setName('alasan')
        .setDescription('Alasan untuk dikuncinya channel ini')
        .setRequired(false)  
    ),
  async execute(interaction) {
    let reason = interaction.options.getString('alasan') || 'Tidak diberi alasan';

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

    if(!interaction.channel.permissionsFor(interaction.guild.id).has(PermissionFlagsBits.SendMessages)) {
      return interaction.channel.send({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya channel ini telah dikunci sebelumnya.')
        ],
        ephemeral: true
      });
    };

    await interaction.channel.permissionOverwrites.edit(interaction.guild.id, { SendMessages: false }, { reason: `Locked by ${interaction.user.tag}` }).then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${interaction.user} baru saja mengkunci channel ini dengan alasan: ${reason}`)
        ]
      });
    });
  },
};