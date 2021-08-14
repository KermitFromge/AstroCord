import Discord from 'discord.js';
const client = new Discord.Client();
require('dotenv').config();

import Emojis from './modules/emojis';
import { Grid, Space } from './modules/classes';

const token = process.env.token;

const testGrid = new Grid(10, 10)

client.on('message', (message) => {
    if (message.content === 'print') {
        message.channel.send(testGrid.formatGrid());
    } else if (message.content === 'susmungis') {
        let thing = '';
        for (let i = 0; i < 200; i++) {
            thing += Emojis.test;
        }
        const embed = new Discord.MessageEmbed().setDescription(thing);
        message.channel.send(embed).catch(err => { message.channel.send('fuck you discord') });

    } else if (message.content === 'populate') {
        testGrid.populateAsteroids(10);
    }
});


client.on('ready', () => {
    console.log('it turned on fantastic job');
})

client.login(token);