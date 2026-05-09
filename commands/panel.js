const {
    EmbedBuilder,
    ActionRowBuilder,
    ButtonBuilder,
    ButtonStyle
} = require('discord.js');

module.exports = {
    name: "panel",

    async execute(message) {

        const embed = new EmbedBuilder()
            .setColor("Blue")
            .setTitle("Atlantic City Roleplay Support")
            .setDescription(
                "👋 Welcome to the Atlantic City Roleplay Support Page! Please click below to open a ticket to get to one of our support team members! 🧑‍💼"
            )
            .setFooter({
                text: "Atlantic City RP Suppport"
            });

        const row = new ActionRowBuilder()
            .addComponents(
                new ButtonBuilder()
                    .setCustomId("create_ticket")
                    .setLabel("🎫 Create Ticket")
                    .setStyle(ButtonStyle.Primary)
            );

        message.channel.send({
            embeds: [embed],
            components: [row]
        });
    }
};
