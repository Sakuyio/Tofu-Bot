class AutoResponder {
	/**
	 * When a message meets an autoresponder requirement, it will respond to it
	 * @param {String | RegExp} input Input text from message
	 * @param {String} output Reply
	 */
	constructor(input, output, cooldown) {
		this.input = input;
		this.output = output;
		this.cooldown = cooldown * 1000;
		this.regexp = input instanceof RegExp;
	}
}

const autoResponders = [
	new AutoResponder('tofu', 'that\'s me（☆ω☆*)', 10),
	new AutoResponder(/^!p/, '`!play` is not a command! Use:\n<:tofu:869529243187544084> Tofu Bot: `t+play`\n<:groovy:869528339545735228> Groovy: `-play`\n<:rythm:869528983899865098> Rythm: `*play`\nCheck the help command on each bot for more info.', 5, true)
];
module.exports = {
	autoResponders
}
