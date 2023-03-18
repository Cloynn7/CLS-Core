const {
  SlashCommandBuilder,
  PermissionFlagsBits,
  EmbedBuilder,
} = require("discord.js");

module.exports = {
  data: new SlashCommandBuilder()
    .setName("delch")
    .setDescription("Menghapus channel"),
  async execute(interaction) {
    if (
      !interaction.member.permissions.has(PermissionFlagsBits.ManageChannels)
    ) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Kamu tidak memiliki izin untuk menggunakan perintah ini!"
            ),
        ],
        ephemeral: true,
      });
    }

    try {
      let channel = interaction.channel;
      await channel.delete();
    } catch (error) {
      console.log(error);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
            .setColor("Red")
            .setDescription(
              "Terjadi kesalahan ketika mencoba menghapus channel."
            ),
        ],
        ephemeral: true,
      });
    }
  },
};
