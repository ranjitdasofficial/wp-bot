// import pkg from "./library/header"
const {
  Client,
  LocalAuth,
  MessageMedia,
  fetch,
  request,
  express,
  SocketIo,
  http,
  qrcode,
  constants,
  app,
  server,
  io,
} = require("./library/header");
const { getRandomItem } = require("./library/GenerateRandomNumber");
const { menu } = require("./library/menu");
const { sendId } = require("./library/sendId");
const pornpic = require("porn-picture");
const { getMenu } = require("./library/menu");
const { quotes } = require("./library/quotes");
const { memes } = require("./library/meme");
const { age } = require("./library/ageify");
const { tagall } = require("./library/tagall");
const { groupinfo } = require("./library/Group/groupinfo");
const { dlt } = require("./library/delete");
const { groupname } = require("./library/Group/groupname");
const { classlink } = require("./library/personalLink");
const { sendMedia } = require("./library/sendMedia");
const { loveCalculator } = require("./library/loveCalculator");
const { Configuration, OpenAIApi } = require("openai");
const Pornsearch = require("pornsearch");
const { List, Buttons } = require("whatsapp-web.js");
const getStickers = require("./library/getStickers");
const getMovies = require("./library/getMovies");
const getHelloMessage = require("./library/getHelloMessage");
const runCompletion = require("./library/runCompletion");
const Searcher = new Pornsearch("sunny", (driver = "pornhub"));
const { GoogleGenerativeAI } = require("@google/generative-ai");

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.sendFile("index.html", { root: __dirname });
});

const client = new Client({
  puppeteer: {
    headless: true,
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
// client.on('qr', qr => {
//   qrcode.generate(qr, {small: true});
// });

client.initialize();

client.on("authenticated", (session) => {
  console.log("WHATSAPP WEB => Authenticated");
});
client.on("auth_failure", (msg) => {
  console.error("WHATSAPP WEB => AUTHENTICATION FAILURE", msg);
});




// const openai = new OpenAIApi(configuration);
const openai = new GoogleGenerativeAI(process.env.API_KEY);



io.on("connection", function (socket) {
  socket.emit("message", "connecting.....");
  client.on("qr", (qr) => {
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



client.on('ready', () => {
    console.log('Client is ready!');
});



app.get("/send", async (req, res) => {
  
  const chat = await client.getChatById("120363225438657833@g.us");
  chat.sendMessage("Hey This is from Api");
  res.send("message sent");
}
);


app.post("/sendMessage", async (req, res) => {
  const { chatId, description,image,title,postId,eventType } = req.body;
  console.log(chatId,description,image,title,postId,eventType);

  res.json({
    status: true,
    message: "Message Sent",

  });

  const media = await sendMedia(`https://storage.googleapis.com/kiitconnect_bucket/media/${image}`);

  // const title = 'Your Post Title';
  const desc = `${description}.Readmore`;
  const link = `http://kiitconnect.live/kiitsocial/view/${postId}`;
  
  // const m = MessageMedia.fromFilePath(imageFilePath);
  const caption = `*Someone has Posted* Type- *${eventType}*\n\n${title?`*${title}*\n\n`:``}${desc}\n\n*View Post:* \n${link}`;

  if(image){
    await client.sendMessage(chatId,media, {
      caption: caption,
     
     });
  }else{
    await client.sendMessage(chatId,caption);
  }


  return ;

});
 
client.on("message", async (message) => {
  const tag = message.body.split(" ")[0];
  const body = message.body.replace(`${tag} `, "");
  const chat = await message.getChat();
  const getChtaBYId = await client.getChatById(chat.id._serialized);
  const chatId = chat.id._serialized;
  console.log("ChatId.....", chatId,"End chatId....");
  switch (tag.toLowerCase()) {
    case "hi":
      console.log("running");

      let button = new Buttons('Button body',[{body:'bt1'},{body:'bt2'},{body:'bt3'}],'title','footer');
    //  await getChtaBYId.sendMessage(button);

    const media = await sendMedia("https://storage.googleapis.com/kiitconnect_bucket/media/4xg3kgqx0o2");

    const title = 'Your Post Title';
    const description = `Your post description goes here. It can include  with a link.Readmore`;
    const link = 'http://kiitconnect.live';
    
    // const m = MessageMedia.fromFilePath(imageFilePath);
    const caption = `*${title&&title}*\n\n${description}\n\n*View Post:* ${link}`;

    // const caption = '*Bold* _italic_ ```code``` [link](http://kiitconnect.live)';

 
   await getChtaBYId.sendMessage(media,{
    caption: caption,
   
   });

      
      // getHelloMessage(message);
      break;
    case ".ai":
      await getChtaBYId.sendMessage("🤖 AI is ready to chat with you");
      console.log({chat:chat,message:getChtaBYId});
      // runCompletion(openai,message, body);

      break;

    case ".movies":
      getMovies(client, body, message);
      break;

    case ".love":
      loveCalculator(message);
      break;
    case ".memes":
      memes(client, msg);
      break;
    case ".groupinfo":
      groupinfo(chat, msg);
      break;
    case ".tagall":
      tagall(chat, client,message,body);
      break; 
    case ".quotes":
      quotes(chat);
      break;
    case ".age":
      age(message);
      break;
    case ".delete":
      dlt(message);
      break;

    
    default:
      if(tag.includes(".")){
        message.reply("⚠️ Command Not Found!!\n\n👉 Try (.tagname Commands)")
      }
      break;
  }
});

client.on("group_update", (notification) => {
  notification.sendMessage(notification.body);
  console.log("update", notification);
});


const port = process.env.PORT || 9000;
server.listen(port, function () {
  console.log("App is running on*:" + port);
});
