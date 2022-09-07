const Discord = require("discord.js");
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const moment = require("moment");
require("moment-duration-format");

module.exports.run = async (client, message) => {

  const duration = moment.duration(client.uptime).format(" D [gün], H [saat], m [dakika], s [saniye]");

  const embed = new MessageEmbed()
    .setColor('DARK_PURPLE')
    .setTitle(client.user.username +   ' İstatistikler')
    .addFields(
      { name: ':timer: Gecikme', value: `${client.ws.ping.toFixed(2)}  ms`, inline: true },
      { name: ':construction_worker: Çalışma Süresi', value: `${duration}`, inline: true },
      { name: ':busts_in_silhouette: Kullanıcılar', value: `${client.guilds.cache.reduce((a, b) => a + b.memberCount, 0)}`, inline: true },
      { name: ':tv: Kanallar', value: `${client.channels.cache.size}`, inline: true },
      { name: ':clipboard: Sunucular', value: `${client.guilds.cache.size}`, inline: true },
      { name: ':desktop: Bellek Kullanımı (MB)', value: `${(process.memoryUsage().heapUsed / 1024 / 1024).toFixed(2)}`, inline: true },
    )
    .setTimestamp()
    .setFooter({ text: client.user.username, iconURL: client.user.avatarURL() });
  message.reply({ embeds: [embed] });
};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['istatistik', 'stat', 'ping', 'stats'],
  permLevel: 0
};
exports.help = {
  name: 'istatistik'
};
