function groupinfo(chat,msg) {
    if (chat.isGroup) {
      msg.reply(`
            *Group Details*
            Name: ${chat.name}
            Description: ${chat.description}
            Created At: ${chat.createdAt.toString()}
            Created By: ${chat.owner.user}
            Participant count: ${chat.participants.length}
        `);
    } else {
      msg.reply("This command can only be used in a group!");
    }
}
module.exports= {
    groupinfo
}