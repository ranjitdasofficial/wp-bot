async function getHelloMessage(msg){
    const chat = await msg.getChat();
    const contact = await msg.getContact();  
    
    return chat.sendMessage(
        `Hello @${contact.id.user} , Thanks for contacting KIIT-CONNECT !! If you have any problem regarding this chat Bot then contact the bot admins.`,
        {
          mentions: [contact],
        }
      );
}

module.exports= getHelloMessage;