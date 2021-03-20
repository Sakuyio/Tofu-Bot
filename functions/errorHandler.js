const Discord = require('discord.js');
const { maxID, tofuError } = require('../config.json');
//const chalk = require('chalk');

const handleError = (client, file, text, e) => {
	try {
		console.error(`${file}: ${text}: ${e}`);
		return client.users.cache.get(maxID).send(new Discord.MessageEmbed().setDescription(`BIG OOF: ${file}: ${text} \n\`\`${e}\`\``).setColor(tofuError));
	} catch(f) {
		console.error(`Sending error DM failed! DMError: ${f}`);
		return;
	}

}

module.exports = {
	handleError
};