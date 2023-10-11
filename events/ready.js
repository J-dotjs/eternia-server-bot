const { Events, EmbedBuilder } = require('discord.js');

const fs = require('fs')

const query = require('../functions/serverQuery.js')

module.exports = {
	name: Events.ClientReady,
	once: true,
	async execute(client) {
		var readyTime = new Date();
		const readyEmbed = new EmbedBuilder()
			.setTitle('Ready!')
			.setDescription(`Server online!\n${client.user} logged in.\n<t:${Math.floor(readyTime.getTime() / 1000)}:R>`)
			.setColor(0x00ff00)
			.setTimestamp();

		var user = await client.users.fetch('429761044978597890');
		user.send({ embeds: [readyEmbed] });

		query.execute(client)
	},
};
