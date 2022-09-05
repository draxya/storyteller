const Discord = require("discord.js");
const { Client, Intents, MessageEmbed } = require('discord.js');
const client = new Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const config = require("../config.json")
exports.run = async function (client, message, args) {

  if (!message.channel === client.channels.cache.get(config.botkomut)) return;

  const öneri = message.content.replaceAll('!suggest ', '').replaceAll('!Suggest', '').replaceAll('!öner', '').replaceAll('!Öner', '');

  if(!args[0]) {return message.reply('Öneri oluşturabilmen için birşeyler yazman gerek.')}

  const embed = new MessageEmbed()
    .setAuthor({ name: message.author.tag, iconURL: message.author.avatarURL() })
    .setTitle('Suggestion #' + message.id)
    .setDescription(öneri)

  await client.channels.cache.get(config.suggestion).send({ embeds: [embed] }).then(function (message) {
    message.react("⬆️")
    message.react("⬇️")
  })
  const git = new MessageEmbed()
    .setDescription(`[Öneriye Git!](https://discord.com/channels/1016079791721545770/1016129883719606293/${client.channels.cache.get(config.suggestion).lastMessageId})`)
    message.delete();
    message.channel.send({ content: `${message.author}, önerin oluşturuldu!`, embeds: [git] })

};
exports.conf = {
  enabled: true,
  guildOnly: true,
  aliases: ['Suggest', 'öner', 'Öner'],
  permLevel: 0
};
exports.help = {
  name: 'suggest'
};