module.exports = (client) => {

    client.on('guildCreate', (guild) => {

        console.log(`Joined new guild: ${guild.name}`);
    });
};
