const fs = require('fs');
const { jaidenServerID, generalChannelId, rulesChannelID, devMode, gradyID, maxID } = require('../../config.json');
const { handleError } = require('../../functions/errorHandler.js');

module.exports = async (client, member) => {
	if (member.guild.id != jaidenServerID && devMode === false) return console.log('left but not jaidenserver');

	if (member.id == gradyID) {
		try {
			client.channels.cache.get(generalChannelId).send('GRADY, NOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!');
			client.users.cache.get(maxID).send('Grady left, noooooooo');
		} catch (e) {
			return handleError(client, 'guildMemberRemove.js', 'Error on sending grady left message.', e);
		}
	}

	const data = await fs.readFileSync('./commanddata/Configuration/settings.json', 'utf-8');
	var settingsFile = JSON.parse(data);
	var welcomerState = settingsFile.welcome;

	// tried it in a separate file, didn't work, this is my botch
	const byes = [
		`Welps, guess like **${member.displayName}** couldn't stand to be around us, adiós.`,
		`**${member.displayName}** is hanging up now, bye.`
	];

	if (welcomerState === false) return;
	try {
		let randomBye = byes[Math.floor(Math.random() * byes.length)];
		client.channels.cache.get(generalChannelId).send(randomBye);
		return;
	} catch (e) {
		return handleError(client, 'guildMemberRemove.js', 'Error on sending cya message', e);
	}

};