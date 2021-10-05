const Tantrum = require('#tantrum');
const { checkMusic, checkQueueExists } = require('#utils/musicChecks.js');

module.exports = {
	name: 'queue',
	helpTitle: 'Queue',
	category: 'Music',
	usage: 'queue',
	description: 'See the upcoming choons',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['q'],
	cooldown: 0,
	execute: async function(client, message, args) {
		if (!checkMusic(client, message)) return;
		if (!checkQueueExists(client, message)) return;

		const queue = client.player.getQueue(message.guild);

		const currtr = `Current track: ${queue.current.title}`;
		const trlist = queue.tracks.map((track, i) => {
			return `${i + 1}) ${track.title}    ${track.duration}`;
		}).slice(0, 15).join('\n'); // For now, only the first 15 tracks get pulled
		const footer = `${queue.tracks.length > 8 ? `${queue.tracks.length - 8} more track(s)` : '     This is the end of the queue!'}`;

		message.channel.send(`\`\`\`nim\n${currtr}\n\n${trlist}\n${footer}\n\`\`\``).catch(e => {
			throw new Tantrum(client, 'queue.js', 'Error on sending queue', e);
		}); // TODO: pagination
	},
};
