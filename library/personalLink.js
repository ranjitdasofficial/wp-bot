function classlink(msg) {
    const subname = msg.body.slice(6);
    if (subname === "oops") {
      msg.reply("https://meet.google.com/xbm-kxsf-awi");
    } else if (subname === "oopslab") {
      msg.reply("https://meet.google.com/yem-kbva-syb");
    } else if (subname === "dsa") {
      msg.reply("https://kiit-ac-in.zoom.us/j/7328821069");
    } else if (subname === "dms") {
      msg.reply("http://meet.google.com/wqj-cytx-ise");
    } else if (subname === "eco") {
      msg.reply("https://meet.google.com/xcz-jgiy-hhg");
    } else if (subname === "ps") {
      msg.reply("https://meet.google.com/uoe-kjaw-vxq");
    }
}

module.exports = {
    classlink
}