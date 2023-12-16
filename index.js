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
client.on('qr', qr => {
  qrcode.generate(qr, {small: true});
});

client.initialize();

client.on("authenticated", (session) => {
  console.log("WHATSAPP WEB => Authenticated");
});
client.on("auth_failure", (msg) => {
  console.error("WHATSAPP WEB => AUTHENTICATION FAILURE", msg);
});




// const openai = new OpenAIApi(configuration);
const openai = new GoogleGenerativeAI("");



// io.on("connection", function (socket) {
//   socket.emit("message", "connecting.....");
//   client.on("qr", (qr) => {
//     console.log("QR Receiveed", qr);
//     qrcode.toDataURL(qr, (err, url) => {
//       socket.emit("qr", url);
//       socket.emit("message", "QR Code Receiver , Scan Please");
//     });
//   });
//   client.on("ready", async () => {
//     socket.emit("message", "Whatsapp is ready");
//   });
// });



client.on('ready', () => {
    console.log('Client is ready!');
});


 
client.on("message", async (message) => {
  const tag = message.body.split(" ")[0];
  const body = message.body.replace(`${tag} `, "");
  const chat = await message.getChat();
  switch (tag.toLowerCase()) {
    case "hi":
      console.log("running");
      getHelloMessage(message);
      break;
    case ".ai":
      runCompletion(openai,message, body);
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


const port = process.env.PORT || 8000;
server.listen(port, function () {
  console.log("App is running on*:" + port);
});
