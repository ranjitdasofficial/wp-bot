// const { fetch } = require("./header");
function loveCalculator(msg) {
  const string = msg.body.slice(6).toString();

  const names = string.trim().split(/\s+/);
  const name1 = names[0];
  const name2 = names[1];
  const axios = require("axios");

  const options = {
    method: "GET",
    url: "https://love-calculator.p.rapidapi.com/getPercentage",
    params: { sname: name1, fname: name2 },
    headers: {
      "X-RapidAPI-Key": "9a5888aecemsh82681cff039d99ep1e18ecjsn69bd724ce730",
      "X-RapidAPI-Host": "love-calculator.p.rapidapi.com",
    },
  };

  axios
    .request(options)
    .then(function (response) {
     
      const name2 = response.data.fname;
      const name1 = response.data.sname;
      const percent = response.data.percentage;
      const res = response.data.result;

      msg.reply(
        `*Lover 1 :* ${name1}\n*lover 2 :* ${name2}\n*Percentage :* ${percent}%\n*Result :* ${res}😂😂\n *Play again-> .love lover1 lover2*`
      );
    })
    .catch(function (error) {
      console.error(error);
    });
}

module.exports = {
  loveCalculator,
};
