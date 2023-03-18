const { SlashCommandBuilder, EmbedBuilder, ActionRowBuilder, ButtonBuilder, ButtonStyle, ComponentType } = require('discord.js');

module.exports = {
  data: new SlashCommandBuilder()
    .setName('help')
    .setDescription('Melihat list perintah yang ada di bot'),
  async execute(interaction) {
    let msg = await interaction.reply({
      embeds: [
        new EmbedBuilder()
        .setAuthor({ name: `List Perintah ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
        .setColor('Navy')
        .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
        .setImage('https://cdn.discordapp.com/attachments/1046795819254284430/1081442462402363433/cleanstore.gif')
        .setDescription(`Server **${interaction.guild.name}**\nTotal perintah yang ada **${interaction.client.commands.size}**\nDeveloper [**Tokioshy#4631**](https://discord.com/channels/@me/1010474132753883207)\n\n**Kategori Perintah**\n⛔・Administrator\n👮‍♂️・Moderator\n🛒・Seller\n💸・Buyer\n⚙️・Lainnya`)
        .setFooter({ text: `© CleanStore.ID 2023`, iconURL: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }) })
        .setTimestamp()
      ],
      components: [
        new ActionRowBuilder()
        .addComponents(
          new ButtonBuilder()
          .setCustomId('administrator')
          .setLabel('Admin')
          .setEmoji('⛔')
          .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
          .setCustomId('moderator')
          .setLabel('Mod')
          .setEmoji('👮‍♂️')
          .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
          .setCustomId('seller')
          .setLabel('Seller')
          .setEmoji('🛒')
          .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
          .setCustomId('buyer')
          .setLabel('Buyer')
          .setEmoji('💸')
          .setStyle(ButtonStyle.Primary),
          new ButtonBuilder()
          .setCustomId('lainnya')
          .setLabel('Lainnya')
          .setEmoji('⚙️')
          .setStyle(ButtonStyle.Primary)
        )
      ]
    });

    let collector = await msg.createMessageComponentCollector({ componentType: ComponentType.Button, time: 180000 });
    collector.on('collect', async (i) => {
      if(i.user.id !== interaction.user.id) {
        return interaction.reply({
          embeds: [
            new EmbedBuilder()
            .setColor('Red')
            .setDescription('Seksi ini bukan milikmu!')
          ],
          ephemeral: true
        });
      };

      i.deferUpdate();
      if(i.customId == 'administrator') {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `List Perintah ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
            .setImage('https://cdn.discordapp.com/attachments/1046795819254284430/1081442462402363433/cleanstore.gif')
            .setDescription(`Server **${interaction.guild.name}**\nTotal perintah yang ada **${interaction.client.commands.size}**\nDeveloper [**Tokioshy#4631**](https://discord.com/channels/@me/1010474132753883207)\n\n**Perintah Administrator**\`\`\`yaml\ndeletemuterole, deleteverify, setmuterole, setverify\`\`\``)
            .setFooter({ text: `© CleanStore.ID 2023`, iconURL: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }) })
            .setTimestamp()
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('administrator')
              .setLabel('Admin')
              .setDisabled(true)
              .setEmoji('⛔')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('moderator')
              .setLabel('Mod')
              .setEmoji('👮‍♂️')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('seller')
              .setLabel('Seller')
              .setEmoji('🛒')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('buyer')
              .setLabel('Buyer')
              .setEmoji('💸')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('lainnya')
              .setLabel('Lainnya')
              .setEmoji('⚙️')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      };

      if(i.customId == 'moderator') {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `List Perintah ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
            .setImage('https://cdn.discordapp.com/attachments/1046795819254284430/1081442462402363433/cleanstore.gif')
            .setDescription(`Server **${interaction.guild.name}**\nTotal perintah yang ada **${interaction.client.commands.size}**\nDeveloper [**Tokioshy#4631**](https://discord.com/channels/@me/1010474132753883207)\n\n**Perintah Moderator**\`\`\`yaml\nban, clear, delete channel, kick, lock, mute, nuke, unlock, unmute, unwarn, warn\`\`\``)
            .setFooter({ text: `© CleanStore.ID 2023`, iconURL: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }) })
            .setTimestamp()
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('administrator')
              .setLabel('Admin')              
              .setEmoji('⛔')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('moderator')
              .setLabel('Mod')
              .setDisabled(true)
              .setEmoji('👮‍♂️')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('seller')
              .setLabel('Seller')
              .setEmoji('🛒')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('buyer')
              .setLabel('Buyer')
              .setEmoji('💸')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('lainnya')
              .setLabel('Lainnya')
              .setEmoji('⚙️')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      };

      if(i.customId == 'seller') {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `List Perintah ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
            .setImage('https://cdn.discordapp.com/attachments/1046795819254284430/1081442462402363433/cleanstore.gif')
            .setDescription(`Server **${interaction.guild.name}**\nTotal perintah yang ada **${interaction.client.commands.size}**\nDeveloper [**Tokioshy#4631**](https://discord.com/channels/@me/1010474132753883207)\n\n**Perintah Seller**\`\`\`yaml\ntestimoni\`\`\``)
            .setFooter({ text: `© CleanStore.ID 2023`, iconURL: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }) })
            .setTimestamp()
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('administrator')
              .setLabel('Admin')              
              .setEmoji('⛔')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('moderator')
              .setLabel('Mod')
              .setEmoji('👮‍♂️')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('seller')
              .setLabel('Seller')
              .setDisabled(true)
              .setEmoji('🛒')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('buyer')
              .setLabel('Buyer')
              .setEmoji('💸')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('lainnya')
              .setLabel('Lainnya')
              .setEmoji('⚙️')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      };

      if(i.customId == 'buyer') {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `List Perintah ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
            .setImage('https://cdn.discordapp.com/attachments/1046795819254284430/1081442462402363433/cleanstore.gif')
            .setDescription(`Server **${interaction.guild.name}**\nTotal perintah yang ada **${interaction.client.commands.size}**\nDeveloper [**Tokioshy#4631**](https://discord.com/channels/@me/1010474132753883207)\n\n**Perintah Buyer**\`\`\`yaml\nfeedback\`\`\``)
            .setFooter({ text: `© CleanStore.ID 2023`, iconURL: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }) })
            .setTimestamp()
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('administrator')
              .setLabel('Admin')              
              .setEmoji('⛔')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('moderator')
              .setLabel('Mod')
              .setEmoji('👮‍♂️')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('seller')
              .setLabel('Seller')              
              .setEmoji('🛒')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('buyer')
              .setLabel('Buyer')
              .setDisabled(true)
              .setEmoji('💸')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('lainnya')
              .setLabel('Lainnya')
              .setEmoji('⚙️')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      };

      if(i.customId == 'lainnya') {
        interaction.editReply({
          embeds: [
            new EmbedBuilder()
            .setAuthor({ name: `List Perintah ${interaction.client.user.username}`, iconURL: interaction.client.user.displayAvatarURL({ forceStatic: true, extension: 'png' }) })
            .setColor('Navy')
            .setThumbnail(interaction.guild.iconURL({ forceStatic: true, extension: 'png' }))
            .setImage('https://cdn.discordapp.com/attachments/1046795819254284430/1081442462402363433/cleanstore.gif')
            .setDescription(`Server **${interaction.guild.name}**\nTotal perintah yang ada **${interaction.client.commands.size}**\nDeveloper [**Tokioshy#4631**](https://discord.com/channels/@me/1010474132753883207)\n\n**Perintah Lainnya**\`\`\`yaml\nhelp, ping\`\`\``)
            .setFooter({ text: `© CleanStore.ID 2023`, iconURL: interaction.guild.iconURL({ forceStatic: true, extension: 'png' }) })
            .setTimestamp()
          ],
          components: [
            new ActionRowBuilder()
            .addComponents(
              new ButtonBuilder()
              .setCustomId('administrator')
              .setLabel('Admin')              
              .setEmoji('⛔')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('moderator')
              .setLabel('Mod')
              .setEmoji('👮‍♂️')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('seller')
              .setLabel('Seller')              
              .setEmoji('🛒')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('buyer')
              .setLabel('Buyer')              
              .setEmoji('💸')
              .setStyle(ButtonStyle.Primary),
              new ButtonBuilder()
              .setCustomId('lainnya')
              .setLabel('Lainnya')
              .setDisabled(true)
              .setEmoji('⚙️')
              .setStyle(ButtonStyle.Primary)
            )
          ]
        });
      };
    });
  },
};