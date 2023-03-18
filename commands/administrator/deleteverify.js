const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('deleteverify')
    .setDescription('Menghapus sistem verifikasi dari bot'),
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

    let data = await db.get(`verify_${interaction.guild.id}`);
    if(!data || data == 0) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Server ini belum mengatur sistem verifikasi!')
        ],
        ephemeral: true
      });
    };

    let ch = await db.get(`channelVerify_${interaction.guild.id}`);
    let msg = await db.get(`messageVerify_${interaction.guild.id}`);
    interaction.guild.channels.cache.get(ch).messages.fetch(msg).then(async (msg) => {
      await db.delete(`roleVerify_${interaction.guild.id}`);
      await db.delete(`channelVerify_${interaction.guild.id}`);
      await db.delete(`verify_${interaction.guild.id}`);
      await db.delete(`messageVerify_${interaction.guild.id}`);
      msg.delete();
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`${interaction.user} baru saja menghapus sistem verifikasi dari server!`)
        ]
      });
    }).catch(async (error) => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Terjadi kesalahan, bot akan langsung menghapus data sistem verifikasi.')
        ],
        ephemeral: true
      });
      console.log(error);
      await db.delete(`roleVerify_${interaction.guild.id}`);
      await db.delete(`channelVerify_${interaction.guild.id}`);
      await db.delete(`verify_${interaction.guild.id}`);
      await db.delete(`messageVerify_${interaction.guild.id}`);
    });
  },
};