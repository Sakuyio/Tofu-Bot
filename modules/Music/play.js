/**
 * Dear future me. Please forgive me. I can't even begin to express how sorry I am.
 */
const { tofuOrange, tofuError } = require('#colors');
const Discord = require('discord.js');
const Tantrum = require('#tantrum');
const { loadingString } = require('#utils/funnyLoad.js');
const LavaManager = require('#handlers/lavaManager.js');

module.exports = {
	name: 'play',
	helpTitle: 'Play',
	category: 'Music',
	usage: 'play [query]',
	description: 'Play some choons',
	isDMAllowed: false,
	isDangerous: false,
	mainServerOnly: false,
	isHidden: false,
	aliases: ['p'],
	cooldown: 0,
	execute: async function(client, message, args) {
		// spotify search
		// ytmsearch? (youtub music)
		// scsearch? (soundclo)

		if (!LavaManager.nodeChecks(client, message)) return console.log('nodechecks failed');
		if (!LavaManager.vcChecks(client, message)) return console.log('vc checks failed');

		// if queue exists, and paused, resume
		const existing = await LavaManager.getPlayer(client, message);
		if (existing && existing.paused) {
			if (existing.resume()) {
				return await message.react('👌').catch(e => {
					throw new Tantrum(client, 'play.js', 'Error on reacting resume', e);
				});
			} else {
				throw new Tantrum(client, 'play.js', 'Error on resuming', 'No message');
			}
		}

		if (!args[0]) {
			const noQueryEmbed = new Discord.MessageEmbed()
				.setColor(tofuOrange)
				.setDescription('To play a song, you need to specify which song you want to play!');

			return message.channel.send({ embeds: [noQueryEmbed] }).catch(e => {
				throw new Tantrum(client, 'play.js', 'Error on sending no query defined message', e);
			});
		}

		const results = await client.music.rest.loadTracks(`ytsearch:${args.slice(1).join(' ')}`);
		const player = existing || await LavaManager.createPlayer(client, message);
		// console.log(player)

		await player.queue.add([results.tracks[0]], { requester: message.author });
		if (!player.playing) player.queue.start();
	},
};
