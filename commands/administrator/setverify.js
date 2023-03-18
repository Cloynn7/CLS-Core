const { SlashCommandBuilder, PermissionFlagsBits, EmbedBuilder, ChannelType, ActionRowBuilder, ButtonBuilder, ButtonStyle } = require('discord.js');
const { QuickDB } = require('quick.db');
const db = new QuickDB();

module.exports = {
  data: new SlashCommandBuilder()
    .setName('setverify')
    .setDescription('Setup sistem verifikasi dari bot')
    .addChannelOption(option =>
      option.setName('channel')
        .setDescription('Channel yang ada digunakan sebagai verify channel')
        .setRequired(true)  
    )
    .addRoleOption(option =>
      option.setName('role')
        .setDescription('Role yang akan diberikan ketika')
        .setRequired(true)
    )
    .addStringOption(option =>
      option.setName('pesan')
        .setDescription('Pesan yang akan ditampilkan di deskripsi verify')
        .setRequired(true)  
    ),
  async execute(interaction) {
    let channel = interaction.options.getChannel('channel');
    let role = interaction.options.getRole('role');
    let pesan = interaction.options.getString('pesan');

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
    if(data || data == 1) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Server ini telah mengatur verify channel, silahkan hapus terlebih dahulu.')
        ],
        ephemeral: true
      });
    };

    if(channel.type !== ChannelType.GuildText) {
      return interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Red')
          .setDescription('Channel yang bisa digunakan hanya channel pesan!')
        ],
        ephemeral: true
      });
    };
s
    await db.set(`roleVerify_${interaction.guild.id}`, role.id);
    await db.set(`channelVerify_${interaction.guild.id}`, channel.id);
    await db.set(`verify_${interaction.guild.id}`, 1);

    interaction.guild.channels.cache.get(channel.id).send({
      embeds: [
        new EmbedBuilder()
        .setTitle('Verify')
        .setColor('Navy')
        .setDescription(pesan)
        .setFooter({ text: 'Click the button below!' })
        .setTimestamp()
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('verify')
          .setLabel('Verify')
          .setStyle(ButtonStyle.Success)
        )
      ]
    }).then(async (msg) => {
      await db.set(`messageVerify_${interaction.guild.id}`, msg.id);
      interaction.reply({
        embeds: [
          new EmbedBuilder()
          .setColor('Green')
          .setDescription(`Berhasil mengirim verify ke channel ${channel}!`)
        ]
      });
    });
  },
};