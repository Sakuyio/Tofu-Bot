const Discord = require('discord.js');
const { botVersion, releaseDate, botProfile, tofuGreen } = require('../../config.json');

module.exports = {
    name: 'about',
    helpTitle: 'About',
    category: 'Bot',
    usage: 'about',
    description: 'Display the bot\'s information',
    isEnabled: true,
    isDeprecated: false,
    aliases: ['bot', 'botinfo', 'info'],
	cooldown: 20,
	execute: async function(client, message, args) {
        let { heapUsed, heapTotal } = process.memoryUsage();

        const aboutEmbed = new Discord.MessageEmbed()
            .setColor(tofuGreen)
            .setAuthor('About Tofu Bot', botProfile)
            .addFields(
                { name: 'Bot version:', value: botVersion },
                { name: 'Bot release date:', value: releaseDate },
                { name: 'Uptime', value: `${(process.uptime() / 3600).toFixed(1)} hours` },
                { name: 'Memory Usage', value: `${(heapUsed / 1024 / 1024).toFixed(1)} MB / ${(heapTotal / 1024 / 1024).toFixed(1)}MB (${(heapUsed / heapTotal * 100).toFixed(2)}%)` },
                { name: 'Coding:', value: '<@488064501816492047>, <@558264504736153600>, <@768384164810457128>' },
                { name: 'Avatar:', value: '<@768384164810457128>' },
                { name: 'Testing:', value: '<@740491200972193793>, <@558264504736153600>, <@768384164810457128>' },
                { name: 'Quotes:', value: '<@768384164810457128>, <@740491200972193793>, <@392632687782789121>' },
                { name: 'Trivia:', value: '<@768384164810457128>, <@740491200972193793>, <@392632687782789121>' }
            )
            .setFooter('Made with ☕, without swear words');
        message.channel.send(aboutEmbed);
	},
};