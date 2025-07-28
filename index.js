const axios = require("axios");
const { URL } = require("url");
const readline = require("readline");
const fs = require("fs");
const whois = require("whois"); // Untuk info WHOIS
const dns = require("dns-lookup-promises"); // Untuk DNS Records
const cheerio = require("cheerio"); // Untuk ekstraksi link

const rl = readline.createInterface({
    input: process.stdin,
    output: process.stdout
});

const asciiArt = `
╭━𓊈 𝐑𝐈𝐙𝐑𝐂𝐇 𝐓𝐎𝐎𝐋𝐒 𓊉━═╣
║ʙᴏᴛ ɴᴀᴍᴇ   : ⚙️ 𝐑𝐢𝐳𝐤𝐲-𝐀𝐢 ⚙️
┃ᴠᴇʀꜱɪᴏɴ    : 3.0 (Supercharged)
║ᴀᴜᴛʜᴏʀ     : 𝐑𝐢𝐳𝐤𝐲 𝐜𝐲𝐛𝐞𝐫
╰━━━━━━━━━━━━━━━━━━━━━━━═╣

┏━━『 ⚠️ 𝗣𝗘𝗥𝗜𝗡𝗚𝗔𝗧𝗔𝗡 』
╿☒ ⧽ 𝗚𝗨𝗡𝗔𝗞𝗔𝗡 𝗧𝗢𝗢𝗟𝗦 𝗜𝗡𝗜 𝗗𝗘𝗡𝗚𝗔𝗡 𝗕𝗜𝗝𝗔𝗞
╽☒ ⧽ 𝗔𝗣𝗔 𝗬𝗔𝗡𝗚 𝗔𝗡𝗗𝗔 𝗟𝗔𝗞𝗨𝗞𝗔𝗡 𝗧𝗔𝗡𝗚𝗚𝗨𝗡𝗚 𝗝𝗔𝗪𝗔𝗕 𝗣𝗥𝗜𝗕𝗔𝗗𝗜
┗━━━━━━━━━━━━━━━━━━━━━━━━
`;

function saveResultToFile(content) {
    try {
        fs.appendFileSync("results.txt", content + "\n\n" + "=".repeat(50) + "\n\n");
        console.log("\n\x1b[32m✅ Hasil lengkap berhasil disimpan ke results.txt\x1b[0m");
    } catch (err) {
        console.log("\n\x1b[31m Gagal menyimpan hasil ke file.\x1b[0m");
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
        // --- 1. Info Dasar & Lokasi IP ---
        const ipResponse = await axios.get(`https://dns.google/resolve?name=${domain}&type=A`);
        const ipAddress = ipResponse.data.Answer[0].data;
        const geoResponse = await axios.get(`http://ip-api.com/json/${ipAddress}`);
        const geoData = geoResponse.data;

        let basicInfo = "┏━━『 🌐 INFO DASAR & LOKASI 』\n";
        basicInfo += `╿🌍 Domain: ${domain}\n`;
        basicInfo += `╽📌 IP Address: ${ipAddress}\n`;
        if (geoData.status === 'success') {
            basicInfo += `╿📍 Lokasi: ${geoData.city}, ${geoData.regionName}, ${geoData.country}\n`;
            basicInfo += `╽🔗 Maps: https://www.google.com/maps/search/?api=1&query=${geoData.lat},${geoData.lon}\n`;
        }
        basicInfo += `┗━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        console.log(basicInfo);
        resultText += basicInfo;

        // --- 2. Info WHOIS ---
        await new Promise((resolve, reject) => {
            whois.lookup(domain, (err, data) => {
                if (err) {
                    resolve(); // Jangan hentikan proses jika WHOIS gagal
                    return;
                }
                let whoisInfo = "┏━━『 👤 INFO WHOIS 』\n";
                const creationDate = data.match(/Creation Date: (.*)/i);
                const expirationDate = data.match(/Registry Expiry Date: (.*)/i);
                const registrar = data.match(/Registrar: (.*)/i);
                
                whoisInfo += `╿📅 Dibuat: ${creationDate ? creationDate[1].trim() : 'Tidak ditemukan'}\n`;
                whoisInfo += `╿⏳ Kedaluwarsa: ${expirationDate ? expirationDate[1].trim() : 'Tidak ditemukan'}\n`;
                whoisInfo += `╽🏢 Registrar: ${registrar ? registrar[1].trim() : 'Tidak ditemukan'}\n`;
                whoisInfo += `┗━━━━━━━━━━━━━━━━━━━━━━━━\n`;
                console.log(whoisInfo);
                resultText += whoisInfo;
                resolve();
            });
        });

        // --- 3. DNS Records ---
        const dnsRecords = await dns.resolve(domain, ['A', 'MX', 'TXT', 'NS']);
        let dnsInfo = "┏━━『 📡 DNS RECORDS 』\n";
        dnsInfo += `╿A (IP Address): ${dnsRecords.A ? dnsRecords.A.join(', ') : 'Tidak ditemukan'}\n`;
        dnsInfo += `╿MX (Mail Server): ${dnsRecords.MX ? dnsRecords.MX.map(r => r.exchange).join(', ') : 'Tidak ditemukan'}\n`;
        dnsInfo += `╿NS (Name Server): ${dnsRecords.NS ? dnsRecords.NS.join(', ') : 'Tidak ditemukan'}\n`;
        dnsInfo += `╽TXT Records: ${dnsRecords.TXT ? dnsRecords.TXT.map(r => `"${r.join('')}"`).join(', ') : 'Tidak ditemukan'}\n`;
        dnsInfo += `┗━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        console.log(dnsInfo);
        resultText += dnsInfo;

        // --- 4. HTTP Headers & Link Extraction ---
        const webResponse = await axios.get(input, { timeout: 7000 });
        const headers = webResponse.headers;
        let httpInfo = "┏━━『 ⚙️ HTTP HEADERS & TEKNOLOGI 』\n";
        httpInfo += `╿📊 Status: ${webResponse.status} ${webResponse.statusText}\n`;
        httpInfo += `╿💻 Server: ${headers['server'] || 'Tidak terdeteksi'}\n`;
        httpInfo += `╽⚡ Powered by: ${headers['x-powered-by'] || 'Tidak terdeteksi'}\n`;
        httpInfo += `┗━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        console.log(httpInfo);
        resultText += httpInfo;

        const $ = cheerio.load(webResponse.data);
        let linkInfo = "┏━━『 🔗 LINK DITEMUKAN (MAKS 10) 』\n";
        const links = $('a');
        let count = 0;
        links.each((i, link) => {
            if (count < 10) {
                const href = $(link).attr('href');
                if (href && (href.startsWith('http') || href.startsWith('/'))) {
                    linkInfo += `╿🔗 ${href}\n`;
                    count++;
                }
            }
        });
        if (count === 0) linkInfo += "╿Tidak ada link yang ditemukan.\n";
        linkInfo += `┗━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        console.log(linkInfo);
        resultText += linkInfo;

    } catch (error) {
        let errorText = `┏━━『 ❌ ERROR 』\n`;
        errorText += `╿💥 Terjadi kesalahan saat analisis\n`;
        errorText += `╽📄 Detail: ${error.message}\n`;
        errorText += `┗━━━━━━━━━━━━━━━━━━━━━━━━\n`;
        console.log(errorText);
        resultText += errorText;
    } finally {
        saveResultToFile(resultText);
        rl.close();
    }
}

function askForUrl() {
    console.log('\x1b[38;5;40m╭━𓊈 𝗥𝗜𝗭𝗞𝗬 𝗔𝗜 - 𝗨𝗥𝗟 𝗜𝗡𝗣𝗨𝗧 𓊉━═╣\x1b[0m');
    console.log('\x1b[38;5;40m┃📥 ᴍᴀꜱᴜᴋᴋᴀɴ ᴜʀʟ ᴛᴀʀɢᴇᴛ ᴜɴᴛᴜᴋ ᴅɪᴀɴᴀʟɪꜱɪꜱ\x1b[0m');
    console.log('\x1b[38;5;40m╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━═╣\x1b[0m');

    rl.question('\x1b[38;5;82m[🌐] URL Target: \x1b[0m', (url) => {
        if (!url.startsWith("http://") && !url.startsWith("https://")) {
            console.log('\x1b[38;5;196m╭━⛔ 𝗘𝗥𝗥𝗢𝗥 ━╮');
            console.log('┃ URL tidak valid! Harus diawali dengan "http://" atau "https://"');
            console.log('╰━━━━━━━━━━━━━╯\x1b[0m\n');
            rl.close();
        } else {
            getWebsiteInfo(url);
        }
    });
}

async function getPasswordFromGitHub() {
    try {
        const response = await axios.get('https://rizky598.github.io/api/password.json');
        return response.data.password;
    } catch (error) {
        console.log('\x1b[31m⚠️ Gagal mengambil password dari server GitHub.\x1b[0m');
        process.exit(1);
    }
}

async function askPassword() {
    console.log(asciiArt);
    const serverPassword = await getPasswordFromGitHub();
    rl.question('\x1b[38;5;208m[🔒] Masukkan Password: \x1b[0m', (password) => {
        if (password !== serverPassword) {
            console.log('\x1b[38;5;196m⛔ Password salah! Akses ditolak.\x1b[0m\n');
            rl.close();
        } else {
            askForUrl();
        }
    });
}

askPassword();
