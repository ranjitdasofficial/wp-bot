async function getMenu(chat,contact){
    const username = await contact.id.user;
    const heading = `Dear @${username},\n Welcome to *😈Hijecked Shadow Bot😈*`;
    const menu =
      "*.menu* -> Get Menu \n\n*.tagall* -> Get Mentioned All (Group Olny)\n\n*.groupinfo* -> Get Group Info\n\n*.delete* -> Reply with delete to delete bot msg\n\n*.groupname Name* -> To change group name\n\n*.like* -> To Like the msg\n\n*.random-image* -> To Get Random Image\n\n*.quotes* -> To get random quotes";
    const footer = "**We will be adding more item Soon. Stay Tuned!!!😍😍**";
    chat.sendMessage(`${heading}\n\n${menu}\n\n${footer}`, {
      mentions: [contact],
    });
}

module.exports = {
    getMenu
}