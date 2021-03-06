const ParticipatingServer = require('../database/models/ParticipatingServer');

function getChannels() {
  return ParticipatingServer.findAll({ where: { active: true, blocked: false }, attributes: ['logChannelID'] })
    .catch((err) => console.error(err));
}

async function sendMessages(client, author, body) {
  const channels = await getChannels();
  channels.forEach((DBchannel) => {
    const channelID = DBchannel.logChannelID;
    const channel = client.channels.cache.find((channel) => channel.id === channelID);
    client.functions.get('FUNC_richEmbedMessage')
      .run(client.user, channel, body, `${author} broadcasted`, 4182379, false);
  });
}

module.exports.run = async (client, message, args, config, prefix) => {
  // check maintainer permissions
  if (!await client.functions.get('FUNC_checkPermissionsDB').run(message.author.id)) {
    messageFail(message, `You are not authorized to use \`${prefix}${module.exports.help.name}\``);
    return;
  }
  const body = message.content.slice(prefix.length + module.exports.help.name.length + 1);
  sendMessages(client, message.author.tag, body);
};

module.exports.help = {
  name: 'broadcast',
  usage: 'MESSAGE',
  desc: 'Broadcasts a message to all servers.',
};
