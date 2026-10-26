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
        - \`/chalant-bot-21-ping\` - Check bot latency[span_2](start_span)[span_2](end_span)
        - \`/chalant-bot-21-namaste\` - Send a greeting
        - \`/chalant-bot-21-hype\` - Get a random hype compliment
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
    

(async()=>{
    await app.start();
    console.log("bot is running!");
})();