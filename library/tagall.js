async function tagall(chat,client,message,announcement) {

if (chat.isGroup) {
        const authorId = message.author;
	for(let participant of chat.participants) {
		if(participant.id._serialized === authorId && participant.isAdmin) {
      let text = "";
      let mentions = [];
  
      for (let participant of chat.participants) {
        const contact = await client.getContactById(participant.id._serialized);
        mentions.push(contact);
        text += `@${participant.id.user} \n`;
      }
      await chat.sendMessage(`Announcement : ${announcement}\n\n ${text}`, { mentions });
			break;
		}
    if(participant.id._serialized === authorId && !participant.isAdmin){
      message.reply("😎Only Admins Can Execute!!😎");
    }
	}
}
        
}

module.exports = {
    tagall
}