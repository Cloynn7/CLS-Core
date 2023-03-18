const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('mute')
    .setDescription('Mute seseorang dari chat dan voice')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan dimute')
        .setRequired(true)
    )
    .addUserOption(option =>
      option.setName('alasan')
        .setDescription('Alasan mengapa mute member tersebut')
        .setRequired(false)  
    ),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let reason = interaction.options.getString('alasan') || 'Tidak diberi alasan';

    if(!interaction.member.permissions.has(PermissionFlagsBits.ManageRoles)) {
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

    if(member.id === interaction.user.id) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak bisa mute diri sendiri!')
        ],
        ephemeral: true
      });
    } else if(member.permissions.has(PermissionFlagsBits.Administrator)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak bisa mute seseorang yang memiliki izin administrator!')
        ],
        ephemeral: true
      });
    } else if(interaction.member.roles.cache.has(data)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya member tersebut telah di mute.')
        ],
        ephemeral: true
      });
    };

    await member.roles.add(data).then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${interaction.user} baru saja mute ${member} dengan alasan: **${reason}**`)
        ]
      });
    });
  },
};