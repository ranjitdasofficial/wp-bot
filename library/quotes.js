const {fetch} = require('./header')
const {getRandomItem} = require('./GenerateRandomNumber')
function quotes(chat) {

    fetch("https://type.fit/api/quotes")
      .then(function (response) {
        return response.json();
      })
      .then(function (data) {
        const getText = getRandomItem(data);
        chat.sendMessage(
          `*"${getText["text"]}"*\n\n\t\t\t\tBy: *${getText["author"]}*`
        );
      });
}

module.exports={
    quotes
}