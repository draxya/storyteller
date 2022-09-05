const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, Client, Intents } = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    if (!interaction.isButton()) return;
    c = interaction.channel
    if (interaction.customId == "bob-basla") {
      if (client.guilds.cache.get(interaction.guildId).channels.cache.find(c => c.topic == interaction.user.id)) {
        return interaction.reply({
          content: 'Bu hikayeye zaten başlamışsın.',
          ephemeral: true
        });
      };

      interaction.guild.channels.create(`dunyadaki-son-insan-bob-${interaction.user.username}`, {
        parent: client.config.parentOpened,
        topic: interaction.user.id,
        permissionOverwrites: [{
          id: interaction.user.id,
          allow: ['VIEW_CHANNEL'],
          deny: ['SEND_MESSAGES'],
        },
        {
          id: interaction.guild.roles.everyone,
          deny: ['VIEW_CHANNEL'],
        },
        ],
        type: 'text',
      }).then(async c => {
        interaction.reply({
          content: `Hikayen başladı! <#${c.id}>`,
          ephemeral: true
        });

        const embed = new client.discord.MessageEmbed()
          .setColor('6d6ee8')
          .setTitle('Hikayen Başladı!')
          .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
          .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
          .setDescription(`Çoğu insan gibi karısı ve çocuklarını geçindirmek için her gün işe giden ve onun için en önemli şey ailesi olan, sıradan ve sıkıcı bir hayatı olan Bob, daha önce hiç alışık olmadığı bir sabaha uyanmıştı. Evi bomboştu. Ailesi neredeydi? Etraf olması gerektiğinden daha sessizdi. Bob ne yapacağını bilemiyordu. Bob'un bu hikayesinde ona eşlik edecek misin?`)
          .setTimestamp();

        const row = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('bob-restart')
              .setEmoji('🔁')
              .setStyle('PRIMARY'),
            new MessageButton()
              .setCustomId('sil')
              .setEmoji('🗑️')
              .setStyle('DANGER'),
          );
        await c.bulkDelete(3)
        msg = await c.send({
          //content: ``,
          embeds: [embed],
          components: [row]
        });

        const ilkrow = new MessageActionRow()
          .addComponents(
            new MessageButton()
              .setCustomId('bob-sese-git')
              .setLabel('Karşı evdeki sese git.')
              .setStyle('SECONDARY'),
            new MessageButton()
              .setCustomId('bob-sehir-merkezi')
              .setLabel('Şehir merkezine git.')
              .setStyle('SECONDARY'),
          );

        msg = await c.send({
          content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016100041678659644/DUNYADAKI_SON_INSANBOB.mp4`,
        });
        setTimeout(() => {
          msg.edit({
            components: [ilkrow]
          }).catch(e => console.log('Timed out.'))
        }, 75000)

      });
    }
    else if (interaction.customId == "sil") {
      interaction.reply(`Hikayeniz sonlandırılıyor..`).then(() => {
        setTimeout(() => {
          if (c.deletable) {
            c.delete();
          };
        }, 3000);
      });
    }
    else if (interaction.customId == "bob-restart") {
      //await c.bulkDelete(1)
      sonmesaj = interaction.channel.lastMessageId
      const mesaj = await interaction.channel.messages.fetch(sonmesaj)
      await interaction.reply({ content: 'Hikayeniz baştan başlatıldı!', ephemeral: true })
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-sese-git')
            .setLabel('Karşı evdeki sese git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-sehir-merkezi')
            .setLabel('Şehir merkezine git.')
            .setStyle('SECONDARY'),
        );
      msg = await mesaj.edit({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016100041678659644/DUNYADAKI_SON_INSANBOB.mp4`,
        components: []
      });
      setTimeout(() => {
        mesaj.edit({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 75000)
    }

    else if (interaction.customId == "bob-bastan-basla") {
      await c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-sese-git')
            .setLabel('Karşı evdeki sese git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-sehir-merkezi')
            .setLabel('Şehir merkezine git.')
            .setStyle('SECONDARY'),
        );
      msg = await mesaj.edit({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016100041678659644/DUNYADAKI_SON_INSANBOB.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 75000)
    }

    else if (interaction.customId == "bob-sese-git") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrumu-arastir')
            .setLabel('Bodrumu araştır.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-otogara-git')
            .setLabel('Otogara git.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016118147620802590/KARSI_EVDEKI_SESE_GIT.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 57000)
    }
    else if (interaction.customId == "bob-otogara-git") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-sehir-merkezi')
            .setLabel('Şehir merkezine git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-terminale-gir')
            .setLabel('Terminale gir.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016123798707240963/OTOGARA_GIT..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 55000)
    }

    else if (interaction.customId == "bob-terminale-gir") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-sehir-merkezi')
            .setLabel('Şehir merkezine git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-terminal-kilidi-ac')
            .setLabel('Kilidi açmaya çalış.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016440530294554633/TERMINALE_GIR..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 55000)
    }

    else if (interaction.customId == "bob-terminal-kilidi-ac") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-sehir-merkezi')
            .setLabel('Şehir merkezine git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-terminal-hayir')
            .setLabel('Hayır.')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016441211898298410/KILIDI_ACMAYA_CALIS..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 90000)
    }

    else if (interaction.customId == "bob-terminal-hayir") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-kabul-etme')
            .setLabel('Kabul Etme.')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('bob-kabul-et')
            .setLabel('Kabul Et.')
            .setStyle('SUCCESS'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016441843858292856/HAYIR..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 90000)
    }

    else if (interaction.customId == "bob-kabul-etme") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 8/10: İntihar`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016442278002307082/KABUL_ETME..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 8/10`)
      }, 115000)
    }

    else if (interaction.customId == "bob-kabul-et") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 7/10: Kötü Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016442958318403684/KABUL_ET.mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 7/10`)
      }, 86000)
    }

    else if (interaction.customId == "bob-bodrumu-arastir") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-otogara-git')
            .setLabel('Otogara git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-kapiyi-acmaya-calis')
            .setLabel('Kapıyı açmaya çalış.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016123081011515452/BODRUMU_ARASTIR..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 57000)
    }

    else if (interaction.customId == "bob-kapiyi-acmaya-calis") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrumda-bekle')
            .setLabel('Otogara git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bastan-basla')
            .setLabel('Baştan başla.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016443843375284224/KAPIYI_ACMAYA_CALIS.mp4`,
        components: []
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 75000)
    }

    else if (interaction.customId == "bob-bodrumda-bekle") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrum-kabul-et')
            .setLabel('Kabul et.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrumda-bekle-1')
            .setLabel('Bodrumda bekle.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016446362683981904/BODRUMDA_BEKLE..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 57000)
    }

    else if (interaction.customId == "bob-bodrumda-bekle-1") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-dedektif')
            .setLabel('Dedektif Bob.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrumda-bekle-2')
            .setLabel('Bodrumda bekle.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016449800352321597/BODRUMDA_BEKLEE..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 55000)
    }

    else if (interaction.customId == "bob-dedektif") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-david-kolsky')
            .setLabel('David Kolsky')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-richard-boyle')
            .setLabel('Richard Boyle')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-turkan-soray')
            .setLabel('Türkan Şoray')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-phill-havers')
            .setLabel('Phill Havers')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016455317585932429/DEDEKTIF_BOB..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 60000)
    }

    else if (interaction.customId == "bob-david-kolsky") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 10/10: Mutlu Dedektif Sonu`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016456922255331428/DAVID_KOLSKY..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 10/10`)
      }, 100000)
    }

    else if (interaction.customId == "bob-richard-boyle") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 9/10: Mutsuz Dedektif`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016457072453361674/RICHARD_BOYLE..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 9/10`)
      }, 60000)
    }

    else if (interaction.customId == "bob-turkan-soray") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 9/10: Mutsuz Dedektif`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016456759214346321/TURKAN_SORAY.mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 9/10`)
      }, 60000)
    }

    else if (interaction.customId == "bob-phill-havers") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 9/10: Mutsuz Dedektif`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016457179043205161/PHILL_HAVERS..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 9/10`)
      }, 60000)
    }

    else if (interaction.customId == "bob-bodrumda-bekle-2") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrum-sol')
            .setLabel('Sola Dön.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrum-sag')
            .setLabel('Sağa Dön.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016450258668109824/BODRUMDA_BEKLEE._1.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 47000)
    }

    else if (interaction.customId == "bob-bodrum-sag") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrum-sag-sol')
            .setLabel('Sola Dön.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrum-sag-sag')
            .setLabel('Sağa Dön.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016450607428665364/SAG.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 27000)
    }

    else if (interaction.customId == "bob-bodrum-sag-sag") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrum-sag-sol')
            .setLabel('Sola Dön.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrum-sag')
            .setLabel('Sağa Dön.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016452286916067458/SAG..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          content: '||:scroll: Son: 5/10: Bodrum Paradoksu||',
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get('1016453954957234266').send(`:scroll: ${interaction.user}, <#1016467927236612176>'da bodrumda kayboldu. SON: 5/10`)
      }, 25000)
    }

    else if (interaction.customId == "bob-bodrum-sol") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrum-sol-2')
            .setLabel('Sola Dön.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrum-sag-sag')
            .setLabel('Sağa Dön.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016452945795100733/SOL.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 23000)
    }

    else if (interaction.customId == "bob-bodrum-sol-2") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-bodrum-sol')
            .setLabel('Sola Dön.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrum-sag')
            .setLabel('Sağa Dön.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016453453217804391/SOL..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 23000)
    }

    else if (interaction.customId == "bob-bodrum-kabul-et") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-otogara-git')
            .setLabel('Otogara git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrumu-arastir-xd')
            .setLabel('Bodrumu araştır.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016447713971273880/KABUL_ET_1.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 60000)
    }

    else if (interaction.customId == "bob-bodrumu-arastir-xd") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-otogara-git')
            .setLabel('Otogara git.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-bodrumu-arastir-zaa')
            .setLabel('Bodrumu araştır.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016447510853730414/BODRUMU_ARASTIR._1.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 37000)
    }

    else if (interaction.customId == "bob-bodrumu-arastir-zaa") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 3/10: Başka Boyutlardan Gelen İnanılmaz Korkunç Canavar Sonu`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016142486286123069/KENDINI_SAVUN..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 3/10`)
      }, 40000)
    }

    else if (interaction.customId == "bob-sehir-merkezi") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-kurt-kac')
            .setLabel('KOŞMAYA BAŞLA')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('bob-kurt-savun')
            .setLabel('KENDİNİ SAVUN')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016135082563616838/SEHIR_MERKEZI..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 57000)

    }

    else if (interaction.customId == "bob-kurt-savun") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 1/10: Umutsuz Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016142486286123069/KENDINI_SAVUN..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 1/10`)
      }, 60000)
    }

    else if (interaction.customId == "bob-kurt-kac") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-arka-kapidan-cik')
            .setLabel('Arka kapıdan çık.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-101-oda')
            .setLabel('101. oda.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016141689586471043/KAC..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 50000)
    }

    else if (interaction.customId == "bob-arka-kapidan-cik") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-arka-kapidan-cik-1')
            .setLabel('Arka ka$pıdan çı#k.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-101-oda')
            .setLabel('101. oda.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016430140244373648/ARKA_KAPIDAN_CIK.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 57000)
    }

    else if (interaction.customId == "bob-arka-kapidan-cik-1") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-arka-kapidan-cik-2')
            .setLabel('A#$£RKA KA£#PIDAN Ç$£IK.')
            .setStyle('DANGER'),
          new MessageButton()
            .setCustomId('bob-101-oda')
            .setLabel('101. oda.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016431901701062747/ARKA_KAPIDAN_CIK..mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 38000)
    }

    else if (interaction.customId == "bob-arka-kapidan-cik-2") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 6/10: İyi Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016432445224144896/ARKA_KAPIDAN_CIK.mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 6/10`)
      }, 120000)
    }

    else if (interaction.customId == "bob-101-oda") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-101-iceri')
            .setLabel('İçeri gir.')
            .setStyle('SECONDARY'),
          new MessageButton()
            .setCustomId('bob-101-girme')
            .setLabel('İçeri girme.')
            .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016436205749010462/101.ODA.mp4`,
        //components: [row]
      });
      setTimeout(() => {
        interaction.editReply({
          components: [row]
        }).catch(e => console.log('Timed out.'))
      }, 53000)
    }

    else if (interaction.customId == "bob-101-iceri") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 4/10: Ş̸̪̈́̇İ̶͍͕͑F̷̨̦͊̂Ŕ̸͈̦Ę̸̗͛͘`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016437296800735232/ICERI_GIR..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 4/10`)
      }, 65000)
    }

    else if (interaction.customId == "bob-101-girme") {
      await c.bulkDelete(1)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({ name: 'Dünyadaki Son İnsan Bob', iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png' })
        .setFooter({ text: client.config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
        .setDescription(`:scroll: Son: 2/10: Yalnız Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setEmoji('🔁')
            .setStyle('PRIMARY'),
          new MessageButton()
            .setCustomId('sil')
            .setEmoji('🗑️')
            .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016438922844323961/ICERI_GIRME..mp4`,
      });
      setTimeout(() => {
        c.send({ embeds: [embed], components: [row] }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 2/10`)
      }, 78000)
    }

  }
}