# Cara Memakai Kode Super Clean
1. **Ambil Token**

Silahkan ambil token bot di discord developer atau klik [disini](https://discord.com/developers/applications)

2. **Invite Bot**

Pastikan sebelum menggunakan bot, bot sudah di invite ke server dengan link berikut
```
https://discord.com/api/oauth2/authorize?client_id=IdBot&permissions=8&scope=bot%20applications.commands
```
Silahkan ubah bagian **IdBot** dengan Id bot milik kalian.

3. **Masukan Token**

Buat file **.env** lalu lakukan seperti dibawah
```bash
token = "Paste Disini"
```

4. **Ubah Config.js**

Buka folder **handler** lalu cari file **config.js** dan lakukan seperi yang dibawah
```js
module.exports = {
  clientId: '', // Masukan ID bot kalian
  guildId: '', // Masukan ID server kalian
};
```

5. **Register Slash Command**

Sebelum bot bisa menggunakan slash command, kalian harus register slash command dengan cara berikut
```bash
node commands.js
```

6. **Jalankan Bot**

Sebelum run bot silahkan install semua package yang diperlukan dengan cara
```bash
npm install
```
tunggu hingga selesai lalu
```bash
node .
```
untuk menjalankan bot dan berhasil online!