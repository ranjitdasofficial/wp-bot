const { sendMedia } = require("./sendMedia");

const sendId = async (msg, client) => {
  const getmes = msg.body.slice(4).toString();
  if (getmes == "Rohan" || getmes == "rohan") {
    const link = await sendMedia(
      "https://drive.google.com/uc?export=download&id=1W3VOXj0zRaoiturTTPB3BeAZuqNQXe1r"
    );

    client.sendMessage(msg.from, link);
  }
  else if (getmes == "amit" || getmes == "Amit") {
    const link = await sendMedia(
      "https://drive.google.com/uc?export=download&id=1a4PpplhaoICHJgN7nCxiZG4NEeZgzpOl"
    );

    client.sendMessage(msg.from, link);
  }
  else if (getmes == "supreet" || getmes == "Supreet") {
    const link = await sendMedia(
      "https://drive.google.com/uc?export=download&id=1WNW3lJBadevcKRjW2PQffkKCOQpop_-O"
    );

    client.sendMessage(msg.from, link);
  }
  else if (
    getmes == "Uttu" ||
    getmes == "uttu" ||
    getmes == "utkrisht" ||
    getmes == "Utkrisht"
  ) {
    const link = await sendMedia(
      "https://drive.google.com/uc?export=download&id=1wnWDhAGztYCZBMmO_Dx9w98_sZMUb0_g"
    );

    client.sendMessage(msg.from, link);
  }else{
    client.sendMessage(msg.from,"Id Not Found!! MF😂😂");
  }
};

module.exports = {
  sendId,
};
