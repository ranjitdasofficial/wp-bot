async function dlt(msg) {
    if (msg.hasQuotedMsg) {
        const quotedMsg = await msg.getQuotedMessage();
        if (quotedMsg.fromMe) {
          quotedMsg.delete(true);
          msg.reply("Deleted Sucessfully");
        } else {
          msg.reply("I can only delete my own messages");
        }
      }
}

module.exports = {
    dlt
}