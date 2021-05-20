//const { maxID, movieNightRoleID, jaidenServerID, movieNightChannelID } = require('../../config.json');
const Tantrum = require('../../functions/tantrum.js');

module.exports = {
	name: 'maxnoadmin',
	helpTitle: 'Max No Admin',
	category: 'Movie Night',
	usage: 'maxnoadnin (invite) [#channel] [message]',
	description: 'Because Max doesn\'t have perms to ping movie night AAAAAAAAAAAA',
	isDMAllowed: false,
	isDeprecated: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
		const { maxID, movieNightRoleID, jaidenServerID, movieNightChannelID } = client.config;

		let channel = message.mentions.channels.first() ||
			message.guild.channels.cache.find(c => c.id === args[0]) ||
			message.guild.channels.cache.find(c => c.name === args[0]);

		if (message.author.id !== maxID) {
			try {
				return message.reply('Are you Maxim? I don\'t think so. Why are you trying to use my command. You should be ashamed of yourself. I hope you stub your toe on your chair. I hope you get aneurysm after aneurysm after aneurysm after aneurysm after aneurysm. Get one of those Dyson vacuums and see if it\'s strong enough to suck the stupid out of you. Don\'t EVER use this command again. Do you understand me? DO YOU UNDERSTAND ME?');
			} catch (e) {
				throw new Tantrum(client, 'maxnoadmin.js', 'Error on sending are you maxim reply', e);
			}
		}

		if (!channel) {
			try {
				return message.channel.send('Where the actual F*CK do you want me to place that?');
			} catch (e) {
				throw new Tantrum(client, 'maxnoadmin.js', 'Error on sending channel error', e);
			}
		}
		//if (message.deletable) message.delete();


		if (args[1] === 'invite') {
			let movieNightChannelInvite = await client.guilds.cache.get(jaidenServerID).channels.cache.get(movieNightChannelID).createInvite(
				{
					maxAge: 3600, // maximum time for the invite, in seconds
					maxUses: 0 // maximum times it can be used, 0 for infinite
				},
				'Movie Night invite'
			);

			if (!args.slice(2).join(' ')) {
				try {
					return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?')
				} catch (e) {
					throw new Tantrum(client, 'maxnoadmin.js', 'Error on sending no message error', e);
				}
			}

			try {

				channel.send(`<@&${movieNightRoleID}>\n${args.slice(2).join(' ')}\n${movieNightChannelInvite}`);
				await message.react('✅');
			} catch (e) {
				throw new Tantrum(client, 'maxnoadmin.js', 'Error on sending message', e);
			}
		}
		else {
			if (!args.slice(1).join(' ')) {
				try {
					return message.reply('All fine and good, but like. What to send. Can\'t you guys do this first try for once?');
				} catch (e) {
					throw new Tantrum(client, 'maxnoadmin.js', 'Error on sending no message error', e);
				}
			}
			try {

				channel.send(`<@&${movieNightRoleID}>\n${args.slice(1).join(' ')}`);
				await message.react('✅');
			} catch (e) {
				throw new Tantrum(client, 'maxnoadmin.js', 'Error on sending message', e);
			}
		}
	},
};
