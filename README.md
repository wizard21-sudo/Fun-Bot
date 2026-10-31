# Chalant-Bot-21

a super chill slack bot running 24/7 on a cloud server that drops random cat facts, cute doggos, hype compliments directly into your chat.

# How to test it out

The bot is live 24/7 in the hack club slack workspace!
- Slide into `#bot-spam`.
- Just type any of the slash commands listed below and see it work.

## Features ( Slash Commands )

- `/chalant-bot-21-ping` - Check if the bot's lagging
- `/chalant-bot-21-namaste` - Drops a friendly greeting
- `/chalant-bot-21-hype` - Get a random hype compliment
- `/chalant-bot-21-catfact` - Fetch random cat facts
- `/chalant-bot-21-dog` - Pull up a random cute dog pics
- `/chalant-bot-21-activity` - Get activity ideas for when you are bored
- `/chalant-bot-21-help` - View all commands

# Required scopes & permissions

- `commands` (so it catches slash commands)
- `chat:write` (so it can actually reply)
- `connections:write` (for socket mode magic)

# Bot in action

![Bot Demo](https://raw.githubusercontent.com/wizard21-sudo/Fun-Bot/main/demo.jpeg)


## Built With 

- **Node.js** & **Slack Bolt SDK** (Socket Mode)
- **Axios** (for fetching APIs)
- **Systemd** (to keep it running 24/7 on Linux)

# How to self-host this thing

To clone and run the repo, just run:

- git clone https://github.com/wizard21-sudo/Fun-Bot.git
- cd Fun-Bot
- npm install
- npm start

# Credits
- Built with the help of the Hackclub Guide. Hope you check it out!

Thank You!!!
