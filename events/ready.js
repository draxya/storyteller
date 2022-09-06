const chalk = require('chalk');
const config = require('../config.json');
const { MessageActionRow, MessageSelectMenu, MessageEmbed, MessageButton, Client, Intents } = require('discord.js');
const { joinVoiceChannel } = require('@discordjs/voice');

const moment = require('moment');
module.exports = {
  name: 'ready',
  async execute(client) {

    console.log(`[${moment().format(`YYYY-MM-DD HH:mm:ss`)}] All commands are ready to go!`);
    console.log(`[${moment().format('YYYY-MM-DD HH:mm:ss')}] Logged in as ${client.user.tag}`);
    client.user.setStatus("online"); /// ONLINE IDLE DND INVISIBLE
    // client.user.setActivity("made by draxya, with love.", { type: "PLAYING" })

    /*client.application.commands.set([
        {
          name: 'stat',
          description: "Bot istatistikleri",
        }
      ])*/

    const bob = client.channels.cache.get("1016467927236612176")
    function sendbob() {
      const embed = new MessageEmbed()
        .setColor('GREEN')
        .setTitle('Dünyadaki Son İnsan Bob')
        .setDescription(`Çoğu insan gibi karısı ve çocuklarını geçindirmek için her gün işe giden ve onun için en önemli şey ailesi olan, sıradan ve sıkıcı bir hayatı olan Bob, daha önce hiç alışık olmadığı bir sabaha uyanmıştı. Evi bomboştu. Ailesi neredeydi? Etraf olması gerektiğinden daha sessizdi. Bob ne yapacağını bilemiyordu. Bob'un bu hikayesinde ona eşlik edecek misin?`)
        .setFooter({ text: config.footerText, iconURL: client.guilds.cache.get('1016079791721545770').iconURL() })
      const row = new MessageActionRow()
        .addComponents(
          new MessageButton()
            .setCustomId('bob-basla')
            .setLabel('Hikayeye Başla!')
            .setEmoji('📖')
            .setStyle('SUCCESS'),
        );
      bob.bulkDelete(1) 
      bob.send({
        embeds: [embed],
        components: [row]
      })
    }


    setTimeout(() => {
      // sendbob()
    }, 250);

  }
}