const discordTranscripts = require('discord-html-transcripts');

module.exports = {
    name: "transcript",

    async execute(message) {

        if (!message.channel.name.startsWith("ticket-")) {
            return message.reply("This is not a ticket.");
        }

        const attachment = await discordTranscripts.createTranscript(message.channel);

        message.reply({
            files: [attachment]
        });
    }
};
