const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deletemuterole')
    .setDescription('Untuk menghapus data mute role di server'),
  async execute(interaction) {
    if(!interaction.member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    let data = await db.get(`muteRole_${interaction.guild.id}`);
    if(!data) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya server belum mengatur role mute.')
        ],
        ephemeral: true
      });
    };

    await db.delete(`muteRole_${interaction.guild.id}`);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${interaction.user} baru saja menghapus role mute!`)
      ]
    });
  },
};