const { Events, EmbedBuilder } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  name: Events.InteractionCreate,
  async execute(interaction) {
    if(interaction.isChatInputCommand()) {
      const command = interaction.client.commands.get(interaction.commandName);
      if(!command) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Perintah dengan nama \`${interaction.commandName}\` tidak ditemukan.`)
          ],
          ephemeral: true
        });
        return;
      };
  
      try {
        await command.execute(interaction)
      } catch (error) {
        interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription(`Terjadi kesalahan ketika menjalankan perintah \`${interaction.commandName}\`.`)
          ],
          ephemeral: true
        });
        console.log(error);
      };
    };

    if(interaction.isButton()) {
      if(interaction.customId === 'verify') {
        let role = await db.get(`roleVerify_${interaction.guild.id}`);
        
        try {
          interaction.member.roles.add(role);
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Green')
              .setDescription('Berhasil verifikasi! Selamat belanja di server ini!')
            ],
            ephemeral: true
          });
        } catch (error) {
          console.log(error);
          interaction.reply({
            embeds: [
              new EmbedBuilder()
              .setColor('Red')
              .setDescription('Terjadi kesalahan, hubungi <@1010474132753883207> untuk melaporkan bug atau staff server untuk mendapatkan role secara manual.')
            ],
            ephemeral: true
          });
        };
      };
    };
  },
};