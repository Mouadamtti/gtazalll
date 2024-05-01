import fetch from 'node-fetch';

let handler = async (m, { conn, args, usedPrefix, command }) => {
    if (!args[0]) throw `*Ex : ${usedPrefix + command} https://www.instagram.com/p/CYHeKxyMj-J/?igshid=YmMyMTA2M2Y=*`;
    m.react("⏳");

    try {
        let res = await fetch(global.API('fgmods', '/api/downloader/igdl', { url: args[0] }, 'apikey'));
        if (!res.ok) throw `error api`;
        let data = await res.json();

        for (let item of data.result) {
            let caption = '';
            if (item.author) {
                caption += `Author: ${item.author.nickname || 'Unknown'} (${item.author.unique_id || 'Unknown'})\n`;
            } else {
                caption += 'Author: Unknown\n';
            }
            caption += `Play Count: ${item.play_count}\n`;
            caption += `Digg Count: ${item.digg_count}\n`;
            conn.sendFile(m.chat, item.url, 'igdl.jpg', caption, m);
        }

    } catch (error) {
        m.reply(`error code: ${error}`);
    }
}

handler.help = ['instagram <link ig>'];
handler.tags = ['dl'];
handler.command = ['ig', 'igdl', 'instagram', 'igimg', 'igvid'];
handler.diamond = true;

export default handler;

