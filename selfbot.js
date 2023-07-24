const { Client, MessageEmbed } = require("discord.js-selfbot-v13");
const client = new Client({
  checkUpdate: false,
});

//#################################################
const { exec } = require('child_process');
const fs = require('fs');
const config = require('./config.json');
const twitchUsername = 'sculexu';
//#################################################

client.on('ready', () => {
  const bosi = `
  .########...#######...######..####
  .##.....##.##.....##.##....##..##.
  .##.....##.##.....##.##........##.
  .########..##.....##..######...##.
  .##.....##.##.....##.......##..##.
  .##.....##.##.....##.##....##..##.
  .########...#######...######..####                made by sculex sefu                            
  `;
  console.log(bosi)
  const twitchURL = `https://twitch.tv/${twitchUsername}`;
  client.user.setActivity('BOSI made by sculex with 🧠 and ❤️', { type: 'STREAMING', url: twitchURL });
});
client.on('messageCreate', async(message) => {
  if (!config.bosi.includes(message.author.id)) {
    return;
  }

  if (message.content === 'afkchecker') {
   message.delete()
    .catch((error) => {
      console.error(error);
    });

    for (let i = 1; i <= 100; i++) {
      message.channel.send(i.toString());
    }
  }

  if (message.content === 'alphabet') {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz';
    message.delete()
      .catch((error) => {
        console.error(error);
      });
    for (let letter of alphabet) {
      message.channel.send(letter);
    }
  }
  if (message.content === 'troll') {
    const alphabet = 'JKAJKSFHKSJKSFJKajlsaflajfJSHFSAKSKFKAJFKSJFNSFKA;kskfs';
    message.delete()
      .catch((error) => {
        console.error(rrror);
      });

    for (let letter of alphabet) {
      message.channel.send(letter);
    }
  }
})
client.on('messageCreate', async (message) => {
  if (!config.bosi.includes(message.author.id)) {
    return;
  }
  const args = message.content.split(/ +/);
  const command = args.shift().toLowerCase();

  if (command === 'pack') {

  const notepad = fs.readFileSync('./notepad.txt', 'utf-8').split('\n');
  const userMentioned = message.mentions.users.first();
  if (!userMentioned) {
    console.log('mention someone');
    return;
  }

  for (const line of notepad) {
    if (line.trim() !== '') {
      message.channel.send("## > " + line + ` ${userMentioned}`)
      await new Promise((resolve) => setTimeout(resolve, 1000)); 
    }
  }
  } else if (command === 'loser') {
    message.delete()
    .catch((error) => {
      console.error(error);
    });

    message.channel.send('FIGHT ME NIG').then(() => {

      process.once('exit', () => {
        require('child_process').spawn(process.argv.shift(), process.argv, {
          cwd: process.cwd(),
          detached: true,
          stdio: 'inherit',
        });
      });
      process.exit();
  })
} else if (command === 'commands') {
  const user = message.author;
  user.send("```js\n\npack <@mention> = spam someone from notepad \n\nloser = stops the spam (restarts the script, kinda buggy aint gnl) \n\nafkchecker = AFK checker lol \n\n troll = spam letters idk \n\nalphabet = Spameaza alfabetul```https://media.discordapp.net/attachments/1130217480812494969/1132035801111339008/357619310_956315675622209_6193614682054826516_n__1_-removebg-preview.png")
  .then()
      .catch((error) => {
        console.error(error);
      });
}
});

client.login(config.token);