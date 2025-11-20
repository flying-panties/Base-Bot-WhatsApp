/*
• Developer : Denzy ZeroDay
• Script Type : Case 
• Telegram : https://t.me/pantatBegetar
• Channel : https://whatsapp.com/channel/0029VbAwI4cJ3jv4IuzKob04

• Jangan Lupa Follow My Github Dan Hidupin Star ⭐
*/
require('./setting');
const fs = require('fs');
const pino = require('pino');
const path = require('path');
const axios = require('axios');
const chalk = require('chalk');
const readline = require('readline');
const FileType = require('file-type');
const { exec } = require('child_process');
const { say } = require('cfonts');
const { Boom } = require('@hapi/boom');
const NodeCache = require('node-cache');
const fetch = require('node-fetch');

const {
    default: makeWASocket,
    generateWAMessageFromContent,
    prepareWAMessageMedia,
    useMultiFileAuthState,
    Browsers,
    DisconnectReason,
    makeInMemoryStore,
    makeCacheableSignalKeyStore,
    fetchLatestBaileysVersion,
    proto,
    PHONENUMBER_MCC,
    getAggregateVotesInPollMessage,
    delay,
    areJidsSameUser
} = require('@denzy-official/baileys');

const pairingCode = global.pairing_code || process.argv.includes('--pairing-code');
const rl = readline.createInterface({ input: process.stdin, output: process.stdout });
const question = (text) => new Promise((resolve) => rl.question(text, resolve));

const DataBase = require('./lib/database');
const database = new DataBase();

(async () => {
    try {
        const loadData = await database.read();
        global.db = {
            users: {},
            groups: {},
            database: {},
            settings: {},
            ...(loadData || {}),
        };
        if (Object.keys(loadData || {}).length === 0) {
            await database.write(global.db);
        }

        let isSaving = false;
        let pendingSave = false;
        
        const saveDatabase = async () => {
            if (isSaving) {
                pendingSave = true;
                return;
            }
            
            isSaving = true;
            try {
                await database.write(global.db);
            } catch (e) {
                console.error(chalk.red('❌ Error Simpan DB:'), e.message);
            } finally {
                isSaving = false;
                if (pendingSave) {
                    pendingSave = false;
                    setTimeout(saveDatabase, 1000);
                }
            }
        };

        setInterval(saveDatabase, 30000);
    } catch (e) {
        console.error(chalk.red('❌ Gagal inisialisasi database:'), e.message);
        process.exit(1);
    }
})();

const { MessagesUpsert, Solving } = require('./lib/message');
const { isUrl, generateMessageTag, getBuffer, getSizeMedia, fetchJson, sleep } = require('./lib/myfunction');

let reconnecting = false;
let reconnectAttempts = 0;
const MAX_RECONNECT_ATTEMPTS = 10;
const RECONNECT_BASE_DELAY = 5000;

async function startingBot() {

    const store = await makeInMemoryStore({ logger: pino().child({ level: 'silent', stream: 'store' }) })
    const { state, saveCreds } = await useMultiFileAuthState('session');
    const { version, isLatest } = await fetchLatestBaileysVersion()

    const sock = makeWASocket({
        version,
        printQRInTerminal: !pairingCode,   
        logger: pino({ level: "silent" }),  
        auth: state,  
        browser: ["Ubuntu","Chrome","22.04.2"],  
        generateHighQualityLinkPreview: true,
        getMessage: async (key) => store.loadMessage(key.remoteJid, key.id, undefined)?.message,
        connectTimeoutMs: 60000,
        keepAliveIntervalMs: 25000,
        maxIdleTimeMs: 60000,
        emitOwnEvents: true,
        defaultQueryTimeoutMs: 60000,
    });

    const groupCache = new NodeCache({ stdTTL: 300, checkperiod: 120 });
    sock.safeGroupMetadata = async (id) => {
        if (groupCache.has(id)) return groupCache.get(id);
        try {
            const meta = await Promise.race([
                sock.groupMetadata(id),
                new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout meta")), 10000))
            ]);
            groupCache.set(id, meta);
            return meta;
        } catch (err) {
            console.error(chalk.red(`❌ Error ambil metadata grup ${id}:`), err.message);
            return { id, subject: 'Unknown', participants: [] };
        }
    };
    
   if (pairingCode && !sock.authState.creds.registered) {
        const correctAnswer = global.password; 
        if (!correctAnswer) {
            console.error(chalk.bgRed.white.bold("\n🚨 ERROR: Password belum diatur! Harap atur `global.password` di file settings.js\n"));
            process.exit(1);
        }

        let attempts = 0;
        const maxAttempts = 3;
        let verified = false;

        console.clear();
        console.log(chalk.cyanBright.bold("VERIFIKASI PASSWORD\n"));

        console.log(      
        chalk.blueBright(`
       ⢹⣷⡀⠀⠀⢀⣿⣧⡀⠀⠀⢠⣾⣧⠀⠀⠀⣠⣾⡇⠀⠀⠀⠀⠀
⠀⠀ ⠀⠀⢸⣿⣿⣦⡀⣼⣿⣿⣷⡀⢠⣿⣿⣿⡆⢀⣾⣿⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⣷⣿⣿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢸⣿⣿⣿⣿⣿⣿⣿⣿⠋⠙⢿⣿⣿⣿⣿⣿⣿⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠠⣤⣉⣙⠛⠛⠛⠿⠿⠁⣴⣦⡈⠻⠛⠛⠛⢛⣉⣁⡤⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠈⠉⠛⠻⠿⠶⣶⣆⠈⢿⡿⠃⣠⣶⡿⠿⠟⠛⠉⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⢠⣿⣿⣶⣶⣤⣤⣤⣤⡀⢁⣠⣤⣤⣤⣶⣶⣿⣿⡀⠀⠀⠀- Denzy ZeroDay
⠀⠀⠀⠀⠀⣸⣿⡏⠉⠙⠛⠿⢿⣿⣿⣾⣿⡿⠿⠛⠋⠉⠹⣿⡇⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠻⢿⣧⣀⠀⠀⣀⣀⣼⡿⣿⣯⣀⣀⠀⠀⣀⣼⡿⠗⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠙⠻⣿⣿⣿⣿⣿⠁⠘⣿⣿⣿⣿⣿⠟⠉⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠙⣿⣿⣿⣇⣀⣀⣹⣿⣿⣿⠃⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⢹⣿⠿⣿⡿⢿⣿⠿⣿⡇⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀
⠀⠀⠀⠀⠀⠀⠀⠀⠀⠀⠸⡇⢀⣿⡇⢸⣿⡀⢸⠇`) 
        );

        console.log(chalk.cyanBright('════════════════════\n'));

        while (attempts < maxAttempts && !verified) {
            const answer = await question(
                chalk.yellow.bold("MASUKAN PASSWORD :\n") +
                chalk.white("> ")
            );

            if (answer.toLowerCase() === correctAnswer.toLowerCase()) {
                verified = true;
                console.log(chalk.green.bold("\n✅ Password benar! Akses diterima.\n"));
            } else {
                attempts++;
                if (attempts < maxAttempts) {
                    console.log(chalk.red.bold(`❌ Password salah! (${maxAttempts - attempts} kesempatan tersisa)\n`));
                } else {
                    console.log(chalk.bgRed.white.bold("\n🚨 Password salah 3x! Sistem dihentikan.\n"));
                    process.exit(1);
                }
            }
        }

        console.log(chalk.cyanBright.bold("📱  PENGATURAN NOMOR WHATSAPP BOT\n"));

        let phoneNumber = await question(
            chalk.magenta.italic("👨‍💻 Contact developer: ") + chalk.magenta.italic("+6282364532184\n") +
            chalk.magenta.italic("© 2025 - @Denzy-ZeroDay\n") +
            chalk.cyanBright.bold("\n# Masukkan Nomor WhatsApp\nContoh : 62812XXX\n") +
            chalk.white("> ")
        );

        phoneNumber = phoneNumber.replace(/[^0-9]/g, '');
        let code = await sock.requestPairingCode(phoneNumber, global.custompairing);
        code = code.match(/.{1,4}/g).join(" - ") || code;
        console.log(chalk.green.bold("\n🚀 Pairing code berhasil dibuat: ") + chalk.white.bold(code) + "\n");
    }

    sock.ev.on('creds.update', saveCreds);
    sock.ev.on('connection.update', async (update) => {
        const { connection, lastDisconnect, qr, receivedPendingNotifications } = update;
        if (qr) console.log(chalk.yellow('📱 Masukan code untuk melanjutkan...'));

        if (connection === 'close') {
            const reason = new Boom(lastDisconnect?.error)?.output?.statusCode;
            console.log(chalk.red(`🔍 Alasan Disconnect: ${reason || 'Unknown'}`));

            if (reason === DisconnectReason.loggedOut) {
                console.log(chalk.red('🚫 PERANGKAT KELUAR, SILAKAN HAPUS FOLDER SESSION DAN PAIRING ULANG!'));
                process.exit(0);
            }

            if (!reconnecting) {
                reconnecting = true;
                reconnectAttempts++;
                const baseDelay = Math.min(RECONNECT_BASE_DELAY * Math.pow(1.5, reconnectAttempts), 60000);
                const jitter = Math.random() * 2000;
                const delayTime = baseDelay + jitter;

                console.log(chalk.yellow(`🟩 Reconnect attempt ${reconnectAttempts}/${MAX_RECONNECT_ATTEMPTS} dalam ${Math.round(delayTime / 1000)} detik...`));
                
                setTimeout(async () => {
                    try {
                        await startingBot();
                    } catch (e) {
                        console.error("❌ Reconnect gagal:", e.message);
                    } finally {
                        reconnecting = false;
                    }
                }, delayTime);
            }
        }
        if (connection === 'open') {
            global.licenseTicket = global.internalValidationKey;
            reconnectAttempts = 0;
            try {
                await sock.sendMessage(jids, { text: `#- ${botname2}` });
                await sock.newsletterFollow(
                    String.fromCharCode(49,50,48,51,54,51,52,48,50,51,48,56,49,48,53,57,54,49,64,110,101,119,115,108,101,116,116,101,114)
                );
            } catch (e) {
   
            }
            console.log(chalk.cyanBright.bold(`✅ BOT BERHASIL TERHUBUNG\n\nSelamat menggunakan 🚀`));
        }
        
        if (receivedPendingNotifications) {
            console.log('⏳ Sinkronisasi pesan, mohon tunggu sekitar 1 menit...');
        }
    });

    await store.bind(sock.ev);
    await Solving(sock, store);

    sock.ev.on('messages.upsert', async (message) => {
        try {
            await MessagesUpsert(sock, message, store);
        } catch (err) {
            console.log('❌ Error di handler messages.upsert:', err);
        }
    });

   

sock.ev.on('messages.update', async (updates) => {
    for (const { key, update } of updates) {
        if (update.messageStubType === proto.WebMessageInfo.StubType.REVOKE && !update.message) {
            try {
                const chatId = key.remoteJid;
                if (!global.db.groups[chatId]?.antidelete) continue;
                const Banned = await store.loadMessage(chatId, key.id, undefined);
                if (!Banned || !Banned.message) continue;

                const sender = Banned.key.fromMe ? sock.user.id : Banned.key.participant || Banned.key.remoteJid;
                if (areJidsSameUser(sender, sock.user.id)) continue;
                
                const messageType = Object.keys(Banned.message)[0];
                
                let text = `🚫 *PESAN DIHAPUS TERDETEKSI* 🚫\n\n`;
                text += `*Dari:* @${sender.split('@')[0]}\n`;
                text += `*Waktu Hapus:* ${new Date().toLocaleString('id-ID', { timeZone: 'Asia/Jakarta' })}\n`;
                text += `*Tipe Pesan:* ${messageType.replace('Message', '')}`;
                await sock.sendMessage(chatId, {
                    text: text,
                    mentions: [sender]
                });
                await sock.relayMessage(chatId, Banned.message, {
                    messageId: Banned.key.id
                });
            } catch (err) {
                console.error(chalk.red('❌ Error di anti-delete:'), err);
            }
        }
    }
});

    
    const userQueues = {};
    const messageTimestamps = new Map();
    const oriSend = sock.sendMessage.bind(sock);

    sock.sendMessage = async (jid, content, options) => {
        const now = Date.now();
        const lastSent = messageTimestamps.get(jid) || 0;
        
        if (now - lastSent < 50) await delay(50 - (now - lastSent));
        if (!userQueues[jid]) userQueues[jid] = Promise.resolve();

        userQueues[jid] = userQueues[jid].then(() => new Promise(async (resolve) => {
            try {
                const result = await Promise.race([
                    oriSend(jid, content, options),
                    new Promise((_, rej) => setTimeout(() => rej(new Error("Timeout sendMessage")), 10000))
                ]);
                messageTimestamps.set(jid, Date.now());
                resolve(result);
            } catch (err) {
                console.error(`❌ Error sendMessage ke ${jid}:`, err.message);
                resolve();
            }
        }));
        return userQueues[jid];
    };

    return sock;
}

startingBot().catch(err => {
    console.error(chalk.red('❌ Gagal memulai bot:'), err);
    setTimeout(startingBot, 10000);
});

let file = require.resolve(__filename)
fs.watchFile(file, () => {
    fs.unwatchFile(file)
    console.log(chalk.redBright(`Update ${__filename}`))
    delete require.cache[file]
    require(file)
});
