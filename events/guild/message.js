const { prefix, banKirito } = require('../../config.json');
const fs = require('fs');
const Discord = require('discord.js');

module.exports = (client, message) => {
    let cooldowns = client.cooldowns;
    // nothing get fucked lmao
	// very
	
	if (message.guild === null && !message.author.bot) {
		return message.channel.send('Can\'t talk right now, I\'m eating tofu');
	}

	// Bots shall not trigger me
	if (!message.content.startsWith(prefix) || message.author.bot) return;
	// List up all commands
	const args = message.content.slice(prefix.length).trim().split(/ +/);
	const commandName = args.shift().toLowerCase();

	// Include aliases
	const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));	
	
	if (!command) return;
	
	// Is this command enabled?
	if (command.isEnabled === false) {
		return message.reply('This command has been (temporarily) disabled. (Maxim probably broke it)');
	}

	if (message.author.id == banKirito) {
		console.log(message.author.id);
		return client.users.cache.get(banKirito).send('You know, I really don\'t trust you, like at all. So stop messaging me!', { files: ["./commanddata/banKirito.png"] });
	}

	// No DMs
	if (message.channel.type === 'dm') return;

	// Cooldown?
	if (!cooldowns.has(command.name)) {
		cooldowns.set(command.name, new Discord.Collection());
	}
	const now = Date.now();
	const timestamps = cooldowns.get(command.name);
	const cooldownAmount = (command.cooldown || 3) * 1000;
	if (timestamps.has(message.author.id)) {
		const expirationTime = timestamps.get(message.author.id) + cooldownAmount;
		if (now < expirationTime) {
			const timeLeft = (expirationTime - now) / 1000;
			message.react('⏳');
			return message.reply(`Please wait ${timeLeft.toFixed(1)} more second(s) before reusing the \`${command.name}\` command.`);
		}
	}
	timestamps.set(message.author.id, now);
	setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

	// All requirements are met, try running the command
	try {
		command.execute(client, message, args);
	} catch (error) {
		console.error(error);
		message.reply('Sooo i like um broke');
	}
}