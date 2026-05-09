const {
    PermissionsBitField,
    ChannelType,
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

const discordTranscripts = require('discord-html-transcripts');

const config = require('../config.json');

module.exports = (client) => {

    client.on('interactionCreate', async (interaction) => {

        if (!interaction.isButton()) return;

        // CREATE TICKET
        if (interaction.customId === "create_ticket") {

            const existingTicket = interaction.guild.channels.cache.find(
                c => c.name === `ticket-${interaction.user.username.toLowerCase()}`
            );

            if (existingTicket) {

                return interaction.reply({
                    content: `You already have a ticket: ${existingTicket}`,
                    ephemeral: true
                });
            }

            const channel = await interaction.guild.channels.create({
                name: `ticket-${interaction.user.username}`,
                type: ChannelType.GuildText,
                parent: config.ticketCategory,

                permissionOverwrites: [
                    {
                        id: interaction.guild.id,
                        deny: [PermissionsBitField.Flags.ViewChannel]
                    },
                    {
                        id: interaction.user.id,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ]
                    },
                    {
                        id: config.staffRole,
                        allow: [
                            PermissionsBitField.Flags.ViewChannel,
                            PermissionsBitField.Flags.SendMessages,
                            PermissionsBitField.Flags.ReadMessageHistory
                        ]
                    }
                ]
            });

            const embed = new EmbedBuilder()
                .setColor("Blue")
                .setTitle("🎫 Support Ticket")
                .setDescription(
                    `👋 Welcome ${interaction.user}!\n\nPlease give us as much detail as possible on what you are inquiring about!`
                );

            const row = new ActionRowBuilder()
                .addComponents(
                    new ButtonBuilder()
                        .setCustomId("close_ticket")
                        .setLabel("Close Ticket")
                        .setStyle(ButtonStyle.Danger)
                );

            channel.send({
                content: `${interaction.user} <@&${config.staffRole}>`,
                embeds: [embed],
                components: [row]
            });

            interaction.reply({
                content: `Ticket created: ${channel}`,
                ephemeral: true
            });
        }

        // CLOSE BUTTON
        if (interaction.customId === "close_ticket") {

            const attachment = await discordTranscripts.createTranscript(interaction.channel);

            const transcriptChannel = interaction.guild.channels.cache.get(config.transcriptChannel);

            if (transcriptChannel) {

                transcriptChannel.send({
                    content: `Transcript from ${interaction.channel.name}`,
                    files: [attachment]
                });
            }

            await interaction.reply({
                content: "🔒 Closing ticket in 5 seconds..."
            });

            setTimeout(() => {
                interaction.channel.delete();
            }, 5000);
        }
    });
};
