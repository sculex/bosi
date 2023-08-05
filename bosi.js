//#######################################################################
//#######################################################################
//#######################################################################
//#######################--PACKAGES--####################################
/*#*/const axios = require('axios');//###################################
/*#*/const fs = require('fs').promises;//################################
/*#*/const config = require('./config.json');//##########################
/*#*/const Discord = require('discord.js-selfbot-v13');//################
//#######################################################################
//#######################################################################
//#######################################################################
//#######################################################################
/*#*/const channelID = config.channel;//#################################
/*#*/const clientList = [];//############################################
//#######################################################################
//#######################################################################
//#######################################################################
//#######################--PACKAGES--####################################

if (!channelID) {
    console.error("Config file must have valid 'channel' properties.");
    process.exit(1);
}

async function getMentionList() {
    try {
        const ids = await fs.readFile("ids.txt", "utf8");
        return ids.split("\n").filter(id => id); // Remove empty lines
    } catch (error) {
        console.error(` | ❌ | Error reading 'ids.txt': ${error.message}`);
        return [];
    }
}

async function sendMessage(token, message) {
    const headers = {
        "Authorization": token
    };

    try {
        const mentionList = await getMentionList();
        const mentionString = mentionList.length > 0 ? mentionList.map(id => `<@${id}>`).join(' ') + ' ' : '';

        const response = await axios.post(
            `https://discord.com/api/v9/channels/${channelID}/messages`,
            { content: `## > ${mentionString} ${message}` },
            { headers: headers }
        );

        if (response.status !== 200) {
            console.error(`  | ❌  |  Error sending message: ${response.statusText}`);
        }
    } catch (error) {
        console.error(` | ❌ | Error sending message: ${error.message}`);
    }
}

async function main() {
    try {
        console.log(`\u001b[32m
            .########...#######...######..####
            .##.....##.##.....##.##....##..##.
            .##.....##.##.....##.##........##.
            .########..##.....##..######...##.
            .##.....##.##.....##.......##..##.
            .##.....##.##.....##.##....##..##.
            .########...#######...######..####                \u001b[0m
                  Made by sculex sefu      
        `);
        try {
            await fs.access("tokens.txt");
            await fs.access("notepad.txt");
        } catch (error) {
            console.error(` | ❌ | Error accessing required files: ${error.message}`);
            return;
        }

        const tokens = await fs.readFile("tokens.txt", "utf8");
        const tokenList = tokens.split("\n");

        const lines = await fs.readFile("notepad.txt", "utf8");
        const messageList = lines.split("\n");

        for (let i = 0; i < tokenList.length; i++) {
            const token = tokenList[i];
            const client = new Discord.Client({
                checkUpdate: false,
            });
            const statuse = [
                'clixy e o tarfa',
                'sculex on top',
                'sculex va fute mamele',
                'bag pulan mata',
                'o fut pe matan sitl naruto',
              ];
              
              let currentStatusIndex = 0;
            client.on('ready', () => {
                twici(); 
                setInterval(twici, 60000);
              });
              
              function twici() {
                client.user.setActivity(statuse[currentStatusIndex], { type: 'STREAMING', url: 'https://twitch.tv/sculexu' });
                currentStatusIndex = (currentStatusIndex + 1) % statuse.length; 
              }
            clientList.push(client);

            client.once('ready', async () => {
                console.log(`Logged on ${client.user.tag}`);
                for (const message of messageList) {
                    await sendMessage(token, message);
                    await new Promise(resolve => setTimeout(resolve, 5000));
                }
                await client.destroy();
            });

            await client.login(token);
        }
    } catch (error) {
        console.error(error);
    }
}

main();
