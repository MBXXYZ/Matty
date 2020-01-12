const Discord = require('discord.js');
const { prefix , token, giphyToken } = require('./config.json');
const client = new Discord.Client();
const snekfetch = require('snekfetch');

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
	message.channel.send('Hello' + message.author.username + '!')

}
else if (message.content === `${prefix}help`) {
	let helpList = '```ping\nHello there!\nm!channel - Displays my makers channel\nm!n3in - Displays the N3IN Clan channel!\nm!welcome - Say hi to\nm!give```\nIf you have any questions, message @matty.p.b';
	message.channel.send(helpList);
}
else if (message.content.startsWith(`${prefix}avatar`)) {
	message.reply(message.author.avatarURL);
}
else if (message.content === `${prefix}server`) {
	message.channel.send(`Server name: ${message.guild.name}\nTotal members: ${message.guild.memberCount}`);
}
exports.run = async (client, message, args) => {
if (message.content === `${prefix}meme`) {

 
	const { body } = await snekfetch
		.get('https://www.reddit.com/r/dankmemes/top/?t=week')
		.query({ limit: 800 });
	const allowed = message.channel.nsfw ? body.data.children : body.data.children.filter(post => !post.data.over_18);
	if (!allowed.length) return message.channel.send('It seems we are out of memes');
	const randomnumber = Math.floor(Math.random() * allowed.length)
	const embed = new Discord.RichEmbed()
	.setColor(0x00A2E8)
	.setTitle(allowed[randomnumber].data.title)
	.setDescription("Posted by: " + allowed[randomnumber].data.author)
	.setImage(allowed[randomnumber].data.url)
	.addField("Other info:", "Up votes: " + allowed[randomnumber].data.ups + " / Comments: " + allowed[randomnumber].data.num_comments)
	.setFooter("r/dankmemes")
	message.channel.send(embed)
} 

}

	
	
	}
)

	 
client.login(token);