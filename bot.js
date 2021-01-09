const tmi = require('tmi.js');

const fs = require('fs');

// Define configuration options
const opts = {
    identity: {
        username: "tucianbot",
        password: "oauth:5q4mhsoamjg9mkib1qf6qs7ya61sg1"
    },
    channels: [
        "KingTucian",
        "FinnleighDeAnne",
        "CA_in_LA"
    ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

var jokes = [
    "Dad, did you get a haircut? No, I got them all cut!", //start dad jokes
    "My wife is really mad at the fact that I have no sense of direction. So I packed up my stuff and right!",
    "How do you get a squirrel to like you? Act like a nut.",
    "Why don't eggs tell jokes? They'd crack each other up.",
    "I don't trust stairs. They're always up to something.",
    "What do you call someone with no body and no nose? Nobody knows.",
    "Did you hear the rumor about butter? Well, I'm not going to spread it!",
    "Why couldn't the bicycle stand up by itself? It was two tired.",
    "Dad, can you put my shoes on? No, I don't think they'll fit me.",
    "Why can't a nose be 12 inches long? Because then it would be a foot.",
    "This graveyard looks overcrowded. People must be dying to get in.",
    "Dad, can you put the cat out? I didn't know it was on fire.",
    "What time did the man go to the dentist? Tooth hurt-y.",
    "How many tickles does it take to make an octopus laugh? Ten tickles.",
    "What concert costs just 45 cents? 50 Cent featuring Nickelback!",
    "How do you make a tissue dance? You put a little boogie in it.",
    "Why did the math book look so sad? Because of all of its problems!",
    "What do you call cheese that isn't yours? Nacho cheese.",
    "What kind of shoes do ninjas wear? Sneakers!",
    "How does a penguin build its house? Igloos it together.", //end dad jokes
    "What do you call a joke that isn’t funny? A sentence.", // start anti-jokes
    "What did one stranger say to the other? Nothing. They didn’t know each other.",
    "How do you confuse someone? Paint yourself green and throw forks at them.",
    "What did one Frenchman say to the other? I don’t know, I don’t speak French.",
    "Why did the swan hiss? Biologically, it’s coded in their genes to do so when threatened.",
    "What do you call 100 lawyers at the bottom of the ocean? A horrible boating accident.",
    "Why did the teacher tell Jamie she was wearing too much makeup? Because she was wearing too much makeup.",
    "I told my friend she was drawing her eyebrows too high. She looked surprised.",
    "What do you call a pigeon that can’t find its way back home? A pigeon.",
    "What’s worse than finding a worm in your apple? Being robbed.",
    "Why did Benjamin get sick after eating too much ice cream? He was lactose intolerant.",
    "How is a laser beam similar to a goldfish? Neither one can whistle.",
    "I accused my husband of being too immature. Then he told me to get out of his fort.",
    "How do you get someone to stop swinging on the tire swing? Snip the rope.",
    "What did the man say when he lost his truck? Where’s my truck?",
    "Why did Jordan stay home from the party? He wasn’t invited…",
    "You don’t need a parachute to go skydiving. You need a parachute to go skydiving twice.",
    "What did one ant say to the other ant? Nothing, ants communicate by pheromones, not speech.",
    "Do you know why I look like I can’t hear you? Because I can’t, my headphones are on.",
    "Who shaves at least 20 times a day? A barber." //end anti-jokes
];


// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();

    if (commandName === '!joke'){
        // client.say(target, "Here's a joke...")
        client.say(target, `Joke: ${jokes[Math.floor(Math.random() * jokes.length)]}`);
    }

    // if (commandName === '!topChats') {
    //     console.log("Top Chats Triggered")
    //     if (chatters.length < 5) {
    //         if (chatters.length === 0) {
    //             client.say(target, 'No chatters yet...');
    //         }
    //         else {
    //             var topChats = "Top " + chatters.length + ": ";
    //             for (i = 0; i < chatters.length - 1; i++) {
    //                 topChats += chatters[i].name + "-" + chatters[i].count + " | ";
    //             }
    //             topChats += chatters[chatters.length - 1].name + "-" + chatters[chatters.length - 1].count;
    //             client.say(target, topChats);
    //         }
    //     }
    //     else {
    //         var topChats = "Top 5: "
    //         var i;
    //         for (i = 0; i < 4; i++) {
    //             topChats += chatters[i].name + "-" + chatters[i].count + " | ";
    //         }
    //         topChats += chatters[4].name + "-" + chatters[4].count;
    //         client.say(target, topChats);
    //     }
    // }

    // else if (commandName !== '' && commandName !== null) {


    //     // increment chat count
    //     if (chatters.find(x => x.name === context.username)) {
    //         // var index = chatters.findIndex(x => x.name === context.username);
    //         // var user = chatters[index];

    //         // user.count++;

    //         // chatters.pop(index);
    //         // chatters.push(user);
    //         var i;
    //         for (i = 0; i < chatters.length; i++) {
    //             if (chatters[i].name === context.username) {
    //                 chatters[i].count++;
    //                 break;
    //             }
    //         }
    //     }
    //     // new user
    //     else {
    //         var user = new Object();
    //         user.name = context.username;
    //         user.count = 1;
    //         user.dateAdded = new Date();
    //         chatters.push(user);
    //         console.log(`Added ${user.name} - Total Chatters: ${chatters.length}`);
    //     }

    //     chatters.sort(function (a, b) { return b.count - a.count });
    //     console.log("\nChatters:");
    //     var i;
    //     for (i = 0; i < chatters.length; i++) {
    //         var user = chatters[i];
    //         console.log(user.name + " - " + user.count);
    //     }
    //     console.log("\n");
    // }

    else {
        // console.log(`* Unknown command ${commandName}`);
    }
}
function onConnectedHandler(addr, port) {
    console.log(`* Connected to ${addr}:${port}`);
}
function replaceAll(string, search, replace) {
    return string.split(search).join(replace);
}
