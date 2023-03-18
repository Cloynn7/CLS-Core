const { SlashCommandBuilder, EmbedBuilder } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('feedback')
    .setDescription('Memberikan feedback hasil pembelian barang / jasa')
    .addUserOption(option =>
      option.setName('seller')
        .setDescription('Seller yang ingin di feedback')
        .setRequired(true)
    )
    .addChannelOption(option =>
      option.setName('produk')
        .setDescription('Channel produk yang kamu beli')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('pesan')
        .setDescription('Pesan untuk feedback seller')
        .setRequired(true)
    )
    .addNumberOption(option =>
      option.setName('rating')
        .setDescription('Rating antara 1 - 5')
        .setRequired(true)
        .setMinValue(1)
        .setMaxValue(5)
    ),
  async execute(interaction) {
    let seller = interaction.options.getUser('seller');
    let channel = interaction.options.getChannel('produk');
    let pesan = interaction.options.getString('pesan');
    let rating = interaction.options.getNumber('rating');

    if(!interaction.member.roles.cache.has('1047043131566215198')) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    if (rating < 1) {
      rating = '😒';
    } else if (rating > 5) {
      rating = '⭐⭐⭐⭐⭐';
    } else {
      rating = '⭐'.repeat(rating);
    };
    
    interaction.client.channels.cache.get('1047511491949113434').send({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `Feedback baru dari ${interaction.user.tag}`, iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: true}) })
        .setColor('Navy')
        .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
        .setDescription(`Seller: ${seller}\nBuyer: ${interaction.user}\nProduk: ${channel}\nRating: ${rating}\nPesan: ${pesan}`)
        .setFooter({ text: 'Terima kasih telah memberikan feedback!' })
        .setTimestamp()
      ]
    }).then(() => {
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`Berhasil mengirim feedback ke channel <#1047511491949113434>!`)
        ],
        ephemeral: true
      });
    });
  },
};