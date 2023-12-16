const axios = require("axios")

const {getRandomItem} = require('./GenerateRandomNumber');
const { sendMedia } = require("./sendMedia");


async function getStickers(msg,search,client)
{
    const a = "hello"
const searchFilter = search.replace(" ","+");
const url = `https://api.giphy.com/v1/stickers/search?api_key=Ea2WJFNALEKFsSU6OlCpLizcBxNZk3ic&q=${searchFilter}&limit=10&offset=0&rating=g&lang=en`

try {
    axios.get(url)
    .then(async function (data) {
        console.log(data.data.data);
      const getText = getRandomItem(data.data.data);
      if(getText!=null){
          const st = getText.images.original['webp'];
          const sticker =await sendMedia("https://www.format.com/wp-content/uploads/test-3-1.gif");

          client.sendMessage(msg.from,sticker);
      }else{
        client.sendMessage(msg.from,"Sticker Not Found");
      }
     
    });
} catch (error) {
    console.log(error)
}
}

module.exports = getStickers;