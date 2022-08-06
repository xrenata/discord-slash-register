const client = require("../../index.js");
const config = require("../../config.json");
const ms = require("ms");

client.once('ready', async () => {
  console.log(`[CLIENT] ${client.user.tag} kullanıcısına bağlanıldı.`);

  const up = ms(ms(Math.round(process.uptime() - (client.uptime / 1000)) + ''));

  console.log(`[NODEJS] Bot yaklaşık ${up} sürede bağlandı.`);

  client.user.setActivity(`/help`)
});