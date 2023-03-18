const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('ban')
    .setDescription('Ban seseorang dari dalam server')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan di ban')
        .setRequired(true)  
    )
    .addStringOption(option =>
      option.setName('alasan')
        .setDescription('Alasan untuk ban member tersebut')
        .setRequired(false)  
    ),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let reason = interaction.options.getString('alasan') || 'Tidak diberi alasan';

    if(!interaction.member.permissions.has(PermissionFlagsBits.BanMembers)) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    if(member.id === interaction.user.id) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak bisa ban diri sendiri!')
        ],
        ephemeral: true
      });
    } else if(!member.bannable) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya aku tidak bisa ban member tesebut.')
        ],
        ephemeral: true
      });
    };

    await member.ban(`By ${interaction.user.tag} with reason: ${reason}`).then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${interaction.user} baru saja banned **${member.user.tag}** dengan alasan: **${reason}**`)
        ]
      });
    });
  },
};