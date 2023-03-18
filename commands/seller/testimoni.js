const { SlashCommandBuilder, EmbedBuilder, ComponentType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('testimoni')
    .setDescription('Membuat testimoni hasil penjualan')
    .addChannelOption(option => 
      option.setName('produk')
        .setDescription('Channel barang atau jasa mu')
        .setRequired(true)  
    )
    .addUserOption(option => 
      option.setName('buyer')
        .setDescription('Pembeli barang atau jasa mu')
        .setRequired(true)
    )
    .addAttachmentOption(option => 
      option.setName('screenshot')
        .setDescription('Sceenshoot hasil jadi barang / jasa mu')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('price')
        .setDescription('Price atau harga barang / jasa mu')
        .setRequired(true)
    )
    .addStringOption(option => 
      option.setName('payment')
        .setDescription('Payment method yang digunakan pembeli')
        .setRequired(true)
    ),
  async execute(interaction) {
    let ch = interaction.options.getChannel('produk');
    let member = interaction.options.getMember('buyer');
    let img = interaction.options.getAttachment('screenshot');
    let price = interaction.options.getString('price');
    let payment = interaction.options.getString('payment');

    if(!interaction.member.roles.cache.has('1046799362396794880')) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Kamu tidak memiliki izin untuk menggunakan perintah ini!')
        ],
        ephemeral: true
      });
    };

    let msg = await interaction.reply({
      content: 'Konfirmasi sebelum mengirim testimoni, apakah sudah benar?',
      embeds: [
        new EmbedBuilder()
        .setColor('Navy')
        .setAuthor({ name: `Testimoni ke ...`, iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: true}) })
        .setThumbnail(member.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
        .setDescription(`Seller: ${interaction.user}\nBuyer: ${member}\nProduk: ${ch}\nPrice: ${price}\nPayment: ${payment}`)
        .setImage(`${img.url}`)
        .setFooter({ text: 'Terima kasih telah membeli!' })
        .setTimestamp()
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('ya')
          .setLabel('Benar')
          .setStyle(ButtonStyle.Success),
          new ButtonBuilder()
          .setCustomId('tidak')
          .setLabel('Salah')
          .setStyle(ButtonStyle.Danger)
        )
      ],
      ephemeral: true
    });

    let collector = await msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 180000 });
    collector.on('collect', async (i) => {
      if(i.customId === 'ya') {
        await db.add('testimoni', 1);
        let data = await db.get('testimoni');

        if(!member.roles.cache.has('1047043131566215198')) {
          member.roles.add('1047043131566215198').catch((error) => { return; });
        };

        interaction.client.channels.cache.get('1047510820042592310').send({
          embeds: [
            new EmbedBuilder()
            .setColor('Navy')
            .setAuthor({ name: `Testimoni ke ${data}`, iconURL: interaction.user.displayAvatarURL({ extension: 'png', forceStatic: true}) })
            .setThumbnail(member.user.displayAvatarURL({ forceStatic: true, extension: 'png' }))
            .setDescription(`Seller: ${interaction.user}\nBuyer: ${member}\nProduk: ${ch}\nPrice: ${price}\nPayment: ${payment}`)
            .setImage(`${img.url}`)
            .setFooter({ text: 'Terima kasih telah membeli!' })
            .setTimestamp()
          ]
        }).then(() => {
          interaction.editReply({
            content: '',
            embeds: [
              new EmbedBuilder()
              .setColor('Green')
              .setDescription('Berhasil mengirim testimoni ke channel <#1047510820042592310>!')
            ],
            components: [],
            ephemeral: false
          });
        });
      };

      if(i.customId === 'tidak') {
        interaction.deleteReply();
      }
    });

    collector.on('end', async (i) => {
      if(i.size === 0) {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Kamu tidak mengklik button, semua dibatalkan.')
          ],
          components: []
        });
      };
    });
  },
};