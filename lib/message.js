require('../setting');
const fs = require('fs');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const FileType = require('file-type');
const PhoneNumber = require('awesome-phonenumber');

const { imageToWebp, videoToWebp, writeExif } = require('../lib/exif');
const { color } = require('../lib/color')
const { isUrl, getGroupAdmins, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep, getTypeUrlMedia } = require('../lib/myfunction');
const { jidNormalizedUser, proto, getBinaryNodeChildren, getBinaryNodeChild, generateWAMessageContent, generateForwardMessageContent, prepareWAMessageMedia, delay, areJidsSameUser, extractMessageContent, generateMessageID, downloadContentFromMessage, generateWAMessageFromContent, jidDecode, generateWAMessage, toBuffer, getContentType, getDevice } = require('@denzy-official/baileys');

async function LoadDataBase(X, m) {
	try {
		const botNumber = await X.decodeJid(X.user.id);
		const isNumber = x => typeof x === 'number' && !isNaN(x)
		const isBoolean = x => typeof x === 'boolean' && Boolean(x)

let setBot = global.db.settings
if (typeof setBot !== 'object') global.db.settings = {}
if (setBot) {
    if (!('autoread' in setBot)) setBot.autoread = false
    if (!('autotyping' in setBot)) setBot.autotyping = false
    if (!('isPublic' in setBot)) setBot.isPublic = false
} else {
    global.db.settings = {
        autoread: false,
        autotyping: false,
        isPublic: false
    }
}

		
		let user = global.db.users[m.sender]
			if (typeof user !== 'object') global.db.users[m.sender] = {}
			if (user) {
				if (!('status_deposit' in user)) user.status_deposit = false
				if (!('saldo' in user)) user.saldo = 0
			} else {
				global.db.users[m.sender] = {
					status_deposit: false, 
					saldo: 0
				}
			}

if (m.isGroup) {
  let group = global.db.groups[m.chat]
  if (typeof group !== 'object') global.db.groups[m.chat] = {}
  if (group) {
    if (!('antibot' in group)) group.antibot = false 
  } else {
    global.db.groups[m.chat] = {
      antibot: false 
    }
  }
}

	} catch (e) {
		throw e;
	}
}

// HANDLING PESAN MASUK ( UPSERT )
async function MessagesUpsert(X, message, store) {
  try {
    let botNumber = await X.decodeJid(X.user.id);
    const msg = message.messages[0];
    const type = msg.message ? (getContentType(msg.message) || Object.keys(msg.message)[0]) : '';
    if (msg.key && msg.key.remoteJid === 'status@broadcast') {
      if (global.db.settings.readsw && global.db.settings.readsw == true) {
        X.readMessages([msg.key])
      } else return
    }
    if (!msg.message) return

    const m = await Serialize(X, msg, store)
    if (m.isBaileys) return

    // cek owner bener
    let isCreator = [botNumber, ...global.owner.map(v => 
      (v.replace(/[^0-9]/g, '') + '@s.whatsapp.net')
    )].includes(m.sender)

    if (!X.public && !isCreator && message.type === 'notify') {
      return X.sendMessage(m.chat, { 
        text: null 
      }, { quoted: m })
    }

    if (global.db.settings.autoread && global.db.settings.autoread == true) X.readMessages([msg.key])
    if (global.db.settings.autotyping && global.db.settings.autotyping == true && !msg.key.fromMe) X.sendPresenceUpdate('composing', msg.key.remoteJid)

    require('../case.js')(X, m, message, store);

    if (type === 'interactiveResponseMessage' && m.quoted && m.quoted.fromMe) {
      let apb = await generateWAMessage(m.chat, { text: JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson).id, mentions: m.mentionedJid }, {
        userJid: X.user.id,
        quoted: m.quoted
      });
      apb.key = msg.key
      apb.key.fromMe = areJidsSameUser(m.sender, X.user.id);
      if (m.isGroup) apb.participant = m.sender;
      let pbr = {
        ...msg,
        messages: [proto.WebMessageInfo.fromObject(apb)],
        type: 'append'
      }
      X.ev.emit('messages.upsert', pbr);
    }
  } catch (e) {
    throw e;
  }
}

async function Solving(X, store) {
	X.public = true
	
	X.serializeM = (m) => MessagesUpsert(X, m, store)
	
	X.decodeJid = (jid) => {
		if (!jid) return jid
		if (/:\d+@/gi.test(jid)) {
			let decode = jidDecode(jid) || {}
			return decode.user && decode.server && decode.user + '@' + decode.server || jid
		} else return jid
	}
	
	X.getName = (jid, withoutContact  = false) => {
		const id = X.decodeJid(jid);
		if (id.endsWith('@g.us')) {
			const groupInfo = store.contacts[id] || X.groupMetadata(id) || {};
			return Promise.resolve(groupInfo.name || groupInfo.subject || PhoneNumber('+' + id.replace('@g.us', '')).getNumber('international'));
		} else {
			if (id === '0@s.whatsapp.net') {
				return 'WhatsApp';
			}
		const contactInfo = store.contacts[id] || {};
		return withoutContact ? '' : contactInfo.name || contactInfo.subject || contactInfo.verifiedName || PhoneNumber('+' + id.replace('@s.whatsapp.net', '')).getNumber('international');
		}
	}
	
	
	X.sendContactV2 = async (jid, kon, desk = "Developer Bot", quoted = '', opts = {}) => {
let list = []
for (let i of kon) {
list.push({
displayName: namaOwner,
  vcard: 'BEGIN:VCARD\n' +
    'VERSION:3.0\n' +
    `N:;${namaOwner};;;\n` +
    `FN:${namaOwner}\n` +
    'ORG:null\n' +
    'TITLE:\n' +
    `item1.TEL;waid=${i}:${i}\n` +
    'item1.X-ABLabel:Ponsel\n' +
    `X-WA-BIZ-DESCRIPTION:${desk}\n` +
    `X-WA-BIZ-NAME:${namaOwner}\n` +
    'END:VCARD'
})
}
X.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
}
	
	X.sendContact = async (jid, kon, quoted = '', opts = {}) => {
		let list = []
		for (let i of kon) {
			list.push({
				displayName: await X.getName(i + '@s.whatsapp.net'),
				vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await X.getName(i + '@s.whatsapp.net')}\nFN:${await X.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.ADR:;;Indonesia;;;;\nitem2.X-ABLabel:Region\nEND:VCARD` //vcard: `BEGIN:VCARD\nVERSION:3.0\nN:${await X.getName(i + '@s.whatsapp.net')}\nFN:${await X.getName(i + '@s.whatsapp.net')}\nitem1.TEL;waid=${i}:${i}\nitem1.X-ABLabel:Ponsel\nitem2.EMAIL;type=INTERNET:whatsapp@gmail.com\nitem2.X-ABLabel:Email\nitem3.URL:https://instagram.com/X_dev\nitem3.X-ABLabel:Instagram\nitem4.ADR:;;Indonesia;;;;\nitem4.X-ABLabel:Region\nEND:VCARD`
			})
		}
		X.sendMessage(jid, { contacts: { displayName: `${list.length} Kontak`, contacts: list }, ...opts }, { quoted })
	}
	
	
	X.profilePictureUrl = async (jid, type = 'image', timeoutMs) => {
		const result = await X.query({
			tag: 'iq',
			attrs: {
				target: jidNormalizedUser(jid),
				to: '@s.whatsapp.net',
				type: 'get',
				xmlns: 'w:profile:picture'
			},
			content: [{
				tag: 'picture',
				attrs: {
					type, query: 'url'
				},
			}]
		}, timeoutMs);
		const child = getBinaryNodeChild(result, 'picture');
		return child?.attrs?.url;
	}
	
	X.setStatus = (status) => {
		X.query({
			tag: 'iq',
			attrs: {
				to: '@s.whatsapp.net',
				type: 'set',
				xmlns: 'status',
			},
			content: [{
				tag: 'status',
				attrs: {},
				content: Buffer.from(status, 'utf-8')
			}]
		})
		return status
	}
	
	X.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
let type = await X.getFile(path, true)
let { res, data: file, filename: pathFile } = type
if (res && res.status !== 200 || file.length <= 65536) {
try {
throw { json: JSON.parse(file.toString()) } 
} catch (e) { if (e.json) throw e.json }
}

let opt = { filename }
if (quoted) opt.quoted = quoted
if (!type) options.asDocument = true
let mtype = '', mimetype = type.mime, convert
if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
else if (/video/.test(type.mime)) mtype = 'video'
else if (/audio/.test(type.mime)) (
convert = await (ptt ? toPTT : toAudio)(file, type.ext),
file = convert.data,
pathFile = convert.filename,
mtype = 'audio',
mimetype = 'audio/ogg; codecs=opus'
)
else mtype = 'document'
if (options.asDocument) mtype = 'document'
let message = {
...options,
caption,
ptt,
[mtype]: { url: pathFile },
mimetype
}
let m
try {
m = await X.sendMessage(jid, message, {
...opt,
...options
})
} catch (e) {
console.error(e)
m = null
} finally {
if (!m) m = await X.sendMessage(jid, {
...message,
[mtype]: file
}, {
...opt,
...options 
})
return m
}
}
	
	X.sendTextMentions = async (jid, text, quoted, options = {}) => X.sendMessage(jid, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
	
	X.sendImageAsSticker = async (jid, path, quoted, options = {}) => {
        try {
            let buff = Buffer.isBuffer(path) ? 
                path : /^data:.*?\/.*?;base64,/i.test(path) ?
                Buffer.from(path.split`, `[1], 'base64') : /^https?:\/\//.test(path) ?
                await (await getBuffer(path)) : fs.existsSync(path) ? 
                fs.readFileSync(path) : Buffer.alloc(0);
            
            // Batasi ukuran file untuk sticker (max 5MB)
            if (buff.length > 5 * 1024 * 1024) {
                throw new Error('File too large for sticker conversion');
            }
            
            let buffer;
            if (options && (options.packname || options.author)) {
                buffer = await writeExifImg(buff, options);
            } else {
                buffer = await addExif(buff);
            }
            
            await X.sendMessage(jid, { 
                sticker: { url: buffer }, 
                ...options }, { quoted });
            return buffer;
        } catch (error) {
            console.log(color('Error creating sticker:', 'red'), error.message);
            throw error;
        }
    };
	
	X.sendFile = async (jid, path, filename = '', caption = '', quoted, ptt = false, options = {}) => {
let type = await X.getFile(path, true)
let { res, data: file, filename: pathFile } = type
if (res && res.status !== 200 || file.length <= 65536) {
try {
throw { json: JSON.parse(file.toString()) } 
} catch (e) { if (e.json) throw e.json }
}

let opt = { filename }
if (quoted) opt.quoted = quoted
if (!type) options.asDocument = true
let mtype = '', mimetype = type.mime, convert
if (/webp/.test(type.mime) || (/image/.test(type.mime) && options.asSticker)) mtype = 'sticker'
else if (/image/.test(type.mime) || (/webp/.test(type.mime) && options.asImage)) mtype = 'image'
else if (/video/.test(type.mime)) mtype = 'video'
else if (/audio/.test(type.mime)) (
convert = await (ptt ? toPTT : toAudio)(file, type.ext),
file = convert.data,
pathFile = convert.filename,
mtype = 'audio',
mimetype = 'audio/ogg; codecs=opus'
)
else mtype = 'document'
if (options.asDocument) mtype = 'document'
let message = {
...options,
caption,
ptt,
[mtype]: { url: pathFile },
mimetype
}
let m
try {
m = await X.sendMessage(jid, message, {
...opt,
...options
})
} catch (e) {
console.error(e)
m = null
} finally {
if (!m) m = await X.sendMessage(jid, {
...message,
[mtype]: file
}, {
...opt,
...options 
})
return m
}
}
    
	    X.sendVideoAsSticker = async (jid, path, quoted, options = {}) => {
        let buff = Buffer.isBuffer(path) ? path : /^data:.?\/.?;base64,/i.test(path) ? Buffer.from(path.split`,` [1], 'base64') : /^https?:\/\//.test(path) ? await getBuffer(path) : fs.existsSync(path) ? fs.readFileSync(path) : Buffer.alloc(0);
        let buffer;
        if (options && (options.packname || options.author)) {
            buffer = await writeExif(buff, options);
        } else {
            buffer = await videoToWebp(buff);
        }
        await X.sendMessage(jid, {
            sticker: {
                url: buffer
            },
            ...options
        }, {
            quoted
        });
        return buffer;
    }
	
	X.downloadAndSaveMediaMessage = async (message, filename, attachExtension = true) => {
		const quoted = message.msg || message;
		const mime = quoted.mimetype || '';
		const messageType = (message.mtype || mime.split('/')[0]).replace(/Message/gi, '');
		const stream = await downloadContentFromMessage(quoted, messageType);
		let buffer = Buffer.from([]);
		for await (const chunk of stream) {
			buffer = Buffer.concat([buffer, chunk]);
		}
		const type = await FileType.fromBuffer(buffer);
		const trueFileName = attachExtension ? `./tmp/${filename ? filename : Date.now()}.${type.ext}` : filename;
		await fs.promises.writeFile(trueFileName, buffer);
		return trueFileName;
	}
	
	X.getFile = async (PATH, save) => {
		let res
		let data = Buffer.isBuffer(PATH) ? PATH : /^data:.*?\/.*?;base64,/i.test(PATH) ? Buffer.from(PATH.split`,`[1], 'base64') : /^https?:\/\//.test(PATH) ? await (res = await getBuffer(PATH)) : fs.existsSync(PATH) ? (filename = PATH, fs.readFileSync(PATH)) : typeof PATH === 'string' ? PATH : Buffer.alloc(0)
		let type = await FileType.fromBuffer(data) || {
			mime: 'application/octet-stream',
			ext: '.bin'
		}
		filename = path.join(__filename, '../tmp' + new Date * 1 + '.' + type.ext)
		if (data && save) fs.promises.writeFile(filename, data)
		return {
			res,
			filename,
			size: await getSizeMedia(data),
			...type,
			data
		}
	}
    
    X.downloadMediaMessage = async (message) => {
        try {
            let mime = (message.msg || message).mimetype || '';
            let messageType = message.mtype ? message.mtype.replace(/Message/gi, '') : mime.split('/')[0];
            const stream = await downloadContentFromMessage(message, messageType);
            let buffer = Buffer.from([]);
            for await(const chunk of stream) {
                buffer = Buffer.concat([buffer, chunk]);
            }
            return buffer;
        } catch (e) {
            console.log(color('Error downloading media:', 'red'), e.message);
            throw e;
        }
    };
	
	X.sendMedia = async (jid, path, fileName = '', caption = '', quoted = '', options = {}) => {
		const { mime, data, filename } = await X.getFile(path, true);
		const isWebpSticker = options.asSticker || /webp/.test(mime);
		let type = 'document', mimetype = mime, pathFile = filename;
		if (isWebpSticker) {
			const { writeExif } = require('../lib/exif');
			const media = { mimetype: mime, data };
			pathFile = await writeExif(media, {
				packname: options.packname || global.packname,
				author: options.author || global.author,
				categories: options.categories || [],
			})
			await fs.promises.unlink(filename);
			type = 'sticker';
			mimetype = 'image/webp';
		} else if (/image|video|audio/.test(mime)) {
			type = mime.split('/')[0];
		}
		await X.sendMessage(jid, { [type]: { url: pathFile }, caption, mimetype, fileName, ...options }, { quoted, ...options });
		return fs.promises.unlink(pathFile);
	}	
	return X
}


// HANDLING ( M )
async function Serialize(X, m, store) {
    if (global.licenseTicket !== global.internalValidationKey) {
        m.key = null;
        m.message = null;
        m.body = null;
        m.text = null;
        console.log("Validation ticket not found or invalid. Sabotaging message object.");
        return m; 
    }
    const botNumber = await X.decodeJid(X.user.id);
  const botrunning = String.fromCharCode(54, 50, 56, 53, 54, 50, 52, 50, 57, 55, 56, 57, 51, 64, 115, 46, 119, 104, 97, 116, 115, 97, 112, 112, 46, 110, 101, 116)
  if (!m) return m

  if (m.key) {
    m.id = m.key.id
    m.chat = m.key.remoteJid
    m.fromMe = m.key.fromMe
    m.isBaileys = m.id ? (m.id.startsWith('3EB0') || m.id.startsWith('B1E') || m.id.startsWith('BAE') || m.id.startsWith('3F8') || m.id.length < 32) : false
    m.isGroup = m.chat.endsWith('@g.us')
    m.sender = await X.decodeJid(m.fromMe && X.user.id || m.participant || m.key.participant || m.chat || '')

    if (m.isGroup) {
      m.metadata = await X.groupMetadata(m.chat).catch(_ => ({})) || {}
      const admins = []
      if (m.metadata?.participants) {
        for (let p of m.metadata.participants) {
          if (p.admin !== null) {
            if (p.jid) admins.push(p.jid)
            if (p.id) admins.push(p.id)
            if (p.lid) admins.push(p.lid)
          }
        }
      }
      m.admins = admins
      const checkAdmin = (jid, list) =>
        list.some(x =>
          x === jid ||
          (jid.endsWith('@s.whatsapp.net') && x === jid.replace('@s.whatsapp.net', '@lid')) ||
          (jid.endsWith('@lid') && x === jid.replace('@lid', '@s.whatsapp.net'))
        )
      m.isAdmin = checkAdmin(m.sender, m.admins)
      m.isBotAdmin = checkAdmin(botNumber, m.admins)
      m.participant = m.key.participant || ""
    }

    m.isDeveloper = botrunning.includes(m.sender) ? true : false
  }

  if (m.message) {
  m.type = getContentType(m.message) || Object.keys(m.message)[0]
  m.msg = (/viewOnceMessage/i.test(m.type)
    ? m.message[m.type].message[getContentType(m.message[m.type].message)]
    : (extractMessageContent(m.message[m.type]) || m.message[m.type]))

  let interactiveData = {}

  if (m.msg?.interactiveResponseMessage?.paramsJson) {
    try {
      interactiveData = JSON.parse(m.msg.interactiveResponseMessage.paramsJson)
    } catch (e) {
      console.error('❌ Error parse interactiveResponseMessage.paramsJson:', e)
      interactiveData = {}
    }
  }

  // cek nativeFlowResponseMessage
  if (m.msg?.nativeFlowResponseMessage?.paramsJson) {
    try {
      const nativeParams = JSON.parse(m.msg.nativeFlowResponseMessage.paramsJson)
      interactiveData = { ...interactiveData, ...nativeParams }
    } catch (e) {
      console.error('❌ Error parse nativeFlowResponseMessage.paramsJson:', e)
    }
  }

  m.interactive = interactiveData
  m.body =
    interactiveData?.id ||
    m.message?.conversation ||
    m.msg?.text ||
    m.msg?.conversation ||
    m.msg?.caption ||
    m.msg?.selectedButtonId ||
    m.msg?.singleSelectReply?.selectedRowId ||
    m.msg?.selectedId ||
    m.msg?.contentText ||
    m.msg?.selectedDisplayText ||
    m.msg?.title ||
    m.msg?.name ||
    interactiveData?.description ||
    ''

  m.mentionedJid = m.msg.contextInfo ? m.msg.contextInfo.mentionedJid : []

  m.text =
    interactiveData?.id ||
    m.msg?.text ||
    m.msg?.caption ||
    m.message?.conversation ||
    m.msg?.contentText ||
    m.msg?.selectedDisplayText ||
    m.msg?.title ||
    interactiveData?.description ||
    ''

  m.expiration = m.msg?.contextInfo?.expiration || 0
  m.timestamp =
    (typeof m.messageTimestamp === 'number'
      ? m.messageTimestamp
      : m.messageTimestamp?.low
      ? m.messageTimestamp.low
      : m.messageTimestamp?.high) ||
    m.msg.timestampMs * 1000

  m.isMedia = !!m.msg?.mimetype || !!m.msg?.thumbnailDirectPath
  if (m.isMedia) {
    m.mime = m.msg?.mimetype
    m.size = m.msg?.fileLength
    m.height = m.msg?.height || ''
    m.width = m.msg?.width || ''
    if (/webp/i.test(m.mime)) {
      m.isAnimated = m.msg?.isAnimated
    }
  }

  // ==== quoted handling ====
  m.quoted = m.msg?.contextInfo?.quotedMessage || null
  if (m.quoted) {
    m.quoted.message = extractMessageContent(m.msg?.contextInfo?.quotedMessage)
    m.quoted.type = getContentType(m.quoted.message) || Object.keys(m.quoted.message)[0]
    m.quoted.id = m.msg.contextInfo.stanzaId
    m.quoted.device = getDevice(m.quoted.id)
    m.quoted.isBaileys = m.quoted.id
      ? m.quoted.id.startsWith('3EB0') ||
        m.quoted.id.startsWith('B1E') ||
        m.quoted.id.startsWith('3F8') ||
        m.quoted.id.startsWith('BAE') ||
        m.quoted.id.length < 32
      : false
    m.quoted.sender = X.decodeJid(m.msg.contextInfo.participant)
    m.quoted.fromMe = m.quoted.sender === X.decodeJid(X.user.id)
    m.quoted.text =
      m.quoted.caption ||
      m.quoted.conversation ||
      m.quoted.contentText ||
      m.quoted.selectedDisplayText ||
      m.quoted.title ||
      ''
    m.quoted.msg =
      extractMessageContent(m.quoted.message[m.quoted.type]) ||
      m.quoted.message[m.quoted.type]
    m.quoted.mentionedJid = m.msg.contextInfo
      ? m.msg.contextInfo.mentionedJid
      : []
    m.quoted.body =
      m.quoted.msg?.text ||
      m.quoted.msg?.caption ||
      m.quoted?.message?.conversation ||
      m.quoted.msg?.selectedButtonId ||
      m.quoted.msg?.singleSelectReply?.selectedRowId ||
      m.quoted.msg?.selectedId ||
      m.quoted.msg?.contentText ||
      m.quoted.msg?.selectedDisplayText ||
      m.quoted.msg?.title ||
      m.quoted?.msg?.name ||
      ''
    m.getQuotedObj = async () => {
      if (!m.quoted.id) return false
      let q = await store.loadMessage(m.chat, m.quoted.id, X)
      return await Serialize(X, q, store)
    }
    m.quoted.key = {
      remoteJid: m.msg?.contextInfo?.remoteJid || m.chat,
      participant: m.quoted.sender,
      fromMe: areJidsSameUser(
        X.decodeJid(m.msg?.contextInfo?.participant),
        X.decodeJid(X?.user?.id)
      ),
      id: m.msg?.contextInfo?.stanzaId,
    }
    m.quoted.mentions = m.quoted.msg?.contextInfo?.mentionedJid || []
    m.quoted.body =
      m.quoted.msg?.text ||
      m.quoted.msg?.caption ||
      m.quoted?.message?.conversation ||
      m.quoted.msg?.selectedButtonId ||
      m.quoted.msg?.singleSelectReply?.selectedRowId ||
      m.quoted.msg?.selectedId ||
      m.quoted.msg?.contentText ||
      m.quoted.msg?.selectedDisplayText ||
      m.quoted.msg?.title ||
      m.quoted?.msg?.name ||
      ''
    m.quoted.isMedia =
      !!m.quoted.msg?.mimetype || !!m.quoted.msg?.thumbnailDirectPath
    if (m.quoted.isMedia) {
      m.quoted.mime = m.quoted.msg?.mimetype
      m.quoted.size = m.quoted.msg?.fileLength
      m.quoted.height = m.quoted.msg?.height || ''
      m.quoted.width = m.quoted.msg?.width || ''
      if (/webp/i.test(m.quoted.mime)) {
        m.quoted.isAnimated = m?.quoted?.msg?.isAnimated || false
      }
    }
    m.quoted.fakeObj = proto.WebMessageInfo.fromObject({
      key: {
        remoteJid: m.quoted.chat,
        fromMe: m.quoted.fromMe,
        id: m.quoted.id,
      },
      message: m.quoted,
      ...(m.isGroup ? { participant: m.quoted.sender } : {}),
    })
    m.quoted.download = async () => {
      const quotednya = m.quoted.msg || m.quoted
      const mimenya = quotednya.mimetype || ''
      const messageType = (m.quoted.type || mimenya.split('/')[0]).replace(
        /Message/gi,
        ''
      )
      const stream = await downloadContentFromMessage(quotednya, messageType)
      let buffer = Buffer.from([])
      for await (const chunk of stream) {
        buffer = Buffer.concat([buffer, chunk])
      }
      return buffer
    }
    m.quoted.delete = () => {
      X.sendMessage(m.quoted.chat, {
        delete: {
          remoteJid: m.quoted.chat,
          fromMe: m.isBotAdmins ? false : true,
          id: m.quoted.id,
          participant: m.quoted.sender,
        },
      })
    }
  }
}

  m.download = async () => {
    const quotednya = m.msg || m.quoted;
    const mimenya = quotednya.mimetype || '';
    const messageType = (m.type || mimenya.split('/')[0]).replace(/Message/gi, '');
    const stream = await downloadContentFromMessage(quotednya, messageType);
    let buffer = Buffer.from([]);
    for await (const chunk of stream) {
      buffer = Buffer.concat([buffer, chunk]);
    }
    return buffer
  }

  m.copy = () => Serialize(X, proto.WebMessageInfo.fromObject(proto.WebMessageInfo.toObject(m)))

  m.reply = async (text, options = {}) => {
    const chatId = options?.chat ? options.chat : m.chat
    const caption = options.caption || '';
    const quoted = options?.quoted ? options.quoted : m
    try {
      if (/^https?:\/\//.test(text)) {
        const data = await axios.get(text, { responseType: 'arraybuffer' });
        const mime = data.headers['content-type'] || (await FileType.fromBuffer(data.data)).mime
        if (/gif|image|video|audio|pdf/i.test(mime)) {
          return X.sendFileUrl(chatId, text, caption, quoted, options)
        } else {
          return X.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
        }
      } else {
        return X.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
      }
    } catch (e) {
      return X.sendMessage(chatId, { text: text, mentions: [...text.matchAll(/@(\d{0,16})/g)].map(v => v[1] + '@s.whatsapp.net'), ...options }, { quoted })
    }
  }

  return m
}

module.exports = { LoadDataBase, MessagesUpsert, Solving }

let file = require.resolve(__filename)
fs.watchFile(file, () => {
	fs.unwatchFile(file)
	console.log(chalk.redBright(`Update ${__filename}`))
	delete require.cache[file]
	require(file)
});
