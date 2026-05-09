const {
    PermissionsBitField
} = require('discord.js');

module.exports = {
    name: "add",

    async execute(message) {

        if (!message.channel.name.startsWith("ticket-")) {
            return message.reply("This is not a ticket.");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Mention a user.");
        }

        await message.channel.permissionOverwrites.edit(member.id, {
            ViewChannel: true,
            SendMessages: true,
            ReadMessageHistory: true
        });

        message.channel.send(`${member} has been added to the ticket.`);
    }
};
