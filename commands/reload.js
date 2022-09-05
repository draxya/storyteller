const Discord = require("discord.js");

exports.run = async (client, message, args) => {

  if (!args[0]) return message.channel.send("Bir komut ismi gir!")

  let komutİsim = args[0].toLowerCase()

  try {
    delete require.cache[require.resolve(`./${komutİsim}.js`)]
    const pull = require(`./${komutİsim}.js`)
    client.commands.set(pull.help.name, pull)
    message.channel.send(`Komut Yeniden Başlatıldı: \`${komutİsim}\``)
    console.log(`reloaded /komutlar/${komutİsim}.js`)
  }

  catch (e) {
    return message.channel.send(`Komut Yeniden Yüklenemedi: \`${komutİsim}\` \`\`\`bash\n${e}\`\`\``)
  }


}


exports.conf = {
  aliases: ['komutyenile', 'yenile', 'reload'],
  permLevel: 4,
  category: 'owner'
};

exports.help = {
  name: "komut-yenile",
  description: "Belirttiğiniz komutu yeniden başlatır.",
  usage: "komut-yenile"
};