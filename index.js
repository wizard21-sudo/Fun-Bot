require("dotenv").config();

const axios = require("axios");

const { App } = require("@slack/bolt");

const app = new App({
    token: process.env.SLACK_BOT_TOKEN,
    appToken: process.env.SLACK_APP_TOKEN,
    socketMode: true
});
 
app.command("/chalant-bot-21-ping",async({command,ack,respond})=>{
    const start = Date.now();
    await ack();
    const latency = Date.now() - start;
    await respond({ text:`Pong!\nLatency:${latency}ms`});
});

app.command("/chalant-bot-21-namaste", async ({ command, ack, respond }) => {
    await ack();
    await respond({ text: `Namaste <@${command.user_id}>! Hope you are having a great day!` });
});

app.command("/chalant-bot-21-hype", async ({ command, ack, respond }) => {
    await ack();

    const compliments = [
        "your aura is unmatched!",
        "clocked it!",
        "ready to lock in!",
        "real pookie vibes!",
        "its giving!",
        "already touched grass!",
        "the goat is here!",
    ];

    const randomCompliment = compliments[Math.floor(Math.random() * compliments.length)];

    const target = command.text.trim() ? command.text.trim() : `<@${command.user_id}>`;

    await respond({ text: ` Sup ${target}, ${randomCompliment}` });
});

app.command("/chalant-bot-21-help", async ({ ack, respond }) => {
    await ack();
    await respond({
        text: `*Available Commands:*
        - \`/chalant-bot-21-ping\` - Check bot latency
        - \`/chalant-bot-21-namaste\` - Send a greeting
        - \`/chalant-bot-21-hype\` - Get a random hype compliment
        - \`/chalant-bot-21-catfact\` - Get a random cat fact
        - \`/chalant-bot-21-dog\` - Get a cute dog picture
        - \`/chalant-bot-21-activity\` - Get a fun activity idea
        - \`/chalant-bot-21-nasa\` - Get NASA's APOD
        - \`/chalant-bot-21-help\` - Show this help menu`
    });
});

app.command("/chalant-bot-21-catfact",async({ack,respond})=>{
    await ack();

    try{
        const response = await axios.get("https://catfact.ninja/fact");
        await respond({ text: `Cat Fact:\n${response.data.fact}` });
    }   catch(err) {
        await respond({ text: "Failed to fetch a cat fact." });

    }
});

app.command("/chalant-bot-21-dog", async ({ ack, respond }) => {
    await ack();
    try{
        const response = await axios.get("https://dog.ceo/api/breeds/image/random");
        await respond({
            text: `Here is a cute doggo for you!\n${response.data.message}`
        });
    } catch (err) {
        await respond({ text: "Failed to fetch a dog picture" });
    }
});

app.command("/chalant-bot-21-activity", async ({ ack, respond }) => {
    await ack();
    try {
        const response = await axios.get("https://bored-api.appbrewery.com/random");
        await respond({
            text: ` **Idea:** ${response.data.activity}\n **Category:** ${response.data.type}`
        });
    } catch (err) {
        await respond({ text: "Failed to fetch a fun activity" });
    }
});

app.command("/chalant-bot-21-nasa", async ({ command, ack, respond }) => {
    await ack();
    try {
        const response = await axios.get(`https://api.nasa.gov/planetary/apod?api_key=${process.env.NASA_API_KEY}`);
        const { title, explanation, date, url, hdurl } = response.data;
        const imageUrl = hdurl || url;

        await respond({
            response_type: 'in_channel',
            text: `*NASA Picture of the Day (${date}*\n*${title}*\n\n${explanation}\n\n*View Image:* ${imageUrl}`
        });
    } catch (error) {
        console.error('Error fetching NASA data:', error);
        await respond({ text: "Sorry, I couldn't fetch NASA'a picture right now!" });
    }
});
    

(async()=>{
    await app.start();
    console.log("bot is running!");
})();