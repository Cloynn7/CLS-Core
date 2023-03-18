const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('kick')
    .setDescription('Kick seseorang dari dalam server')
    .addUserOption(option =>
      option.setName('member')
        .setDescription('Member yang akan di kick')
        .setRequired(true)  
    )
    .addStringOption(option =>
      option.setName('alasan')
        .setDescription('Alasan untuk kick member tersebut')
        .setRequired(false)  
    ),
  async execute(interaction) {
    let member = interaction.options.getMember('member');
    let reason = interaction.options.getString('alasan') || 'Tidak diberi alasan';

    if(!interaction.member.permissions.has(PermissionFlagsBits.KickMembers)) {
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
          .setDescription('Kamu tidak bisa kick diri sendiri!')
        ],
        ephemeral: true
      });
    } else if(!member.kickable) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Sepertinya aku tidak bisa kick member tesebut.')
        ],
        ephemeral: true
      });
    };

    await member.kick(`By ${interaction.user.tag} with reason: ${reason}`).then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${interaction.user} baru saja kick **${member.user.tag}** dengan alasan: **${reason}**`)
        ]
      });
    });
  },
};