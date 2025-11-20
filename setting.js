/*
• Developer : Denzy ZeroDay
• Script Type : Case 
• Telegram : https://t.me/pantatBegetar
• Channel : https://whatsapp.com/channel/0029VbAwI4cJ3jv4IuzKob04

• Jangan Lupa Follow My Github Dan Hidupin Star ⭐
*/
const chalk = require("chalk");
const fs = require("fs");

global.owner = ["6282364532184"]
global.botname = "@denzy-official/baileys 🕊️"
global.botname2 = "Base Bot New"

global.tempatDB = 'database.json' // jangan di ubah
global.password = "Denzy ZeroDay"; 
global.pairing_code = true 
global.custompairing = String.fromCharCode(65,78,65,75,65,66,65,72)

global.telegram = "t.me/pantatbegetar"
global.namaChannel = "Denzy ZeroDay"
global.linkSaluran = "https://whatsapp.com/channel/0029VbAwI4cJ3jv4IuzKob04"


global.mess = {
    owner: `🚫 *AKSES DITOLAK*\nFitur ini hanya bisa digunakan oleh *Owner Bot*.`,
    admin: `🚫 *AKSES DITOLAK*\nFitur ini khusus untuk *Admin Grup*.`,
    botAdmin: `🚫 *AKSES DITOLAK*\nBot harus menjadi *Admin Grup* terlebih dahulu untuk menjalankan fitur ini.`,
    group: `🚫 *AKSES DITOLAK*\nFitur ini hanya dapat digunakan di *dalam grup*.`,
    private: `🚫 *AKSES DITOLAK*\nFitur ini hanya bisa digunakan di *chat pribadi*.`,
    prem: `🚫 *AKSES DITOLAK*\nFitur ini hanya tersedia untuk *User Premium*.\n> ketik .prem dan upgrade nomor mu`,
    wait: `⏳ *Mohon tunggu...*\nPermintaan kamu sedang diproses.`,
    error: `❌ *Terjadi kesalahan!*\nSilakan coba lagi nanti.`,
    done: `✅ *Berhasil!*\nProses telah selesai dengan sukses.`
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.white("[•] Update"), chalk.white(`${__filename}\n`))
delete require.cache[file]
require(file)
})
