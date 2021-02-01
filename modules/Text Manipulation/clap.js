module.exports = {
	name: 'clap',
	helpTitle: 'Clap',
    category: 'Text Manipulation',
    usage: 'clap [text]',
	description: 'Why 👏 did 👏 I 👏 make 👏 this? 👏',
    isEnabled: true,
    isDeprecated: false,
	//aliases: [],
	cooldown: 5,
	execute: async function(client, message, args) {
        if (message.deletable) message.delete();

        if (args.length < 1) {
            return message.reply('What 👏 to 👏 say 👏 tho. 👏 ;-;');
        }
        
        let input = args.join(' 👏 ');

        // Supress @everyone, @here and pinging roles
        [/@everyone/gi, /@here/gi, /<@&\d{18}>/].forEach(ping => {
            input = input.replace(ping, 'haha funny ping');
        });

        //console.log(args)
        //const clapped = input /*input.join(' 👏 ');*/
        const clappedEnd = `${input} 👏`;
        if (clappedEnd.length < 2000) {
            return message.channel.send(clappedEnd);
        } else {
            return message.reply('Hey, can you chill? Keep the length of the message a bit shorter.');
        }
	},
};