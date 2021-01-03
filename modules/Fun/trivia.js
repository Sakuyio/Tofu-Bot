const Discord = require('discord.js');
const { tofuGreen } = require('../../config.json');
const { trivia } = require('../../commanddata/jaidenTriviaList.js');

module.exports = {
	name: 'jaidentrivia',
	helpTitle: 'Jaiden Trivia',
	category: 'Fun',
	usage: 'jaidentrivia (rules)',
	description: 'Play some trivia\nTHIS COMMAND IS NOT FINISHED',
	isEnabled: true,
	aliases: ['trivia', 'jtrivia'],
	cooldown: 3,
	execute: async function(client, message, args) {
		if (args[0] == 'rules') {
			//return message.channel.send('Rules and info will be put here');
			const ruleEmbed = new Discord.MessageEmbed()
				.setTitle('Trivia Info')
				.setDescription('A question gets presented, users can click the reaction corresponding to the answer they think is correct.\nAfter 15s, a ✅ reaction appears, the original starter of the trivia can react to highlight the answer.\nAfter 1m, the correct answer is automatically highlighted.')
				.setColor(tofuGreen);
			
			return message.channel.send(ruleEmbed);    
			}

		message.channel.send('hotel? Trivia!');
		let q = trivia[Math.floor(Math.random() * trivia.length)];
		let i = 0;
		const Embed = new Discord.MessageEmbed()
			.setTitle(q.question)
			.setDescription(
				q.answers.map((opt) => {
				  i++;
				  return `${i} - ${opt}\n`;
				})
			)
			.setColor(tofuGreen)
			.setFooter(`You can reveal the answer in 15s when the ✅ appears.`);
		message.channel.send(Embed).then(sentEmbed => {
			setTimeout(() => {
				sentEmbed.react('✅');

				const filter = (reaction, user) => {
					return reaction.emoji.name === '✅' && user.id === message.author.id;
				};
				
				const collector = message.createReactionCollector(filter, { time: 15000 }); // FUUUUUUCKKKKKK
				
				collector.on('collect', (reaction, user) => {
					console.log(`Collected ${reaction.emoji.name} from ${user.tag}`);
				});
				
				collector.on('end', collected => {
					console.log(`Collected ${collected.size} items`);
				});
				
			}, 15000);
	
			setTimeout(() => {
				//Mark correct answer
			}, 60000);
		});



	},
};