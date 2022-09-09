function groupname(chat,contact,msg) {
    if (chat.isGroup) {
        let newSubject = msg.body.slice(10);
        chat.setSubject(newSubject);
  
        chat.sendMessage(
          `Group Name Change to *${newSubject}* by *@${contact.id.user}* `,
          {
            mentions: [contact],
          }
        );
      } else {
        msg.reply("This command can only be used in a group!");
      }
    }

    module.exports = {
        groupname
    }