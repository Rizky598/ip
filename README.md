# Website Geo Tool

Tools ini adalah script JavaScript yang dapat menampilkan informasi geolokasi (wilayah, koordinat, link Google Maps) dan IP address dari sebuah website, dilengkapi dengan bingkai ASCII art dan animasi loading, serta input URL interaktif. Tools ini juga dilengkapi dengan sistem password yang mengambil password dari GitHub.

## Cara Penggunaan di Termux

1.  **Instal Termux**: Jika Anda belum memiliki Termux, unduh dari Google Play Store atau F-Droid.

2.  **Instal Node.js di Termux**: Buka Termux dan jalankan perintah berikut:
    ```bash
    pkg update && pkg upgrade
    pkg install nodejs
    pkg install git
    ```

3.  **Clone Repositori**: Clone repositori tools ini ke perangkat Anda:
    ```bash
    git clone https://github.com/your-repo/website-geo-tool.git
    cd website-geo-tool
    ```
    *(Catatan: Ganti `https://github.com/your-repo/website-geo-tool.git` dengan URL repositori yang sebenarnya jika Anda mengunggahnya ke GitHub. Untuk saat ini, Anda bisa mengunduh file secara manual atau menyalinnya.)*

4.  **Instal Dependensi**: Masuk ke direktori `website-geo-tool` dan instal dependensi yang diperlukan. File `package.json` sudah berisi daftar modul yang dibutuhkan. Cukup jalankan perintah ini:
    ```bash
    npm install
    ```

5.  **Jalankan Tools**: Cukup jalankan perintah berikut:
    ```bash
    npm start
    ```
    Tools akan meminta Anda untuk memasukkan password terlebih dahulu, kemudian akan meminta Anda untuk memasukkan URL target secara interaktif.

## Contoh Output

```
╭━𓊈 𝐑𝐈𝐙𝐊𝐘 𝐀𝐈 𝐓𝐎𝐎𝐋𝐒 𓊉━═╣
║𝙱𝙾𝚃 𝙽𝙰𝙼𝙴 : ⚙️ 𝐑𝐢𝐳𝐤𝐲-𝐀𝐢 ⚙️
┃𝚅𝙴𝚁𝚂𝙸𝙾𝙽  : 2.2
║𝙰𝚄𝐓𝐇𝐎𝐑   : 𝐑𝐢𝐳𝐤𝐲 𝐜𝐲𝐛𝐞𝐫
╰━━━━━━━━━━━━━━━━━━━━━━━═╣

┏━━『 ⚠️ 𝗣𝗘𝗥𝗜𝗡𝗚𝗔𝗧𝗔𝗡 』
╿☒ ⧽ 𝗝𝗔𝗡𝗚𝗔𝗡 𝗦𝗘𝗥𝗔𝗡𝗚 𝗦𝗜𝗧𝗨𝗦 𝗣𝗘𝗠𝗘𝗥𝗜𝗡𝗧𝗔𝗛
╽☒ ⧽ 𝗝𝗔𝗡𝗚𝗔𝗡 𝗦𝗘𝗥𝗔𝗡𝗚 𝗦𝗜𝗧𝗨𝗦 𝗣𝗘𝗡𝗗𝗜𝗗𝗜𝗞𝗔𝗡
┗━━━━━━━━━━━━━━━━━━━━━━━━
[🔒] Masukkan Password: <password_anda>
╭━𓊈 𝗥𝗜𝗭𝗞𝗬 𝗔𝗜 - 𝗨𝗥𝗟 𝗜𝗡𝗣𝗨𝗧 𓊉━═╣
┃📥 ᴍᴀꜱᴜᴋᴋᴀɴ ᴜʀʟ ᴛᴀʀɢᴇᴛ ᴜɴᴛᴜᴋ ᴅɪꜱᴇʀᴀɴɢ
╰━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━═╣
[🌐] URL Target: https://www.google.com

𓊈███████████████████████████████𓊉 100🚀
Informasi untuk www.google.com:
IP Address: 173.194.206.139
Wilayah: Mountain View, California, United States
Koordinat: 37.4225, -122.085
Link Google Maps: https://www.google.com/maps/search/?api=1&query=37.4225,-122.085
```


