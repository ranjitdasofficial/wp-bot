const {fetch} = require('./header')
const {getRandomItem} = require('./GenerateRandomNumber')
const {sendMedia} = require('./sendMedia')

function memes(client,msg) {
   
        fetch("https://api.imgflip.com/get_memes")
          .then(function (response) {
            return response.json();
          })
          .then(async function (data) {
            const array = data.data["memes"];
            const getText = getRandomItem(array);
            const name = getText["name"];
            const url = getText["url"];
            console.log(name);
            const media = await sendMedia(url);
            // const media = await MessageMedia.fromUrl(url);
            await client.sendMessage(msg.from, media, { caption: name });
            // chat.sendMessage(`*"${getText['text']}"*\n\n\t\t\t\tBy: *${getText['author']}*`);
          });
      
      }
module.exports = {
    memes
}