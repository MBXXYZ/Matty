const Discord = require('discord.js');
const { prefix , token, giphyToken } = require('./config.json');
const client = new Discord.Client();

var GphApiClient = require('giphy-js-sdk-core')
giphy = GphApiClient(giphyToken)


client.once('ready',() => {
	console.log('Ready!')
})

client.on('message', message => {
	 //console.log(message.content);
		
		if(message.content.startsWith(`${prefix}kick`)) {
			//message.channel.send("Kick")
            if (message.member.hasPermission(['KICK_MEMBERS', 'BAN_MEMBERS'])){
			let member = message.mentions.members.first();
			member.kick().then((member) => {
				 
					giphy.search('gifs',{"q":"sad" })
					    .then((response) => {
							var totalResponses = response.data.length;
							var responseIndex = Math.floor((Math.random() * 10) + 1) % totalResponses;
							var responseFinal = response.data[responseIndex];

							message.channel.send(":wave:" + member.displayName + " has been kicked out of here!" + ":wave:"),{
								files: [responseFinal.images.fixed_height.url]
							}		
						})
				}	
			)
			
			
		}}else if(message.content.startsWith(`${prefix}who`)) {
	
			message.channel.send("My creator is M_BX_XYZ!");
			
		}else if (message.content.startsWith(`${prefix}id`)) {
			message.channel.send(`Your username: ${message.author.username}\nYour ID: ${message.author.id}`);
		}
		else if (message.content === 'ping') {
			// Send "pong" to the same channel
			message.channel.send('Pong');
		  }
		else if (message.content === 'hello') {
			 message.channel.send('Hi!')
		}
		else if (message.content.startsWith(`${prefix}channel`)) {
			message.channel.send('https://www.youtube.com/channel/UCoXW4KGupOexeew4H9iqXHA')
		}
		else if (message.content.startsWith(`${prefix}n3in`)) {
			message.channel.send('https://www.youtube.com/channel/UCx3SjVmMirSrOddBfqSy6hg')
		}
		else if (message.content.startsWith(`${prefix}give`)) {
			message.channel.send('')
		}
		else if (message.content.startsWith(`${prefix}welcome`)) {
			message.channel.send('Hello' + member.displayName + '!')

		}
		else if (message.content === 'help') {
			let helpList = '```ping\nhello\nm!channel\nm!n3in\nm!welcome\nm!give```';
			message.channel.send(helpList);
		}
	
	}
)

	 
client.login(token);