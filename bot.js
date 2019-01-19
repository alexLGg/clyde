
const Discord = require("discord.js");

const client = new Discord.Client();

const config = require("./config.json");

client.on('ready', () => {
  console.log("Бот Запущен Статус Установлен Не активен  бот запущет от имени ${лай}")
  client.user.setStatus('dnd')
  client.user.setPresence({
      game: {
          name: 'Префикс # Пригласить Бота http://bit.ly/crgzsvg и стримю я https://youtu.be/o-WYe_Q_K4w ',
          type: "STREAMING",
          url: "https://youtu.be/o-WYe_Q_K4w"
      }
  });
});
 
client.on("message", async message => {
 
  if(message.author.bot) return;

  if(message.content.indexOf(config.prefix) !== 0) return;

  const args = message.content.slice(config.prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  if(command === "сказать") {
    if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("так так так нед админки нет и команд");
    let botmessage = args.join(" ");
    message.delete().catch();
    message.channel.send(botmessage);
    console.log(`Использовано  Say`)
  }
  
if(command === "help") {
  const embed = new Discord.RichEmbed()
    .setColor('#00AE86')
    .setAuthor("Помощь Префикс Бота [#]")
    .setTitle("Все Команды")
    .setThumbnail(message.author.avatarURL)
    .addField('say', 'Сказать От Имени Бота')
    .addField('dm', 'Отправить В ЛС От Имени Бота')
    .addField('react', 'Прореагировать На Последние сообщение')
    .addField('dm', 'Отправить В ЛС От Имени Бота')
    .addField('reaction', 'Скорость Реакции Бота На Команду')
    .addField('clean', 'Очистить Чат от 2 до 100 Сообщений')
    .setColor( "#00ae88")
    .setThumbnail(message.author.avatarURL)
    .addField("есть ли у тебя те разрабы которые сделали этого бота?")
    .addField("вот ⎛⎝Mr•.Sans⎠⎞#1601")
    .addField("и Lime#1224")


  message.author.sendMessage({embed});
}
if(command === "лс") {
let dUser = message.guild.member(message.mentions.users.first()) || message.guild.members.get(args[0]);
if (!dUser) return message.channel.send("Не Могу Найти Пользователя")
if(!message.member.hasPermission("ADMINISTRATOR")) return message.reply("У Вас Нет Прав Для Использования")
let dMessage = args.join(" ").slice(22);
if(dMessage.length < 1) return message.reply('Ваше Сообщение Слишко Маленькое')

dUser.send(`**Вы получили Сообщение от когото** ${dMessage}`)

message.author.send(`${message.author} Сообщение Успешно Отправлно ${dUser}`)
}


if(command === "очитсить") {
  
  const deleteCount = parseInt(args[0], 10);
  
  
  if(!deleteCount || deleteCount < 2 || deleteCount > 100)
    return message.reply("Пожалуйста, укажите число от 2 до 100 для количества сообщений для удаления");
  
  const fetched = await message.channel.fetchMessages({count: deleteCount});
  message.channel.bulkDelete(fetched)
    .catch(error => message.reply(`Не удалось удалить сообщения из-за: ${error}`));
}
});

client.login(process.env.BOT_TOKEN);