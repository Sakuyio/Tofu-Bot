const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'back',
	helpTitle: 'Back',
	category: 'Music',
	usage: 'back',
	description: 'Hello, I was wondering if you could play that song *again*',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['prev', 'previous'],
	cooldown: 0,
	execute: async function(client, message, args) {
		return message.channel.send('Sorry, this isn\'t ready for use yet, check back in later!');
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		try {
			// client.player.back(message);
			queue.back(); // TODO: test
			await message.react('👌');
		} catch (e) {
			throw new Tantrum(client, 'back.js', 'Error on going back in queue', e);
		}
	},
};
