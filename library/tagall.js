async function tagall(chat,client) {
        let text = "";
        let mentions = [];
    
        for (let participant of chat.participants) {
          const contact = await client.getContactById(participant.id._serialized);
    
          mentions.push(contact);
          text += `@${participant.id.user} \n`;
        }
        await chat.sendMessage(text, { mentions });
}

module.exports = {
    tagall
}