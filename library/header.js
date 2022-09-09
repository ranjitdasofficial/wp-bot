const { Client, LocalAuth, MessageMedia, Buttons } = require("whatsapp-web.js");
const fetch = require("cross-fetch");
const request = require("request");
const express = require('express')
const SocketIo = require("socket.io");
// const qrcode = require('qrcode-terminal');
const fs = require("fs");
const http = require("http");
const qrcode = require("qrcode");
const { constants } = require("buffer");

const app = express();

const server = http.createServer(app);
const io = SocketIo(server);

module.exports = {
    Client,LocalAuth,MessageMedia,Buttons,fetch,request,express,SocketIo,http,qrcode,constants,app,server,io
}
