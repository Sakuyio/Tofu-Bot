const Discord = require('discord.js');
const { prefix, tofuOrange } = require('../../config.json');
const { stripIndents } = require('common-tags');

module.exports = {
	name: 'help',
	helpTitle: 'Help',
	category: 'Bot',
	usage: 'help (command)',
	description: 'Stop, get help',
	isEnabled: true,
	isDeprecated: false,
	aliases: ['commands'],
	cooldown: 5,
	execute: async function(client, message, args) {
		if (message.deletable) message.delete();

		if (args[0]) {
			return getCmd(client, message, args[0]);
		}
		else {
			return getAll(client, message);
		}	
	},
};

function getAll(client, message) {
	const embed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setFooter('Syntax: () = optional, [] = required, {a, b} = choose between a or b');
	
	const commands = (category) => {
		return client.commands
			.filter(cmd => cmd.category === category)
			.map(cmd => `\`${cmd.name}\``)
			.join(' ');
	};

	const info = client.categories 
		.map(cat => stripIndents`**${cat[0].toUpperCase() + cat.slice(1)}** \n\n${commands(cat)}`)
		.reduce((string, category) => string + '\n\n' + category);
 
	return message.channel.send(embed.setDescription(info));
}

function getCmd(client, message, input) {
	const embed = new Discord.MessageEmbed()
		.setColor(tofuOrange)
		.setFooter('Syntax: () = optional; [] = required; {a, b} = choose between a or b');

	const cmd = client.commands.get(input.toLowerCase()) || client.commands.get(client.aliases.get(input.toLowerCase()));

	if (!cmd) {
		return message.channel.send(`**${input.toLowerCase()}** is not a command. Are you being delusional?`);
	}

	if (cmd.name) embed.setDescription(`**${cmd.helpTitle} command**`);
	if (cmd.aliases) embed.addField('**Aliases**', `${cmd.aliases.map(a => `\`${a}\``).join(' ')}`);
	if (cmd.description) embed.addField('**Command Description**', `${cmd.description}`);
	if (cmd.usage) embed.addField('**Command Structure**', `\`${prefix}${cmd.usage}\``);

	return message.channel.send(embed);
}