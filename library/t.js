// import pkg from "./library/header"
const {Client,LocalAuth,MessageMedia,Buttons,fetch,request,express,SocketIo,http,qrcode,constants,app,server,io} = require('./library/header')
const {getRandomItem} = require('./library/GenerateRandomNumber')
const {menu} = require('./library/menu')
const {sendId} = require('./library/sendId')
const pornpic = require('porn-picture')
const {getMenu} = require('./library/menu');
const { quotes } = require('./library/quotes');
const { memes } = require('./library/meme');
const { age } = require('./library/ageify');
const { tagall } = require('./library/tagall');
const { groupinfo } = require('./library/Group/groupinfo');
const { dlt } = require('./library/delete');
const { groupname } = require('./library/Group/groupname');
const { classlink } = require('./library/personalLink');
const {sendMedia} = require('./library/sendMedia')
const getMovies = require('./library/getMovies')
const {loveCalculator} = require('./library/loveCalculator')
const ut = "https://drive.google.com/uc?export=download&id=157qMYYITX_RX9s2kl_LT_PEwPexMQDKK";
const { Configuration, OpenAIApi } = require("openai");

const Pornsearch = require('pornsearch');
const Searcher = new Pornsearch("sunny", driver = 'pornhub');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});







const client = new Client({
  puppeteer: {
    headless: true,
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    // executablePath: 'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--single-process", // <- this one doesn't works in Windows
      "--disable-gpu",
    ],
  },
  authStrategy: new LocalAuth({
    clientId: "client-one",
  }),
});




client.initialize();
// program to get a random item from an array

const configuration = new Configuration({
  apiKey: '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',
});
const openai = new OpenAIApi(configuration);


async function runCompletion (message,body) {
 
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      max_tokens:1000,
      prompt: body,
    });
   client.sendMessage(message.from,`Q) ${body} \n\n${completion.data.choices[0].text}`)
  } catch (error) {
    console.log(error)
  }
  }


const fun=async(message,a)=>{
  const media = await a.downloadMedia()
  client.sendMessage(message.from, media);
  console.log(a.url)
}
const getImage= (message)=>{

  Pornsearch.search('pussy')
    .gifs()
    .then (gifs => {
      const a = getRandomItem(gifs)
      
      // client.sendMessage(message.from, media);
      fun(message,a);
    });


}




client.on("authenticated", (session) => {
  console.log("WHATSAPP WEB => Authenticated");
});


client.on("message",(message)=>{
  if(message.body.includes(".ai")){
    client.sendMessage(message.from,"😎😎**Please wait, while your response is being generated..\n\n it may take time depending upon your internet speed and length of response.😎😎**")
    const prompt = message.body.slice(3);
    try{
      runCompletion(message,prompt);
     }catch(e){
        console.log(e);
     }
  }
})



client.on("message", (message) => {
  if (message.body === "Hi") {
    client.sendMessage(message.from, "Hey!! what's up??");
  }else if(message.body.includes(".movies")){
const search  = message.body.slice(8);
console.log(search);
getMovies(client,search,message);


}
});
client.on("message", (message) => {
  if (message.body === ".amitquotes") {
    client.sendMessage(message.from, `*"If X is Married then X has a Wife"*\n -By: The Great Madarchod *AMIT Madarchod*`);
  }
});

client.on("message", async(message) => {
  if (message.body === ".Uttu") {
   const media  = await sendMedia(ut);
  
   client.sendMessage(message.from,media);
  }
});

client.on("message",async (message) => {
  if (message.body === ".st") {
    console.log("hey");
    try {
      const c = await sendMedia("https://i.redd.it/39y5hoa8d5o91.gif")
      client.sendMessage(message.from, c);
      
    } catch (error) {
      console.log(error)
    }
  }
});client.on("message",async (message) => {
  if (message.body.startsWith(".id")) {
   
    try {
      sendId(message,client);
      
    } catch (error) {
      console.log(error)
    }
  }
});

client.on("message", async (message) => {
  if (message.body === ".random-image") {
    // const media = MessageMedia.fromUrl('https://images.unsplash.com/photo-1657987273009-8fe82419acc6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=MnwxfDB8MXxyYW5kb218MHx8fHx8fHx8MTY1OTE5OTUwNA&ixlib=rb-1.2.1&q=80&w=1080');
    const link = "https://source.unsplash.com/random";
    const media = await sendMedia(link);
    client.sendMessage(message.from, media);
    // I tried message.reply(media) too if you're curious
  }
});

client.on("message", async (message) => {
  if (message.body.includes(".love")) {
    
    loveCalculator(message);
  }
});
client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();

  // if(msg.body==="Hello"){

  if (msg.body.includes("Hello")) {
    await chat.sendMessage(
      `Hello @${contact.id.user} , Thanks for contacting HijeckedShadow !! be in touch with you shortly`,
      {
        mentions: [contact],
      }
    );
  }else if (msg.body === ".menu") {
    try {
      getMenu(chat,contact)
    } catch (error) {
      console.log(error)
    }

  }else if (msg.body === ".quotes") {
    
   try {
    quotes(chat);
   } catch (error) {
    console.log(error)
   }
  }else if (msg.body === ".meme") {
    try {
      memes(client,msg)
    } catch (error) {
      console.log(error)
    }
  }else if (msg.body.startsWith(".age")) {
    try {
      age(msg);
    } catch (error) {
      console.log(error)
    }
  }else  if (
    msg.body === ".tagall" ||
    msg.body.includes("oe muji haru") ||
    msg.body.includes("Guys")
  ) {
    try {
      tagall(chat,client);
    } catch (error) {
      console.log(error)
    }
  }
});


client.on("message", async (msg) => {
  const chat = await msg.getChat();
  const contact = await msg.getContact();

  if (msg.body === "tag") {
    await chat.sendMessage(`Hello @${contact.id.user} `, {
      mentions: [contact],
    });
  }
  

    // console.log(await msg.reply(text, { mentions }));
    // }else if (msg.body === ".tagall") {
    //   const chat = await msg.getChat();

    //   let text = "";
    //   let mentions = [];

    //   for (let participant of chat.participants) {
    //     const contact = await client.getContactById(participant.id._serialized);

    //     mentions.push(contact);
    //     text += `@${participant.id.user} \n`;
    //   }

    //   await chat.sendMessage(text, { mentions });
   else if (msg.body === ".groupinfo") {
    try {
      groupinfo(chat,msg);
    } catch (error) {
      console.log(error)
    }
  } 
  // } else if (msg.body.startsWith(".")) {
  //   // Rfhaun4pS6rywB0JwdHykw==lAGJZUjxMWcWTg20

  //   var name = msg.body.slice(1);
  //   request.get(
  //     {
  //       url: `https://api.api-ninjas.com/v1/celebrity?name=${name}`,
  //       headers: {
  //         "X-Api-Key": "Rfhaun4pS6rywB0JwdHykw==lAGJZUjxMWcWTg20",
  //       },
  //     },
  //     function (error, response, body) {
  //       if (error) return console.error("Request failed:", error);
  //       else if (response.statusCode != 200)
  //         return console.error(
  //           "Error:",
  //           response.statusCode,
  //           body.toString("utf8")
  //         );
  //       else{
  //         console.log(body)
  //         // console.log(body.body[1].name);
  //         console.log(body[0].name);
  //         console.log(body[0].gender);
  //         // console.log(body["name"]);
  //         // console.log(body["name"]);
          
  //       } 
  //     }
  //   );
   else if (msg.body === ".delete") {
    try {
      dlt(msg);
    } catch (error) {
      console.log(error)
    }
  
  } else if (msg.body === ".like") {
    msg.react("👍");
  } else if (msg.body.startsWith(".groupname ")) {
    try {
      groupname(chat,contact,msg);
      
    } catch (error) {
      console.log(error)
    }
   
   } else if (msg.body.startsWith(".link")) {
    try {
      classlink(msg);
    } catch (error) {
      console.log(error)
    }
  }
});

client.on("group_update", (notification) => {
  // Group picture, subject or description has been updated.
  notification.sendMessage(notification.body);
  console.log("update", notification);
});

//socket io

io.on("connection", function (socket) {
  socket.emit("message", "connecting.....");
  client.on("qr", (qr) => {
    // qrcode.generate(qr, { small: true });
    console.log("QR Receiveed", qr);
    qrcode.toDataURL(qr, (err, url) => {
      socket.emit("qr", url);
      socket.emit("message", "QR Code Receiver , Scan Please");
    });
  });
  client.on("ready", async () => {
    socket.emit("message", "Whatsapp is ready");
  });
});
const port = process.env.PORT || 8000;
server.listen(port, function () {
  console.log("App is running on*:" + port);
});
