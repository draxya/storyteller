module.exports = {
  name: 'guildMemberAdd',
  async execute(member) {
    member.roles.add(client.config.autorole);
  }
}
