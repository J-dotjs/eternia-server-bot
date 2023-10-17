const { EmbedBuilder, ActivityType } = require('discord.js');
const util = require('minecraft-server-util')

async function execute(client) {

    try {

        var statusMSG = await client.channels.cache.get("1120547962435678298").messages.fetch("1161490303384043601")

        var statusEmbed = new EmbedBuilder()
            .setColor('#964B00')
            .setAuthor({ name: `${client.user.username}`, iconURL: `${client.user.displayAvatarURL()}` })

        statusMSG.edit({ embeds: [statusEmbed] })

    } catch (error) {
        console.error(error)
    }
    setInterval(async () => {
        try {
            util.status('eternia.serveminecraft.net')
                .then((response) => {
                    client.user.setPresence({
                        activities: [{
                            name: `${response.players.online}/${response.players.max} ${response.version.name}`,
                            type: ActivityType.Watching
                        }],
                        status: 'online',
                    });

                    var players;
                    if (response.players.online >= 1) {
                        players = []
                        for (var i = 0; i < response.players.sample.length; i++) {
                            players.push(response.players.sample[i].name)
                        }
                    } else if (response.players.online === 0) {
                        players = "Nobody's online."
                    }

                    statusEmbed.setFields(
                        { name: 'MOTD', value: `\`${response.motd.clean}\``, inline: false },
                        { name: 'IP:', value: `\`eternia.serveminecraft.net\``, inline: true },
                        { name: 'Version:', value: `\`${response.version.name}\``, inline: false },
                        { name: 'Online Players', value: `\`${response.players.online}\``, inline: true },
                        { name: 'Max Players', value: `\`${response.players.max}\``, inline: true },
                        { name: 'Available Slots', value: `\`${response.players.max - response.players.online}\``, inline: true },
                        { name: 'Players', value: `\`${players}\``, inline: false },
                    )

                    statusEmbed.setFooter({ text: `RTL: ${response.roundTripLatency}` })

                    statusMSG.edit({ embeds: [statusEmbed] })


                }).catch((error) => {
                    client.user.setPresence({
                        activities: [{
                            name: `offline`,
                            type: ActivityType.Playing
                        }],
                        status: 'idle',
                    });
                    statusEmbed.setFields({ name: 'State', value: '\`Offline\`' })
                    statusEmbed.setFooter({ text: "RTL: 0" })
                    statusMSG.edit({ embeds: [statusEmbed] })
                })
        } catch (error) {
            console.error(error)
        }
    }, 10000)

}

module.exports = { execute };
