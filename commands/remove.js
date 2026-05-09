module.exports = {
    name: "remove",

    async execute(message) {

        if (!message.channel.name.startsWith("ticket-")) {
            return message.reply("This is not a ticket.");
        }

        const member = message.mentions.members.first();

        if (!member) {
            return message.reply("Mention a user.");
        }

        await message.channel.permissionOverwrites.delete(member.id);

        message.channel.send(`${member} has been removed from the ticket.`);
    }
};
