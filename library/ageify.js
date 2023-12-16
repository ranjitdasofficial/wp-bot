const {fetch} = require('./header')
function age(msg) {
    
        const name = msg.body.slice(5).toString();
        fetch(`https://api.agify.io/?name=${name}`)
          .then(function (response) {
            return response.json();
          })
          .then(async function (data) {
            const uname = await data["name"];
            const age = await data["age"];
    
            (await msg).reply(
              `Name : ${uname}\nAge : ${age}\n\n Play again-> .age yourname`
            );
          });
      }

    module.exports={
        age
    }