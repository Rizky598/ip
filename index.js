
const axios = require("axios");
const { URL } = require("url");
const readline = require("readline");

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const asciiArt = `
╭━𓊈 𝐑𝐈𝐙𝐑𝐂𝐇 𝐓𝐎𝐎𝐋𝐒 𓊉━═╣
║ʙᴏᴛ ɴᴀᴍᴇ   : ⚙️ 𝐑𝐢𝐳𝐤𝐲-𝐀𝐢 ⚙️
┃ᴠᴇʀꜱɪᴏɴ    : 1.0
║ᴀᴜᴛɢᴏʀ     : 𝐑𝐢𝐳𝐤𝐲 𝐜𝐲𝐛𝐞𝐫
╰━━━━━━━━━━━━━━━━━━━━━━━═╣

┏━━『 ⚠️ 𝗣𝗘𝗥𝗜𝗡𝗚𝗔𝗧𝗔𝗡 』
╿☒ ⧽ 𝗚𝗨𝗡𝗔𝗞𝗔𝗡 𝗧𝗢𝗢𝗟𝗦 𝗜𝗡𝗜 𝗗𝗘𝗡𝗚𝗔𝗡 𝗕𝗜𝗝𝗔𝗞
╽☒ ⧽ 𝗔𝗣𝗔 𝗬𝗔𝗡𝗚 𝗔𝗡𝗗𝗔 𝗟𝗔𝗞𝗨𝗞𝗔𝗡 𝗧𝗔𝗡𝗚𝗚𝗨𝗡𝗚 𝗝𝗔𝗪𝗔𝗕 𝗣𝗥𝗜𝗕𝗔𝗗𝗜
┗━━━━━━━━━━━━━━━━━━━━━━━━
`;

async function checkWebsiteStatus(url) {
    try {
        const response = await axios.head(url, { timeout: 5000 });
        return response.status;
    } catch (error) {
        if (error.response) {
            return error.response.status;
        } else if (error.request) {
            return 'No Response (Network Error/Timeout)';
        } else {
            return 'Error: ' + error.message;
        }
    }
}

async function getWebsiteInfo(input) {
    let domain;
    try {
        const url = new URL(input);
        domain = url.hostname;
    } catch (e) {
        domain = input;
    }

    let percent = 0;
    const width = 30;
    let loadingInterval;

    process.stdout.write(`\n`);

    // ⏳ Start loading animation selama 20 detik
    loadingInterval = setInterval(() => {
        const filled = Math.floor(percent / (100 / width));
        const empty = width - filled;
        const bar = '█'.repeat(filled) + '▒'.repeat(empty);
        process.stdout.write(`\r\x1b[32m𓊈${bar}𓊉 ${percent}% 🚀\x1b[0m`);
        percent += 5;
        if (percent > 100) percent = 0;
    }, 1000);

    await new Promise(resolve => setTimeout(resolve, 20000)); // ⏱️ Delay 20 detik

    try {
        const ipResponse = await axios.get(`https://dns.google/resolve?name=${domain}&type=A`);
        const ipAddress = ipResponse.data.Answer[0].data;

        const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        const geoData = geoResponse.data;

        const status = await checkWebsiteStatus(input); // Check website status

        clearInterval(loadingInterval);
        process.stdout.write('\r' + ' '.repeat(width + 10) + '\r');

        if (geoData.status === 'success') {
            const { country, regionName, city, lat, lon } = geoData;
            const googleMapsLink = `https://www.google.com/maps/search/?api=1&query=${lat},${lon}`;

            console.log(`┏━━『 🌐 HASIL PELACAKAN 』`);
            console.log(`╿🌍 Domain: ${domain}`);
            console.log(`╽📌 IP Address: ${ipAddress}`);
            console.log(`╿📍 Lokasi: ${city}, ${regionName}, ${country}`);
            console.log(`╽🧭 Koordinat: ${lat}, ${lon}`);
            console.log(`╿🔗 Maps: ${googleMapsLink}`);
            console.log(`╿📊 Status HTTP: ${status}`); // Display HTTP status
            console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━\n`);
        } else {
            console.log(`┏━━『 ⚠️ GAGAL 』`);
            console.log(`╿🚫 Tidak dapat melacak lokasi`);
            console.log(`╽📄 Alasan: ${geoData.message}`);
            console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━\n`);
        }
    } catch (error) {
        clearInterval(loadingInterval);
        process.stdout.write('\r' + ' '.repeat(width + 10) + '\r');

        console.log(`┏━━『 ❌ ERROR 』`);
        console.log(`╿💥 Terjadi kesalahan saat pelacakan`);
        console.log(`╽📄 Detail: ${error.message}`);
        console.log(`┗━━━━━━━━━━━━━━━━━━━━━━━━\n`);
    }

    rl.close();
    process.exit(0); // ✅ Selesai langsung keluar
}

function askForUrl() {
    console.log('\x1b[38;5;40m╭━𓊈 𝗥𝗜𝗭𝗞𝗬 𝗔𝗜 - 𝗨𝗥𝗟 𝗜𝗡𝗣𝗨𝗧 𓊉━═╣\x1b[0m');
    console.log('\x1b[38;5;40m┃📥 ᴍᴀꜱᴜᴋᴋᴀɴ ᴜʀʟ ᴛᴀʀɢᴇᴛ ᴜɴᴛᴜᴋ ᴅɪꜱᴇʀᴀɴɢ\x1b[0m');
    console.log('\x1b[38;5;40m╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━═╣\x1b[0m');

    rl.question('\x1b[38;5;82m[🌐] URL Target:\x1b[0m', (url) => {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            console.log('\x1b[38;5;196m╭━⛔ 𝗘𝗥𝗥𝗢𝗥 ━╮');
            console.log('┃ URL tidak valid!');
            console.log('┃ Harus diawali dengan "http://" atau "https://"');
            console.log('╰━━━━━━━━━━━━━╯\x1b[0m\n');
            process.exit(1); // ❌ keluar jika URL tidak valid
        } else {
            getWebsiteInfo(url);
        }
    });
}

// ✅ Ambil password dari GitHub
async function getPasswordFromGitHub() {
    try {
        const response = await axios.get('https://rizky598.github.io/api/password.json');
        return response.data.password;
    } catch (error) {
        console.log('\x1b[31m⚠️ Gagal mengambil password dari server GitHub.\x1b[0m');
        process.exit(1);
    }
}

// 🔐 Verifikasi password
async function askPassword() {
    console.log(asciiArt);
    const serverPassword = await getPasswordFromGitHub();
    rl.question('\x1b[38;5;208m[🔒] Masukkan Password: \x1b[0m', (password) => {
        if (password !== serverPassword) {
            console.log('\x1b[38;5;196m⛔ Password salah! Akses ditolak.\x1b[0m\n');
            rl.close();
            process.exit(1);
        } else {
            askForUrl();
        }
    });
}

askPassword();


