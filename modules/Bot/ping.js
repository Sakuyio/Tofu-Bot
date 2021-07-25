const Tantrum = require('#tantrum');

module.exports = {
	name: 'ping',
	helpTitle: 'Ping',
	category: 'Bot',
	usage: 'ping',
	description: 'Ping!',
	isDeprecated: false,
	isDangerous: false,
	isHidden: false,
	aliases: ['delay', 'latency'],
	cooldown: 5,
	execute: async function(client, message, args) {
		const msg = await message.channel.send('Pinging...').catch(e => {
			new Tantrum(client, 'ping.js', 'Error on sending ping message', e);
		});
		msg.edit(`Pong!\nLatency: ${Math.floor(msg.createdAt - message.createdAt)}ms\nAPI Latency (Bot): ${client.ws.ping}ms`).catch(e => {
			new Tantrum(client, 'ping.js', 'Error on editing ping message', e);
		});
	},
};
