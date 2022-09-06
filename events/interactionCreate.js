const {
  MessageActionRow,
  MessageSelectMenu,
  MessageEmbed,
  MessageButton,
  Client,
  Intents
} = require('discord.js');

module.exports = {
  name: 'interactionCreate',
  async execute(interaction, client) {

    if (!interaction.isButton()) return;
    c = interaction.channel
    sonmesaj = interaction.channel.lastMessageId
    const mesaj = await interaction.channel.messages.fetch(sonmesaj)
    
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
          .setAuthor({
            name: 'Dünyadaki Son İnsan Bob',
            iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
          })
          .setFooter({
            text: client.config.footerText,
            iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
          })
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

        message = await c.send({
          embeds: [embed],
          components: [row]
        });

        const goster = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('go-ilk').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'),
          );

        msg = await c.send({
          content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016100041678659644/DUNYADAKI_SON_INSANBOB.mp4`,
          components: [goster]
        });
      });
    } else if (interaction.customId == "go-ilk") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('go-ilk').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "sil") {
      interaction.reply(`Hikayeniz sonlandırılıyor..`).then(() => {
        setTimeout(() => {
          if (interaction.channel.deletable) {
            interaction.channel.delete();
          };
        }, 3000);
      });
    } else if (interaction.customId == "bob-restart") {
      await c.bulkDelete(1).catch(e => interaction.reply({content: 'Bir hata oluştu, hikayeyi kapatıp tekrar açmayı deneyin.'}))
      interaction.reply({
        content: 'Hikayeniz baştan başlatıldı!',
        ephemeral: true
      })
      const goster = new MessageActionRow()
          .addComponents(
            new MessageButton()
            .setCustomId('go-ilk').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'),
          );

        msg = await c.send({
          content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016100041678659644/DUNYADAKI_SON_INSANBOB.mp4`,
          components: [goster]
        });
    } else if (interaction.customId == "bob-bastan-basla") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bastan-basla').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await mesaj.edit({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016100041678659644/DUNYADAKI_SON_INSANBOB.mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-bastan-basla") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-sese-git") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('go-ses').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016118147620802590/KARSI_EVDEKI_SESE_GIT.mp4`,
        components: [goster]
      });
      
    } else if (interaction.customId == "go-ses") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-otogara-git") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('go-otogar').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016123798707240963/OTOGARA_GIT..mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-otogar") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-terminale-gir") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents(
          new MessageButton()
          .setCustomId('go-terminal').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016440530294554633/TERMINALE_GIR..mp4`,
        components: [goster]
      });
    }  else if (interaction.customId == "go-terminal") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-terminal-kilidi-ac") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-terminal-kilit').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016441211898298410/KILIDI_ACMAYA_CALIS..mp4`,
        components: [goster]
      });
    }  else if (interaction.customId == "go-terminal-kilit") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-terminal-hayir") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-terminal-hayir').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016441843858292856/HAYIR..mp4`,
        components: [goster]
      });
    }  else if (interaction.customId == "go-terminal-hayir") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-kabul-etme") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 8/10: İntihar`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 8/10`)
      }, 115000)
    } else if (interaction.customId == "bob-kabul-et") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 7/10: Kötü Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 7/10`)
      }, 86000)
    } else if (interaction.customId == "bob-bodrumu-arastir") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bodrumu-arastir').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016123081011515452/BODRUMU_ARASTIR..mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-bodrumu-arastir") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-kapiyi-acmaya-calis") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-kapiyi-acmaya-calis').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016443843375284224/KAPIYI_ACMAYA_CALIS.mp4`,
        components: [goster]
      });
    }  else if (interaction.customId == "go-kapiyi-acmaya-calis") {
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bodrumda-bekle')
          .setLabel('Bodrumda bekle.')
          .setStyle('SECONDARY'),
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setLabel('Baştan başla.')
          .setStyle('SECONDARY'),
        );
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-bodrumda-bekle") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bodrumda-bekle').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016446362683981904/BODRUMDA_BEKLE..mp4`,
        components: [goster]
      });
    }  else if (interaction.customId == "go-bodrumda-bekle") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-bodrumda-bekle-1") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bodrumda-bekle-1').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016449800352321597/BODRUMDA_BEKLEE..mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-bodrumda-bekle-1") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-dedektif") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-dedektif').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016455317585932429/DEDEKTIF_BOB..mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-dedektif") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-david-kolsky") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 10/10: Mutlu Dedektif Sonu`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
    } else if (interaction.customId == "bob-richard-boyle") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 9/10: Mutsuz Dedektif`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 9/10`)
      }, 60000)
    } else if (interaction.customId == "bob-turkan-soray") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 9/10: Mutsuz Dedektif`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 9/10`)
      }, 60000)
    } else if (interaction.customId == "bob-phill-havers") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 9/10: Mutsuz Dedektif`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 9/10`)
      }, 60000)
    } else if (interaction.customId == "bob-bodrumda-bekle-2") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bodrumda-bekle-2').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016450258668109824/BODRUMDA_BEKLEE._1.mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-bodrumda-bekle-2") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-bodrum-sag") {
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
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016450607428665364/SAG.mp4`,
        components: [row]
      });
    } else if (interaction.customId == "bob-bodrum-sag-sag") {
      c.bulkDelete(1)
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bodrum-sol-2')
          .setLabel('Sola Dön.')
          .setStyle('SECONDARY'),
          new MessageButton()
          .setCustomId('bob-bodrum-sag')
          .setLabel('Sağa Dön.')
          .setStyle('SECONDARY'),
        );
      msg = await interaction.reply({
        content: `||:scroll: Son: 5/10: Bodrum Paradoksu||\nhttps://cdn.discordapp.com/attachments/1016099733686722682/1016452286916067458/SAG..mp4`,
        components: [row]
      });
        client.channels.cache.get('1016453954957234266').send(`:scroll: ${interaction.user}, <#1016467927236612176>'da bodrumda kayboldu. SON: 5/10`)
    } else if (interaction.customId == "bob-bodrum-sol") {
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
        components: [row]
      });
    } else if (interaction.customId == "bob-bodrum-sol-2") {
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
        components: [row]
      });
    } else if (interaction.customId == "bob-bodrum-kabul-et") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bodrum-kabul-et').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016447713971273880/KABUL_ET_1.mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-bodrum-kabul-et") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-bodrumu-arastir-xd") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-bodrumu-arastir-xd').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016447510853730414/BODRUMU_ARASTIR._1.mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-bodrumu-arastir-xd") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-bodrumu-arastir-zaa") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 3/10: Başka Boyutlardan Gelen İnanılmaz Korkunç Canavar Sonu`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
          .setStyle('PRIMARY'),
          new MessageButton()
          .setCustomId('sil')
          .setEmoji('🗑️')
          .setStyle('DANGER'),
        );
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016448759208628224/BODRUMU_ARASTIR._2.mp4`,
      });
      setTimeout(() => {
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 3/10`)
      }, 40000)
    } else if (interaction.customId == "bob-sehir-merkezi") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-sehir-merkezi').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016135082563616838/SEHIR_MERKEZI..mp4`,
        components: [goster]
      });

    } else if (interaction.customId == "go-sehir-merkezi") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-kurt-savun") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 1/10: Umutsuz Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 1/10`)
      }, 60000)
    } else if (interaction.customId == "bob-kurt-kac") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-kurt-kac').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016141689586471043/KAC..mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-kurt-kac") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-arka-kapidan-cik") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-arka-kapi').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016430140244373648/ARKA_KAPIDAN_CIK.mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-arka-kapi") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-arka-kapidan-cik-1") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-arka-kapi-1').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016431901701062747/ARKA_KAPIDAN_CIK..mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-arka-kapi-1") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-arka-kapidan-cik-2") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 6/10: İyi Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 6/10`)
      }, 120000)
    } else if (interaction.customId == "bob-101-oda") {
      await c.bulkDelete(2)
      const goster = new MessageActionRow() //
        .addComponents( //
          new MessageButton() //
          .setCustomId('go-101-oda').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY'), //
        ); //
      msg = await interaction.reply({
        content: `https://cdn.discordapp.com/attachments/1016099733686722682/1016436205749010462/101.ODA.mp4`,
        components: [goster]
      });
    } else if (interaction.customId == "go-101-oda") {
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
      const goster = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('none').setLabel('Seçimleri göster.').setEmoji('👁').setStyle('SECONDARY').setDisabled(true),
        );
      await mesaj.edit({components: [goster]})
      interaction.reply({components: [row]})
    } else if (interaction.customId == "bob-101-iceri") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 4/10: Ş̸̪̈́̇İ̶͍͕͑F̷̨̦͊̂Ŕ̸͈̦Ę̸̗͛͘`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 4/10`)
      }, 65000)
    } else if (interaction.customId == "bob-101-girme") {
      await c.bulkDelete(2)
      const embed = new client.discord.MessageEmbed()
        .setColor('GREEN')
        .setTitle('Hikayeni Bitirdin!')
        .setAuthor({
          name: 'Dünyadaki Son İnsan Bob',
          iconURL: 'http://www.clker.com/cliparts/s/M/Z/W/2/W/my-stories-hi.png'
        })
        .setFooter({
          text: client.config.footerText,
          iconURL: client.guilds.cache.get('1016079791721545770').iconURL()
        })
        .setDescription(`:scroll: Son: 2/10: Yalnız Son`)
        .setTimestamp();
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
          .setCustomId('bob-bastan-basla')
          .setEmoji('Yeniden Dene')
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
        c.send({
          embeds: [embed],
          components: [row]
        }).catch(e => console.log('Timed out.'))
        client.channels.cache.get(client.config.readers).send(`:scroll: ${interaction.user}, <#1016467927236612176> hikayesini bitirdi. SON: 2/10`)
      }, 78000)
    }

  }
}