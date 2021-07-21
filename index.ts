import Discord from 'discord.js';
const client = new Discord.Client();

require('dotenv').config();

const token = process.env.token;
console.log(token);

client.on('ready', () => {
    console.log('it turned on fantastic job');
})

client.login(token);