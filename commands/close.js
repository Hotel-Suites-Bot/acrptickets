module.exports = {
    name: "close",

    async execute(message) {

        if (!message.channel.name.startsWith("ticket-")) {
            return message.reply("This is not a ticket.");
        }

        message.reply("🔒 Closing ticket in 5 seconds...");

        setTimeout(() => {
            message.channel.delete();
        }, 5000);
    }
};
