const tmi = require('tmi.js');

// Define configuration options
const opts = {
    identity: {
        username: "TucianBot",
        password: "oauth:ro89ui4ucmyt21omu2wgo5nhtjwver"
    },
    channels: [
        "KingTucian"
    ]
};
// Create a client with our options
const client = new tmi.client(opts);

// Register our event handlers (defined below)
client.on('message', onMessageHandler);
client.on('connected', onConnectedHandler);

// Connect to Twitch:
client.connect();

var chatters = [];
// user = {
// name: string
// count: int
// dateAdded: date
// }

// Called every time a message comes in
function onMessageHandler(target, context, msg, self) {
    if (self) { return; } // Ignore messages from the bot

    // Remove whitespace from chat message
    const commandName = msg.trim();



    if (commandName === '!topChats') {
        console.log("Top Chats Triggered")
        if (chatters.length < 5) {
            if (chatters.length === 0) {
                client.say(target, 'No chatters yet...');
            }
            else {
                var topChats = "Top " + chatters.length + ": ";
                for (i = 0; i < chatters.length - 1; i++) {
                    topChats += chatters[i].name + "-" + chatters[i].count + " | ";
                }
                topChats += chatters[chatters.length - 1].name + "-" + chatters[chatters.length - 1].count;
                client.say(target, topChats);
            }
        }
        else {
            var topChats = "Top 5: "
            var i;
            for (i = 0; i < 4; i++) {
                topChats += chatters[i].name + "-" + chatters[i].count + " | ";
            }
            topChats += chatters[4].name + "-" + chatters[4].count;
            client.say(target, topChats);
        }
    }

    else if (commandName !== '' && commandName !== null) {


        // increment chat count
        if (chatters.find(x => x.name === context.username)) {
            // var index = chatters.findIndex(x => x.name === context.username);
            // var user = chatters[index];

            // user.count++;

            // chatters.pop(index);
            // chatters.push(user);
            var i;
            for (i = 0; i < chatters.length; i++) {
                if (chatters[i].name === context.username) {
                    chatters[i].count++;
                    break;
                }
            }
        }
        // new user
        else {
            var user = new Object();
            user.name = context.username;
            user.count = 1;
            user.dateAdded = new Date();
            chatters.push(user);
            console.log(`Added ${user.name} - Total Chatters: ${chatters.length}`);
        }

        chatters.sort(function (a, b) { return b.count - a.count });
        console.log("\nChatters:");
        var i;
        for (i = 0; i < chatters.length; i++) {
            var user = chatters[i];
            console.log(user.name + " - " + user.count);
        }
        console.log("\n");
    }

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
