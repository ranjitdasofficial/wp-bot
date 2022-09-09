const {MessageMedia} = require('whatsapp-web.js')
const sendMedia = async (msg) => {
    let media;
    if (msg.startsWith("http")) {
      media = await MessageMedia.fromUrl(msg);
    } else {
      try {
        media = await MessageMedia.fromFilePath("./files/" + msg);
      } catch (e) {
        console.log("File Not Found!!", e);
        media = "file was not found";
      }
    }
    return media;
  };

  module.exports ={
    sendMedia
  }