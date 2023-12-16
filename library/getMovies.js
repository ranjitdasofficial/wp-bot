async function getMovies(client, search, message) {
  (await message).reply(
    "*Bots are Searching..*\n *Please wait and don't span*"
  );

  const searchFilter = search.replace(" ", "+");
  const url = `https://api.giphy.com/v1/stickers/search?api_key=Ea2WJFNALEKFsSU6OlCpLizcBxNZk3ic&q=${searchFilter}&limit=10&offset=0&rating=g&lang=en`;

  try {
    const axios = require("axios");

    const options = {
      method: "GET",
      url: "https://filepursuit.p.rapidapi.com/",
      params: { q: search, type: "video" },
      headers: {
        "X-RapidAPI-Key": "b3438e3c64mshcb225b2de1437d3p1c7bfbjsn8ea226ec09f6",
        "X-RapidAPI-Host": "filepursuit.p.rapidapi.com",
      },
    };

    axios
      .request(options)
      .then(async function (response) {
        const base = response.data.files_found;
        const a = [];
        if (base && base.length > 0) {
          let b = 2;
          console.log(base.length);
          base.forEach((movie) => {
            a.push(movie.file_link);
          });

          if (a.length === base.length) {
            const mess = `${a.join(`\n\n`)}`;
            (await message)
              .reply(`Movies : ${search}\n *${a.length} links found.* \n\n *NOTE:* \n*1) Copy and pate  the link in notepad if not clickable*\n*2) Try changing the connection if your connection is blocking the link*
                \n ${mess}`);
          }
        } else {
          (await message).reply("*Movies Not Found*");
        }
      })
      .catch(function (error) {
        console.error(error);
      });
  } catch (error) {
    console.log(error);
  }
}

module.exports = getMovies;
