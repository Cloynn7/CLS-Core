const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('nuke')
    .setDescription('Menghapus channel dan membuat channel baru yang sama'),
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

    try {
      let channel = interaction.channel;
      let position = interaction.channel.position;
      let newChannel = await channel.clone();

      channel.delete();
      newChannel.setPosition(position);
      newChannel.send({
        embeds: [
          new EmbedBuilder()
          .setAuthor({ name: `Nuked by ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
          .setColor('DarkAqua')
          .setImage('https://tenor.com/bWEu0.gif')
        ]
      });
    } catch (error) {
      console.log(error)
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Terjadi kesalahan ketika mencoba nuke channel.')
        ],
        ephemeral: true
      });
    };
  },
};