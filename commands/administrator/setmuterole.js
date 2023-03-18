const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setmuterole')
    .setDescription('Untuk set mute role yang diinginkan')
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Role yang akan di atur menjadi mute role')
        .setRequired(true)  
    ),
  async execute(interaction) {
    let role = interaction.options.getRole('role');

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

    await db.set(`muteRole_${interaction.guild.id}`, role.id);
    interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setColor('Green')
        .setDescription(`${interaction.user} baru saja mengatur mute role menjadi ${role}!`)
      ]
    });
  },
};